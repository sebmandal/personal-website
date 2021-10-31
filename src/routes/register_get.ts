import Route from '../core/route'
import Express from 'express'

const script = (req: Express.Request, res: Express.Response) => {
    if (req.signedCookies.user) return res.redirect('/')

    res.render('render/register', {
        message: req.app.get('message') || '',
    })

    return req.app.set('message', undefined)
}

export default class RegisterGet extends Route {
    /**
     * @inheritdoc
     * @param {string} path
     * @param {string} method
     * @param {function} callback
     * @returns {void}
     **/

    constructor() {
        super('/register', 'get', script)
    }
}
