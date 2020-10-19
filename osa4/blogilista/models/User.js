var { Schema, model } = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    passwordHash: {
        type: String,
    },
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

schema.set('toJSON', {
    transform: function (document, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})


schema.plugin(uniqueValidator)

module.exports = model('User', schema)
