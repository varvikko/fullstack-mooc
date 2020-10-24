import React from "react";
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { postAnecdote } from '../services/anecdoteService'
import { createNotification } from '../reducers/notificationReducer'

function sendAnecdote(anecdote) {
  return async (dispatch) => {
    await postAnecdote({
      content: anecdote,
      votes: 0
    })

    return dispatch({
      type: 'ADD_ANECDOTE',
      content: anecdote
    })
  }
}

function AnecoteForm() {
  var dispatch = useDispatch()

  function addAnecdote(e) {
    e.preventDefault();
    var anecdote = e.target.anecdote.value;
    dispatch(createNotification(`created ${anecdote}`))
    

    dispatch(sendAnecdote(anecdote))
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
