import React from "react";
import { useDispatch, connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { postAnecdote } from '../services/anecdoteService'
import { createNotification } from '../reducers/notificationReducer'
import { addNotification } from './Notification'

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

function AnecdoteForm(props) {
  var dispatch = useDispatch()

  function addAnecdote(e) {
    e.preventDefault();
    var anecdote = e.target.anecdote.value;
    props.sendAnecdote(anecdote)
    props.addNotification(`created ${anecdote}`, 5)
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

var mapDispatchToProps = {
  sendAnecdote,
  addNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm);
