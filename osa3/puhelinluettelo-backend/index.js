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

app.get('/api/persons/:id', function getPerson(req, res) {
    var person = persons.find(person => person.id == req.params.id)

    if (!person) {
        return res.status(404).end()
    }
    res.json(person)
})

app.delete('/api/persons/:id', function deletePerson(req, res) {
    var personIndex = persons.findIndex(person => person.id == req.params.id)

    if (personIndex >= 0) {
        persons.splice(personIndex, 1)
    } else {
        return res.status(404).end();
    }

    res.end()
})

app.get('/api/persons', function getPersons(req, res) {
    db.getPersons().then(response => {
        res.json(response)
    })
})

app.post('/api/persons', async function addPerson(req, res) {
    var { name, number } = req.body

    var person = await db.getPerson(name)
    if (person) {
        return res.status(400).json({ error: 'missing name' })
    } else if (!number) {
        return res.status(400).json({ error: 'missing number' })        
    } else if (persons.find(person => person.name === name)) {
        return res.status(400).json({ error: `${name} is already added`})
    }
    var resp = await db.addPerson(name, number)
    res.status(201).json(resp)
})

app.get('/info', function getInfo(req, res) {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})
