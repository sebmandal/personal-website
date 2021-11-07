import Route from '../core/route'
import Express from 'express'
import fs from 'fs'
import bcrypt from 'bcryptjs'

const script = (req: Express.Request, res: Express.Response) => {
    if (req.signedCookies.user) return res.redirect('/')

    if (req.body.username && req.body.password && req.body.email) {
        const db = fs.readdirSync('./data/users').map((file) => {
            const data = fs.readFileSync(`./data/users/${file}`, 'utf8')
            return JSON.parse(data)
        })

        let user = db.find((user) => user.name === req.body.username)
        if (!user) user = db.find((user) => user.email === req.body.email)

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
            const genUUID = () => {
                var d = new Date().getTime() //Timestamp
                var d2 =
                    (typeof performance !== 'undefined' &&
                        performance.now &&
                        performance.now() * 1000) ||
                    0 //Time in microseconds since page-load or 0 if unsupported
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
                    /[xy]/g,
                    function (c) {
                        var r = Math.random() * 16 //random number between 0 and 16
                        if (d > 0) {
                            //Use timestamp until depleted
                            r = (d + r) % 16 | 0
                            d = Math.floor(d / 16)
                        } else {
                            //Use microseconds since page-load if supported
                            r = (d2 + r) % 16 | 0
                            d2 = Math.floor(d2 / 16)
                        }
                        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
                    }
                )
            }

            let UUID = genUUID()
            // read through ./data/users and parse each file, if UUID is taken, generate new UUID
            for (let i = 0; i < fs.readdirSync('./data/users').length; i++) {
                const user = JSON.parse(
                    fs.readFileSync(
                        `./data/users/${fs.readdirSync('./data/users')[i]}`,
                        'utf8'
                    )
                )
                if (user.UUID === UUID) {
                    UUID = genUUID()
                }
            }

            fs.writeFileSync(
                `./data/users/${req.body.username}.json`,
                JSON.stringify(
                    {
                        id: genUUID(),
                        name: req.body.username,
                        password: hash,
                        email: req.body.email,
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
