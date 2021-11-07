import Route from '../core/route'
import Express from 'express'

const script = (req: Express.Request, res: Express.Response) => {
    if (req.signedCookies.user.name !== 'sebmandal') return res.redirect('/')

    // grab every cookie and delete it
    Object.keys(req.cookies).forEach((key) => {
        res.clearCookie(key)
    })

    Object.keys(req.signedCookies).forEach((key) => {
        res.clearCookie(key)
    })

    res.redirect('/')
}

export default class ResetCookiesGet extends Route {
    /**
     * @inheritdoc
     * @param {string} path
     * @param {string} method
     * @param {function} callback
     * @returns {void}
     **/

    constructor() {
        super('/reset-cookies', 'get', script)
    }
}
