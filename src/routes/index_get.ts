import Route from '../core/route'
import Express from 'express'

const script = (req: Express.Request, res: Express.Response) => {
    if (!req.signedCookies.user) return res.redirect('/login')

    let message = req.signedCookies.message
    res.cookie('message', undefined, { signed: true })

    return res.render('render/index', {
        user: req.signedCookies.user,
        message: message,
    })
}

export default class IndexGet extends Route {
    /**
     * @inheritdoc
     * @param {string} path
     * @param {string} method
     * @param {function} callback
     * @returns {void}
     **/

    constructor() {
        super('/', 'get', script)
    }
}
