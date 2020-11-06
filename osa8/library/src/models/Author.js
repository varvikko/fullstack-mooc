let { Schema, model } = require('mongoose')

let schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    born: {
        type: Number
    }
})

module.exports = model('Author', schema)
