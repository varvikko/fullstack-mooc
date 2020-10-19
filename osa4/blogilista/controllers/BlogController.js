var express = require('express')
var jwt = require('jsonwebtoken')
var Blog = require('../models/Blog')
var User = require('../models/User')
require('express-async-errors')

var router = express.Router()

router.get('/api/blogs', async function getBlogs(req, res) {
    var blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    res.json(blogs)
})

router.post('/api/blogs', async function addBlog(req, res) {
    // var user = await User.findById(req.body.userId)

    var token = req.token
    try {
        var verified = jwt.verify(token, process.env.SECRET)
	    console.log(token, verified)
    } catch (e) {
        if (e.name === 'SyntaxError') {
            var e = new Error('Invalid token.')
            e.name = 'InvalidCredentialsError'
            throw e
        }
    }
    if (!verified) {
        var e = new Error('Access denied. Please log in.')
        e.name = 'AccessDeniedError'
        throw e
    }

    var blog = new Blog({
        ...req.body,
        user: verified.id
    })

    var result = await blog.save()

    // user.blogs = user.blogs.concat(result._id)
    // await user.save()
    var x = await User.findByIdAndUpdate(verified.id, { $push: { blogs: result._id }})

    res.status(201).json(result)
})

router.delete('/api/blogs/:id', async function removeBlog(req, res) {
    var id = req.params.id

    var token = req.token
    try {
        var verified = jwt.verify(token, process.env.SECRET)
	    console.log(token, verified)
    } catch (e) {
        if (e.name === 'SyntaxError') {
            var e = new ('Invalid token.')
            e.name = 'InvalidCredentialsError'
            throw e
        }
    }

    var blog = await Blog.findById(id)
    if (!verified || verified.id !== blog.user.toString()) {
        var e = new Error('Access denied. Please log in.')
        e.name = 'AccessDeniedError'
        throw e
    }

    await Blog.findByIdAndDelete(id)
    res.status(204).end()
})

router.put('/api/blogs/:id', async function updateBlog(req, res) {
    var { body } = req
    var id = req.params.id

    var response = await Blog.findByIdAndUpdate(id, { likes: body.likes, author: body.author, url: body.url, title: body.title}, { new: true})
    res.status(200).json(response)
})

module.exports = router
