var { Router } = require('express')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var User = require('../models/User')
require('express-async-errors')

var router = Router()

router.post('/api/login', async function login(req, res) {
    var { body } = req

    var user = await User.findOne({ username: body.username })

    var passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        var error = new Error('Invalid credentials')
        error.name = 'InvalidCredentialsError'
        throw error
    }

    var token = {
        username: user.username,
        id: user._id
    }

    token = jwt.sign(token, process.env.SECRET)

    res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = router
