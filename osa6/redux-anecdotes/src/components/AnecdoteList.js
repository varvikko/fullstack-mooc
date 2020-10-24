import React from "react";
import { useDispatch, useSelector } from "react-redux";

function AnecdoteList() {
  var anecdotes = useSelector((state) => state);
  var dispatch = useDispatch()

  const vote = (id) => {
    dispatch({ type: 'VOTE', id })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
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
