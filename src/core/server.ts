import cookie from 'cookie'
import { app } from '../index'
import http from 'http'
import fs from 'fs'

export const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: { origin: '*' },
})

// Opening the socket.io connection, allowing users to chat
io.on('connection', (socket: any) => {
    // When a user joins the chat, we send a message to the chat, ${username} has joined the chat
    // todo - this is probably not the best way to do this, but it works for now
    let username: any = 'Anonymous'
    if (!socket.handshake.headers.cookie) return
    else {
        let userCookies = cookie.parse(
            socket.handshake.headers.cookie.toString()
        )
        if (userCookies.user && userCookies.user.length > 0) {
            username = JSON.parse(
                userCookies.user.substr(4, userCookies.user.length - 48)
            ).name
        }
    }

    io.emit('message', `${username} has joined the chat`)

    socket.on('message', (msg: string) => {
        // emitting the message to the chat
        io.emit('message', `${username}: ${msg}`)

        // writing it to the database
        const db_data = fs.readFileSync('./data/messages.json', 'utf8')
        const db_messages = JSON.parse(db_data)
        db_messages.push({
            username: username,
            message: msg,
            timestamp: new Date().toISOString(),
        })
        fs.writeFileSync(
            './data/messages.json',
            JSON.stringify(db_messages, null, 4)
        )
    })

    socket.on('disconnect', () => {
        io.emit('message', `${username} left the chat.`)
        socket.disconnect()
    })
})
