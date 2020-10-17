import React from "react";
import ReactDOM from "react-dom";

function Header({ course }) {
  return <h1>{course}</h1>;
}

function Content(props) {
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  );
}

function Part({ name, exercises }) {
  return (
    <p>
      {name} {exercises}
    </p>
  );
}

function Total({ parts }) {
  return (
    <p>
      Number of exercises{" "}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
}

const App = () => {
  const course = "Half Stack application development";

  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },

    {
      name: "Using props to pass data",
      exercises: 7,
    },

    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
