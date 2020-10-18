var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')

var db = require('./db')

var app = express()

morgan.token('content-length', function getContentLength(req, res) {
    return req.headers['content-length'] || 0
})

morgan.token('body', function getBody(req, res) {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(function log(t, req, res) {
    return [
        t['method'](req, res),
        t['url'](req, res),
        t['status'](req, res),
        t['content-length'](req, res), '-',
        t['response-time'](req, res), 'ms',
        t['body'](req, res)
    ].join(' ')
}))

app.use(express.static('build'))

var port = process.env.PORT || 3001
app.listen(port, () => {
    console.log('Listening')
})

var persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendick',
        number: '39-23-5423122'
    }
]

app.get('/api/persons/:id', async function getPerson(req, res, next) {
    try {
        var person = await db.getPersonById(req.params.id)
        if (!person) {
            throw new Error()
        }
    } catch(e) {
        return next()
    }
    res.json(person)
})

app.delete('/api/persons/:id', function deletePerson(req, res) {
    db.removePerson(req.params.id)
        .then(() => {
            console.log("success")
        })
        .catch(() => {
            console.log("fail")
        })

    res.end()
})

app.get('/api/persons', function getPersons(req, res) {
    db.getPersons().then(response => {
        res.json(response)
    })
})

app.post('/api/persons', async function addPerson(req, res, next) {
    var { name, number } = req.body

    var person = await db.getPerson(name)
    try {
        if (person) {
            throw new Error(`${name} is already added`)
        } else if (!number) {
            throw new Error('missing number')
        } else if (!name) {
            throw new Error('missing name')
        }
    } catch(e) {
        return next({message: e, code: 400})
    }
    var resp = await db.addPerson(name, number)
    res.status(201).json(resp)
})

app.put('/api/persons/:id', async function editPerson(req, res) {
    var p = await db.updatePerson(req.params.id, req.body.number)

    res.json(p)
})

app.get('/info', async function getInfo(req, res) {
    var count = await db.getPersonCount()    

    res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`)
})

app.use(function (error, req, res, next) {
    return res.status(error.code).json({ error: error.message })

    next()
})

app.use(function (req, res, next) {
    res.status(404).json({ error: 'page not found' })
})
