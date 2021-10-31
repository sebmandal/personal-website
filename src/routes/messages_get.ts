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
        fs.readFileSync(`./data/messages/${user}.json`, 'utf8')
    )

    return res.json(messages || [])
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
