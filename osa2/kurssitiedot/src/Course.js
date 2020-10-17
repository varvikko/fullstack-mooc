import React from "react";

function Course({ course }) {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

function Header({ title }) {
  return <h1>{title}</h1>;
}

function Content({ parts }) {
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} />
      ))}
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
    <p>Number of exercises {parts.reduce((p, c) => p + c.exercises, 0)}</p>
  );
}

export default Course;
