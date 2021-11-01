import Route from '../core/route'
import Express from 'express'
import fs from 'fs'

const script = (req: Express.Request, res: Express.Response) => {
    if (!req.signedCookies.user) return res.redirect('/login')
    if (req.signedCookies.user.name !== 'sebmandal') {
        res.cookie('message', {
            content: "You don't have permission to view the backroom.",
            type: 'error',
        })
        return res.redirect('/login')
    }

    const db = fs.readdirSync('./data/users').map((file) => {
        const data = fs.readFileSync(`./data/users/${file}`, 'utf8')
        return JSON.parse(data)
    })

    res.json(db)
}

export default class BackroomGet extends Route {
    /**
     * @inheritdoc
     * @param {string} path
     * @param {string} method
     * @param {function} callback
     * @returns {void}
     **/

    constructor() {
        super('/backroom/database', 'get', script)
    }
}
