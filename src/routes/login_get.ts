import Route from '../core/route'
import Express from 'express'
import fs from 'fs'

const script = (req: Express.Request, res: Express.Response) => {
    if (req.signedCookies.user) return res.redirect('/')

    let message = req.signedCookies.message
    res.clearCookie('message')

    let adminMessage = JSON.parse(
        fs.readFileSync('./data/admin_message.json', 'utf8')
    )
    return res.render('render/login', {
        title: 'Login | Salvus',
        message: message,
        adminMessage: adminMessage === {} ? undefined : adminMessage,
    })
}

export default class LoginGet extends Route {
    /**
     * @inheritdoc
     * @param {string} path
     * @param {string} method
     * @param {function} callback
     * @returns {void}
     **/

    constructor() {
        super('/login', 'get', script)
    }
}
