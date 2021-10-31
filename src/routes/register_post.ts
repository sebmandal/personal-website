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

        if (!user) {
            const dbData = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))
            const salt = bcrypt.genSaltSync()
            const hash = bcrypt.hashSync(req.body.password, salt)
            dbData.users.push({
                name: req.body.username,
                password: hash,
            })
            fs.writeFileSync('./db.json', JSON.stringify(dbData, null, 4))
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
