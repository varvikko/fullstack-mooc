var express = require('express')
var Blog = require('../models/Blog')

var router = express.Router()

router.get('/api/blogs', async function getBlogs(req, res) {
    var blogs = await Blog.find({})
    res.json(blogs)
})

router.post('/api/blogs', async function addBlog(req, res) {
    if (!req.body.title || !req.body.url) {
        return res.status(400).end()
    }
    
    var blog = new Blog(req.body)

    var result = await blog.save()
    res.status(201).json(result)
})

router.delete('/api/blogs/:id', async function removeBlog(req, res) {
    var id = req.params.id

    await Blog.findByIdAndDelete(id)
    res.status(204).end()
})

router.put('/api/blogs/:id', async function updateBlog(req, res) {
    var { body } = req
    var id = req.params.id

    await Blog.findByIdAndUpdate(id, body)
    res.status(200).end()
})

module.exports = router
