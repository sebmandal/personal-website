import Route from '../core/route'
import Express from 'express'
import fs from 'fs'

const script = (req: Express.Request, res: Express.Response) => {
    if (req.signedCookies.user) return res.redirect('/')
    if (!req.signedCookies.loginCredentialsAuthorized)
        return res
            .cookie(
                'message',
                {
                    content:
                        'You need to log in to access 2 factor authentication.',
                    type: 'error',
                },
                { signed: true }
            )
            .redirect('/')

    let message = req.signedCookies.message
    res.clearCookie('message')

    return res.render('render/2fa', {
        title: '2FA',
        message: message,
        adminMessage: JSON.parse(
            fs.readFileSync('./data/admin_message.json', 'utf8')
        ),
    })
}

export default class TwoFactorAuthGet extends Route {
    /**
     * @inheritdoc
     * @param {string} path
     * @param {string} method
     * @param {function} callback
     * @returns {void}
     **/

    constructor() {
        super('/2fa', 'get', script)
    }
}
