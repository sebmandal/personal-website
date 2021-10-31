import Route from '../core/route'
import Express from 'express'
import fs from 'fs'
import bcrypt from 'bcryptjs'

const script = (req: Express.Request, res: Express.Response) => {
    if (req.signedCookies.user) res.redirect('/')

    if (req.body.username && req.body.password) {
        const user: any =
            JSON.parse(
                fs.readFileSync(
                    `./data/users/${req.body.username}.json`,
                    'utf8'
                )
            ) || undefined

        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) console.log(err)
                else {
                    fs.writeFileSync(
                        `./data/users/${req.body.username}.json`,
                        JSON.stringify(
                            {
                                username: req.body.username,
                                password: hash,
                            },
                            null,
                            4
                        )
                    )
                    req.app.set('message', {
                        content: 'You have successfully registered!',
                        type: 'success',
                    })
                    return res.redirect('/')
                }
            })
        } else {
            req.app.set('message', {
                content: 'User already exists',
                type: 'error',
            })
            return res.redirect('/register')
        }
    }

    return res.redirect('/login')
}

export default class RegisterPost extends Route {
    /**
     * super()
     * parameter 1: the URL path
     * parameter 2: the Express routing method
     * parameter 3: the Express middleware/handler function
     **/
    constructor() {
        super('/register', 'post', script)
    }
}
