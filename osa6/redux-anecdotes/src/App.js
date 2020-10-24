import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { getAnecdotes } from './services/anecdoteService'
import { initialize } from './reducers/anecdoteReducer'

function initializeAnecdotes() {
  return async (dispatch) => {
    var response = await getAnecdotes()
    dispatch({
      type: 'INIT_ANECDOTES', anecdotes: response.data
    })
  }
}

const App = () => {
  var dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App