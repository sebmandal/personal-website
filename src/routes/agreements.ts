import Route from '../core/route'
import Express from 'express'

const script = (req: Express.Request, res: Express.Response) => {
    let message = req.signedCookies.message
    res.clearCookie('message')

    return res.render('render/agreements', { message: message })
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
        super('/agreements', 'get', script)
    }
}
