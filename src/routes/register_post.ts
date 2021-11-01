import Route from '../core/route'
import Express from 'express'
import fs from 'fs'
import bcrypt from 'bcryptjs'

const script = (req: Express.Request, res: Express.Response) => {
    if (req.signedCookies.user) res.redirect('/')

    if (req.body.username && req.body.password && req.body.email) {
        const user: any =
            fs
                .readdirSync('./data/users')
                .find((user) => user.split('.')[0] === req.body.username) ||
            undefined

        if (req.body.username.split(' ').length > 1) {
            res.cookie(
                'message',
                {
                    content: 'Username cannot contain spaces',
                    type: 'error',
                },
                { signed: true }
            )

            return res.redirect('/register')
        }

        if (!user) {
            const hash = bcrypt.hashSync(req.body.password, 10)

            fs.writeFileSync(
                `./data/users/${req.body.username}.json`,
                JSON.stringify(
                    {
                        name: req.body.username,
                        password: hash,
                        email: req.body.email,
                        messages: [],
                    },
                    null,
                    4
                )
            )

            res.cookie(
                'message',
                {
                    content: 'You have successfully registered!',
                    type: 'success',
                },
                { signed: true }
            )

            return res.redirect('/login')
        } else {
            res.cookie(
                'message',
                {
                    content: 'User already exists',
                    type: 'error',
                },
                { signed: true }
            )

            return res.redirect('/register')
        }
    }

    res.cookie(
        'message',
        { content: 'Please fill in all fields', type: 'error' },
        { signed: true }
    )
    return res.redirect('/register')
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
