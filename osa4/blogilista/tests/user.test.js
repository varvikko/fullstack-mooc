require('dotenv').config()
var supertest = require('supertest')
var mongoose = require('mongoose')
var app = require('../app')
var User = require('../models/User')

var api = supertest(app)

describe('adding new user', () => {
    test('succeeds when given appropriate data', async () => {
        var user = {
            username: 'test user',
            name: 'Test User',
            password: 'testpass'
        }

        var response = await api.post('/api/users').send(user).expect(201).expect('Content-Type', /application\/json/)
        expect(response.body).toHaveProperty('id')
    
        response = await api.get('/api/users')
        expect(response.body).toHaveLength(2)
    })

    test('fails when a field is missing', async () => {
        var user = {}

        await api.post('/api/users').send(user).expect(400)

        response = await api.get('/api/users')
        expect(response.body).toHaveLength(0)
    })
})

afterEach(async () => {
    await User.deleteMany({})
})

afterAll(() => {
    mongoose.disconnect()
})