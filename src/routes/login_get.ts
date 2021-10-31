import Route from '../core/route'
import Express from 'express'

const script = (req: Express.Request, res: Express.Response) => {
    if (req.signedCookies.user) return res.redirect('/')

    res.render('render/login', { message: req.app.get('message') || '' })

    return req.app.set('message', undefined)
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
