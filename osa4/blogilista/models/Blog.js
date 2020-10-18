var { Schema, model } = require('mongoose')

var schema = Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

module.exports = model('Blog', schema)
