import React from "react";
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

function AnecoteForm() {
  var dispatch = useDispatch()

  function addAnecdote(e) {
    e.preventDefault();
    var anecdote = e.target.anecdote.value;

    dispatch(createAnecdote(anecdote));
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
}

export default AnecoteForm;
