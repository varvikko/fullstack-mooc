import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

function AnecdoteList() {
  var anecdotes = useSelector((state) => state.anecdote);
  var filter = useSelector((state) => state.filter)
  var dispatch = useDispatch()

  const vote = (id) => {
    dispatch({ type: 'VOTE', id })
    dispatch(createNotification('hello world'))
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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AnecdoteList;
