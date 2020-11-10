import React from 'react';
import ReactDOM from 'react-dom';

interface HeaderProps {
    name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
    return <h1>{name}</h1>;
};

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
    description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
    name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
    name: 'Using props to pass data';
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
    name: 'Deeper type usage';
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: 'Introduction to functional programming with CoffeeScript';
  deadline: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

interface PartProps {
    part: CoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part: React.FC<PartProps> = ({ part }) => {
    switch (part.name) {
        case 'Fundamentals':
            return (
                <p>
                    {part.name} {part.exerciseCount} {part.description}
                </p>
            );
        case 'Using props to pass data':
            return (
                <p>
                    {part.name} {part.exerciseCount} {part.groupProjectCount}
                </p>
            );
        case 'Deeper type usage':
            return (
                <p>
                    {part.name} {part.exerciseCount} {part.description}{' '}
                    {part.exerciseSubmissionLink}
                </p>
            );
        case 'Introduction to functional programming with CoffeeScript':
          return (
            <p>
            {part.name} {part.exerciseCount} {part.description} {part.deadline}
              </p>
          )
        default:
            return assertNever(part);
    }
};

interface ContentProps {
    parts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.name} part={part} />
            ))}
        </div>
    );
};

interface TotalProps {
    parts: CoursePart[];
}

const Total: React.FC<TotalProps> = ({ parts }) => {
    return (
        <div>
            Number of exercises{' '}
            {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    );
};

const App: React.FC = () => {
    const courseName = 'Half Stack application development';
    const courseParts: CoursePart[] = [
        {
            name: 'Fundamentals',
            exerciseCount: 10,
            description: 'This is an awesome course part'
        },
        {
            name: 'Using props to pass data',
            exerciseCount: 7,
            groupProjectCount: 3
        },
        {
            name: 'Deeper type usage',
            exerciseCount: 14,
            description: 'Confusing description',
            exerciseSubmissionLink:
                'https://fake-exercise-submit.made-up-url.dev'
        },
        {
            name: 'Introduction to functional programming with CoffeeScript',
            exerciseCount: 18,
            description: 'Course description',
            deadline: 'today'
        }
    ];

    return (
        <div>
            <Header name={courseName} />
            <Content parts={courseParts} />
            <Total parts={courseParts} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
