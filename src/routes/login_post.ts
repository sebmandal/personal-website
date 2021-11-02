import Route from '../core/route'
import Express from 'express'
import fs from 'fs'
import bcrypt from 'bcryptjs'

const script = (req: Express.Request, res: Express.Response) => {
    if (req.signedCookies.user) res.redirect('/')

    if (req.body.username && req.body.password) {
        const db = fs.readdirSync('./data/users').map((file) => {
            const data = fs.readFileSync(`./data/users/${file}`, 'utf8')
            return JSON.parse(data)
        })

        let user = db.find((user) => user.name === req.body.username)

        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.cookie('user', user, { signed: true })
                res.cookie(
                    'message',
                    {
                        content: 'You have been logged in!',
                        type: 'success',
                    },
                    { signed: true }
                )
                return res.redirect('/')
            }
        }
    }

    res.cookie(
        'message',
        {
            content:
                'Incorrect username or password. Please try again register using the link below.',
            type: 'error',
        },
        { signed: true }
    )
    return res.redirect('/login')
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
