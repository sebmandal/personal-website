import Route from '../core/route'
import Express from 'express'
import { signedCookie } from 'cookie-parser'

const script = (req: Express.Request, res: Express.Response) => {
    if (!req.signedCookies.user) return res.redirect('/login')

    res.clearCookie('user')

    res.cookie(
        'message',
        { content: 'You have been logged out.', type: 'success' },
        { signed: true }
    )
    return res.redirect('/login')
}

export default class LogoutGet extends Route {
    /**
     * @inheritdoc
     * @param {string} path
     * @param {string} method
     * @param {function} callback
     * @returns {void}
     **/

    constructor() {
        super('/logout', 'get', script)
    }
}
