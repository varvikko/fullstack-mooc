import React from "react";
import { connect } from "react-redux";
import Filter from "./Filter";
import { updateAnecdote } from "../services/anecdoteService";
import { addNotification } from "../components/Notification";

function voteAnecdote(anecdote) {
  return async (dispatch) => {
    await updateAnecdote(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    return dispatch({ type: "VOTE", id: anecdote.id });
  };
}

function AnecdoteList(props) {
  const vote = (anecdote) => {
    props.voteAnecdote(anecdote);
    props.addNotification(`you voted ${anecdote.content}`, 5);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {props.anecdotes
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(props.filter.toLowerCase())
        )
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

var mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdote,
    filter: state.filter,
  };
};

var mapDispatchToProps = {
  voteAnecdote,
  addNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
