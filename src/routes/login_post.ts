import Route from '../core/route'
import Express from 'express'
import fs from 'fs'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

function genAuthCode(length: number) {
    /**
     * @description Generates a random string of a given length
     * @param {number} length Length of the string to be generated
     *
     * @see {@link https://stackoverflow.com/a/1349426/10473150}
     *
     * @returns {string} Random string
     */

    let result = ''
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }
    return result
}

const script = (req: Express.Request, res: Express.Response) => {
    if (req.signedCookies.user) return res.redirect('/')

    if (process.env.RUNMODE === 'dev') {
        const db = fs.readdirSync('./data/users').map((file) => {
            const data = fs.readFileSync(`./data/users/${file}`, 'utf8')
            return JSON.parse(data)
        })

        let user = db.find((user) => user.name === req.body.username)

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

    if (req.body.username && req.body.password) {
        const db = fs.readdirSync('./data/users').map((file) => {
            const data = fs.readFileSync(`./data/users/${file}`, 'utf8')
            return JSON.parse(data)
        })

        let user = db.find((user) => user.name === req.body.username)

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            if (req.signedCookies.loginCredentialsAuthorized) {
                return res.redirect('/2fa')
            } else {
                res.cookie('username', user.name, {
                    signed: true,
                    maxAge: 1000 * 60 * 10, // 10 minutes
                })

                const code = genAuthCode(6)
                res.cookie('twoFactorAuthCode', code, {
                    signed: true,
                    maxAge: 1000 * 60 * 10, // 10 minutes
                })

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASS,
                    },
                })

                let mailOptions = {
                    from: process.env.MAIL_USER,
                    to: user.email,
                    subject: 'Salvus 2FA',
                    text: `Hello ${user.name},\n\nYour 2FA code is: ${code}\n\nIf you did not request this, please ignore this email.\nThe code will expire in 10 minutes.\n\nRegards,\nSalvus`,
                }

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        res.cookie(
                            'message',
                            {
                                content:
                                    'Error during 2FA process. Try again later.',
                                type: 'error',
                            },
                            { signed: true }
                        )

                        return res.redirect('/login')
                    } else {
                        res.cookie('loginCredentialsAuthorized', true, {
                            signed: true,
                            maxAge: 1000 * 60 * 10, // 10 minutes
                        })

                        res.cookie(
                            'message',
                            {
                                content:
                                    'There should be an email in your inbox with your 2 factor authentication code. It will expire in ten minutes.\n',
                                type: 'success',
                            },
                            { signed: true }
                        )

                        return res.redirect('/2fa')
                    }
                })

                return
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
