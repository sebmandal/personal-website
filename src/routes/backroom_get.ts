import Route from '../core/route'
import Express from 'express'
import fs from 'fs'

const script = (req: Express.Request, res: Express.Response) => {
    if (!req.signedCookies.user) return res.redirect('/login')
    if (req.signedCookies.user.name !== 'sebmandal') {
        res.cookie(
            'message',
            {
                content: "You don't have permission to view the backroom.",
                type: 'error',
            },
            { signed: true }
        )
        return res.redirect('/login')
    }

    let message = req.signedCookies.message
    res.cookie('message', undefined, { signed: true })

    return res.render('render/backroom', {
        user: req.signedCookies.user,
        message: message,
    })
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
        super('/backroom', 'get', script)
    }
}
