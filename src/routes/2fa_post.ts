import Route from '../core/route'
import Express from 'express'
import fs from 'fs'

const script = (req: Express.Request, res: Express.Response) => {
    if (req.signedCookies.user) return res.redirect('/')
    if (!req.signedCookies.loginCredentialsAuthorized)
        return res
            .cookie('message', {
                content:
                    'You need to log in to access 2 factor authentication.',
                type: 'error',
            })
            .redirect('/')

    const { code } = req.body
    const { username, twoFactorAuthCode } = req.signedCookies

    const db = fs.readdirSync('./data/users').map((file) => {
        const data = fs.readFileSync(`./data/users/${file}`, 'utf8')
        return JSON.parse(data)
    })
    let user = db.find((user) => user.name === username)

    if (user && twoFactorAuthCode === code) {
        res.cookie('user', user, { signed: true })
        res.cookie(
            'message',
            {
                content: 'You have been logged in!',
                type: 'success',
            },
            { signed: true }
        )

        // clearing the 2FA cookies
        res.clearCookie('loginCredentialsAuthorized')
        res.clearCookie('twoFactorAuthCode')
        res.clearCookie('username')
        res.clearCookie('email')

        return res.redirect('/')
    }

    res.cookie(
        'message',
        {
            content: 'The 2 factor authentication code is incorrect.',
            type: 'error',
        },
        { signed: true }
    )
    return res.redirect('/2fa')
}

export default class TwoFactorAuthPost extends Route {
    /**
     * super()
     * parameter 1: the URL path
     * parameter 2: the Express routing method
     * parameter 3: the Express middleware/handler function
     **/
    constructor() {
        super('/2fa', 'post', script)
    }
}
