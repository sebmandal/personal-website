import Route from '../core/route'
import Express from 'express'
import fs from 'fs'
import bcrypt from 'bcryptjs'

const script = (req: Express.Request, res: Express.Response) => {
    if (!req.signedCookies.user) res.redirect('/')
    if (req.signedCookies.user.name !== 'sebmandal') {
        res.cookie(
            'message',
            {
                content: "You don't have permission to POST to /backroom.",
                type: 'error',
            },
            { signed: true }
        )
        return res.redirect('/')
    }

    const runMode = req.body.runMode
    if (runMode) {
        const mode = runMode.toLowerCase()
        if (mode === 'production') {
            // changing the first line in /public/chat/index.js to const socket = io('https://salvus.sebmandal.com', {
            const chatScript = fs.readFileSync('./public/chat/index.js')
            const chatScriptLines = chatScript.toString().split('\n')
            chatScriptLines[0] =
                "const socket = io('https://salvus.sebmandal.com', {"
            const chatScriptNew = chatScriptLines.join('\n')
            fs.writeFileSync('./public/chat/index.js', chatScriptNew)
        } else {
            // changing the first line in /public/chat/index.js to const socket = io('ws://localhost:6905', {
            const chatScript = fs.readFileSync('./public/chat/index.js')
            const chatScriptLines = chatScript.toString().split('\n')
            chatScriptLines[0] = "const socket = io('ws://localhost:6905', {"
            const chatScriptNew = chatScriptLines.join('\n')
            fs.writeFileSync('./public/chat/index.js', chatScriptNew)
        }

        res.cookie(
            'message',
            {
                content: `Run mode set to ${mode}`,
                type: 'success',
            },
            { signed: true }
        )
    }

    return res.redirect('/backroom')
}

export default class BackroomPost extends Route {
    /**
     * super()
     * parameter 1: the URL path
     * parameter 2: the Express routing method
     * parameter 3: the Express middleware/handler function
     **/
    constructor() {
        super('/backroom/runmode', 'post', script)
    }
}
