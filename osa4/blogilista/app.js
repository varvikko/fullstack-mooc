var express = require('express')
var cors = require('cors')
var BlogController = require('./controllers/BlogController')
var db = require('./utils/db')
var bodyParser = require('body-parser')

var app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/', BlogController)

module.exports = app
