import Route from '../core/route'
import Express from 'express'
import fs from 'fs'
import bcrypt from 'bcryptjs'

const script = (req: Express.Request, res: Express.Response) => {
    if (req.signedCookies.user) res.redirect('/')

    if (req.body.username && req.body.password) {
        let user = JSON.parse(fs.readFileSync('./db.json', 'utf-8')).users.find(
            (user: any) => user.name === req.body.username
        )

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            res.cookie('user', user, {
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
                httpOnly: true, // only allow cookies to be sent over http
                signed: true, // sign the cookie
                // secure: true, // only allow cookies to be sent over https
            })
            res.redirect('/')
        }
    }

    res.redirect('/login')
}

export default class LoginPost extends Route {
    /**
     * super()
     * parameter 1: the URL path
     * parameter 2: the Express routing method
     * parameter 3: the Express middleware/handler function
     **/
    constructor() {
        super('/login', 'post', script)
    }
}
