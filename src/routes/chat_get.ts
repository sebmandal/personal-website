import Route from '../core/route'
import Express from 'express'

const script = (req: Express.Request, res: Express.Response) => {
    if (!req.signedCookies.user) return res.redirect('/')

    let message = req.signedCookies.message
    res.clearCookie('message')

    return res.render('render/chat', {
        title: 'Chat | Salvus',
        message: message,
    })
}

export default class ChatGet extends Route {
    /**
     * @inheritdoc
     * @param {string} path
     * @param {string} method
     * @param {function} callback
     * @returns {void}
     **/

    constructor() {
        super('/chat', 'get', script)
    }
}
