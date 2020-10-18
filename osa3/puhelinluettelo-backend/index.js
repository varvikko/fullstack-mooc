var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')

var app = express()

morgan.token('content-length', function getContentLength(req, res) {
    return req.headers['content-length'] || 0
})

morgan.token('body', function getBody(req, res) {
    return JSON.stringify(req.body)
})

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

app.listen(3000, () => {
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
    }

    res.end()
})

app.get('/api/persons', function getPersons(req, res) {
    res.json(persons)
})

app.post('/api/persons', function addPerson(req, res) {
    var { name, number } = req.body

    if (!name) {
        return res.status(400).json({ error: 'missing name' })
    } else if (!number) {
        return res.status(400).json({ error: 'missing number' })        
    } else if (persons.find(person => person.name === name)) {
        return res.status(400).json({ error: `${name} is already added`})
    }

    var person = { name, number, id: Math.floor(Math.random() * 1e6) }
    persons.push(person)
    res.status(201).json(person)
})

app.get('/info', function getInfo(req, res) {
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})