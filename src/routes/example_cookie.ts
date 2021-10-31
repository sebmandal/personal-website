import Route from '../core/route'
import Express from 'express'

const script = (req: Express.Request, res: Express.Response) => {
    return res.redirect('/')

    /**
     * @description This is a template for setting cookies, for future dev reference.
     */

    res.cookie('cookieRegistered', 'true', {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true, // only allow cookies to be sent over http
        signed: true, // sign the cookie
        secure: true, // only allow cookies to be sent over https
    })

    return res.redirect('/')
}

export default class CookieSetGet extends Route {
    /**
     * super()
     * parameter 1: the URL path
     * parameter 2: the Express routing method
     * parameter 3: the Express middleware/handler function
     **/
    constructor() {
        super('/cookie/set', 'get', script)
    }
}
