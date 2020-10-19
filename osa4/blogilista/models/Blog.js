var { Schema, model } = require('mongoose')

var schema = Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
