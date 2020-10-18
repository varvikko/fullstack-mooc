var { Schema, model } = require('mongoose')

var schema = Schema({
    title: String,
    author: String,
    url: String,
    likes: {
        type: Number,
        default: 0
    }
})

schema.set('toJSON', {
    transform: function (document, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

module.exports = model('Blog', schema)
