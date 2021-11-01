import Route from '../core/route'
import Express from 'express'
import fs from 'fs'

const script = (req: Express.Request, res: Express.Response) => {
    /**
     * @description Returning a JSON object with the messages of the user
     * @returns {object}
     */

    if (!req.signedCookies.user) return res.redirect('/')

    const user = req.signedCookies.user
    const messages = JSON.parse(
        fs.readFileSync(`./data/users/${user.name}.json`, 'utf8')
    ).messages

    let message = req.signedCookies.message
    res.cookie('message', undefined, { signed: true })

    return res.render('render/messages', {
        messages: messages,
        message: message,
    })
}

export default class MessagesGet extends Route {
    /**
     * @inheritdoc
     * @param {string} path
     * @param {string} method
     * @param {function} callback
     * @returns {void}
     **/

    constructor() {
        super('/messages', 'get', script)
    }
}
