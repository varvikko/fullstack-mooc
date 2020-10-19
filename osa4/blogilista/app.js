var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var BlogController = require('./controllers/BlogController')
var UserController = require('./controllers/UserController')
var LoginController = require('./controllers/LoginRouter')
var db = require('./utils/db')

var app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(function extractToken(req, res, next) {
    var auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        req.token = auth.substring(7)
    } else {
        req.token = null
    }
    next()
})
app.use('/', BlogController)
app.use('/', UserController)
app.use('/', LoginController)

if (process.env.NODE_ENV) {
    app.use('/', require('./controllers/TestRouter'))
}

app.use(function (error, req, res, next) {
	console.log(error)
    switch (error.name) {
        case 'CastError':
            return res.status(400).json(error.message)
        case 'ValidationError':
            return res.status(400).json(error.message)
        case 'PasswordLengthError':
            return res.status(400).json(error.message)
        case 'InvalidCredentialsError':
            return res.status(401).json(error.message)
        case 'AccessDeniedError':
            return res.status(401).json(error.message)
        case 'JsonWebTokenError':
            return res.status(401).json('Invalid credentials')
        default:
            console.log(error)
            return res.status(500).json({ error: 'Internal server error' })
    }
})

app.use(function (req, res) {
    res.status(404).json({ error: 'Page not found' })
})

module.exports = app
