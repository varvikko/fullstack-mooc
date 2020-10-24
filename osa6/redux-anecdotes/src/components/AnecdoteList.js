import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { updateAnecdote } from '../services/anecdoteService'
import { addNotification } from '../components/Notification'

function voteAnecdote(anecdote) {
  return async (dispatch) => {
    await updateAnecdote(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })

    return dispatch({ type: 'VOTE', id: anecdote.id })
  }
}

function AnecdoteList() {
  var anecdotes = useSelector((state) => state.anecdote);
  var filter = useSelector((state) => state.filter)
  var dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(addNotification(`you voted ${anecdote.content}`), 5)
}

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AnecdoteList;
