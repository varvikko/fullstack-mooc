let { Schema, model } = require('mongoose')

let schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    published: {
        type: Number,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: [
        {
            type: String
        }
    ]
})

module.exports = model('Book', schema)
