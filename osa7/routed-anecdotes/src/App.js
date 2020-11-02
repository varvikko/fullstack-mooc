import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    useParams,
    useHistory
} from 'react-router-dom'
import { useField } from './hooks/index'

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Link to='/anecdotes' style={padding}>
                anecdotes
            </Link>
            <Link to='/create' style={padding}>
                create new
            </Link>
            <Link to='/about' style={padding}>
                about
            </Link>
        </div>
    )
}

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map((anecdote) => (
                <li key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>
            ))}
        </ul>
    </div>
)

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>
            An anecdote is a brief, revealing account of an individual person or
            an incident. Occasionally humorous, anecdotes differ from jokes
            because their primary purpose is not simply to provoke laughter but
            to reveal a truth more general than the brief tale itself, such as
            to characterize a person by delineating a specific quirk or trait,
            to communicate an abstract idea about a person, place, or thing
            through the concrete details of a short narrative. An anecdote is "a
            story with a point."
        </em>

        <p>
            Software engineering is full of excellent anecdotes, at this app you
            can find the best and add more.
        </p>
    </div>
)

const Footer = () => (
    <div>
        Anecdote app for{' '}
        <a href='https://courses.helsinki.fi/fi/tkt21009'>
            Full Stack -websovelluskehitys
        </a>
        . See{' '}
        <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>
            https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
        </a>{' '}
        for the source code.
    </div>
)

const CreateNew = (props) => {
    var content = useField('text')
    var author = useField('text')
    var info = useField('info')
    var history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        history.push('/anecdotes')
        props.showNotification(`a new anecdote ${content.value} created!`)
    }

    function handleReset() {
      content.reset()
      author.reset()
      info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div>
                    content
                    <input {...content} reset={null} />
                </div>
                <div>
                    author
                    <input
                      {...author} reset={null} 
                    />
                </div>
                <div>
                    url for more info
                    <input
                    {...info} reset={null} 
                    />
                </div>
                <button>create</button>
                <button type='reset'>reset</button>
            </form>
        </div>
    )
}

function Anecdote({ anecdotes }) {
    var id = useParams().id
    var x = anecdotes.find((anecdote) => anecdote.id === id)
    return x ? (
        <div>
            <p>
                {x.content} by {x.author}
            </p>
            <p>has {x.votes} votes</p>
        </div>
    ) : null
}

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info:
                'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: '1'
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: '2'
        }
    ])

    const [notification, setNotification] = useState(null)

    const addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        setAnecdotes(anecdotes.concat(anecdote))
    }

    const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
    }

    function showNotification(msg) {
      if (notification && notification.id) {
        clearTimeout(notification.id)
      }
      var id = setTimeout(() => {
        setNotification(null)
      }, 10000)
      setNotification({ msg, id} )
    }

    return (
        <Router>
            <h1>Software anecdotes</h1>
            <Menu />
            {
              notification ? <p>{notification.msg}</p> : null
            }
            <Switch>
                <Route path='/create' exact>
                    <CreateNew addNew={addNew} showNotification={showNotification} />
                </Route>
                <Route path='/about' exact>
                    <About />
                </Route>
                <Route path='/anecdotes' exact>
                    <AnecdoteList anecdotes={anecdotes} />
                </Route>
                <Route path='/' exact>
                    <AnecdoteList anecdotes={anecdotes} />
                </Route>
                <Route path='/anecdotes/:id'>
                    <Anecdote anecdotes={anecdotes} />
                </Route>
            </Switch>
            <Footer />
        </Router>
    )
}

export default App
