var { Router } = require('express')
var Blog = require('../models/Blog')
var User = require('../models/User')

var router = Router()

router.post('/api/testing/reset', async (req, res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    res.status(200).end()
})

module.exports = router
