// Get config from .env file
import dotenv from 'dotenv'
dotenv.config()

// Import modules
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import fs from 'fs'

// Set up Express app (views, static files, etc.)
export const app = express()
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug') // change ejs to whatever you want
app.set('trust proxy', true) // trust first proxy
app.use(express.static('./public'))
app.use(cookieParser(process.env.COOKIE_SECRET))

// body-parser setup
import bodyParser from 'body-parser'
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)

// gathering data on user retention and usage
app.use((req, res, next) => {
    if (req.signedCookies.user) {
        console.log(`${req.signedCookies.user.name} ${req.method} ${req.url}`)
        const userFile = `./data/users/${req.signedCookies.user.name}.json`
        const userData = JSON.parse(fs.readFileSync(userFile, 'utf8'))
        if (!userData.visits) {
            userData.visits = {}
        }
        if (!userData.visits[req.url]) {
            userData.visits[req.url] = {}
        }
        if (!userData.visits[req.url][req.ip]) {
            userData.visits[req.url][req.ip] = {}
        }
        if (!userData.visits[req.url][req.ip][req.method]) {
            userData.visits[req.url][req.ip][req.method] = {
                count: 1,
                times: [new Date()],
            }
        }
        userData.visits[req.url][req.ip][req.method]['count']++
        userData.visits[req.url][req.ip][req.method]['times'].push({
            time: new Date(),
        })
        fs.writeFileSync(userFile, JSON.stringify(userData, null, 4))
    }
    next()
})

// Automatically configure Express routes
import routes from './core/all_routes'
Object.entries(routes).forEach(([_, Route]) => {
    new Route().run(app)
})

// 404 middleware
app.use((req, res, next) => {
    res.status(404).render('render/404')
})

// Start the server
import { server } from './core/server'
server.listen(6905)
console.log(`HTTP server listening on port 6905`)

// Starting the Express server (never accessed, but for debugging)
app.listen(6904)
console.log(`Express server listening on port 6904`)
