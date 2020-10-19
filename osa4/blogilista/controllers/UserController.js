var { Router } = require('express')
var bcrypt = require('bcrypt')
var User = require('../models/User')
require('express-async-errors')

var router = Router()

router.post('/api/users', async function createUser(req, res, next) {
    var { name, username, password } = req.body

    if (!password || password.length < 3) {
        var error = new Error('Password length must be at least 3 characters')
        error.name = 'PasswordLengthError'
        throw error
    }

    var rounds = 12
    var hash = await bcrypt.hash(password, rounds)

    var user = new User({
        name,
        username,
        passwordHash: hash
    })

    var response = await user.save()
    res.status(201).json(response)
})

router.get('/api/users', async function getUsers(req, res) {
    var response = await User.find({}).populate('blogs').exec()
    res.json(response.map(u => u.toJSON()))
})

module.exports = router
