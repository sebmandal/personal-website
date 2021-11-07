import Route from '../core/route'
import Express from 'express'
import fs from 'fs'

const script = (req: Express.Request, res: Express.Response) => {
    if (!req.signedCookies.user) return res.redirect('/login')

    let message = req.signedCookies.message
    res.clearCookie('message')

    let adminMessage = JSON.parse(
        fs.readFileSync('./data/admin_message.json', 'utf8')
    )
    return res.render('render/get_that_gold', {
        title: 'Get That Gold | Salvus',
        user: req.signedCookies.user,
        message: message,
        adminMessage: adminMessage === {} ? undefined : adminMessage,
    })
}

export default class GTGGet extends Route {
    /**
     * @inheritdoc
     * @param {string} path
     * @param {string} method
     * @param {function} callback
     * @returns {void}
     **/

    constructor() {
        super('/get-that-gold', 'get', script)
    }
}
