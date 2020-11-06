const { Schema, model } = require('mongoose')

let schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    favoriteGenre: {
        type: String,
        required: true
    }
})

module.exports = model('User', schema)
