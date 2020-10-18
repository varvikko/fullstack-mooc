var express = require('express')
var cors = require('cors')
var BlogController = require('./controllers/BlogController')
var db = require('./utils/db')

var app = express()

app.use(cors())
app.use(express.json())
app.use('/', BlogController)

module.exports = app
