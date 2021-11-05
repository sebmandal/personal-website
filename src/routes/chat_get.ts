import Route from '../core/route'
import Express from 'express'

const script = (req: Express.Request, res: Express.Response) => {
    if (!req.signedCookies.user) return res.redirect('/')

    let message = req.signedCookies.message
    res.cookie('message', undefined, { signed: true })

    return res.render('render/chat', { message: message })
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
