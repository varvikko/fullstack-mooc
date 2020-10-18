var express = require('express')
var Blog = require('../models/Blog')

var router = express.Router()

router.get('/api/blogs', async function getBlogs(req, res) {
    var blogs = await Blog.find({})
    res.json(blogs)
})

router.post('/api/blogs', async function addBlog(req, res) {
    var blog = new Blog(req.body)

    var result = await blog.save()
    res.status(201).json(result)
})

module.exports = router
