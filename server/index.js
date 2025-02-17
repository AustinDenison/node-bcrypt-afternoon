require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const authCtrl = require('./controllers/authController')

const app = express()

app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

app.post('/auth/register', authCtrl.register)

app.post('/auth/login', authCtrl.login)

app.get('/auth/logout', authCtrl.logout)

app.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}`)
})