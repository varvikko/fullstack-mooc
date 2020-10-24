import axios from 'axios'
import AnecdoteList from '../components/AnecdoteList'

export function getAnecdotes() {
    return axios.get('http://localhost:4000/anecdotes')
}

export function postAnecdote(anecdote) {
    return axios.post('http://localhost:4000/anecdotes', anecdote)
}

export function updateAnecdote(id, body) {
    return axios.put(`http://localhost:4000/anecdotes/${id}`, body)
}
