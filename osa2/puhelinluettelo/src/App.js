import React, { useState, useEffect } from "react";
import Axios from "axios";

function Person({ name, number }) {
  return (
    <p>
      {name} {number}
    </p>
  );
}

function Persons({ persons }) {
  return persons.map((person) => (
    <Person key={person.name} name={person.name} number={person.number} />
  ));
}

function Filter({ text, value, onChange }) {
  return (
    <div>
      {text} <input value={value} onChange={onChange} />
    </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  var [newNumber, setNewNumber] = useState("");
  var [filter, setFilter] = useState("");

  useEffect(function getPersons() {
    Axios.get("http://localhost:3001/persons")
      .then((response) => response.data)
      .then((personsData) => setPersons(personsData));
  }, []);

  function addPerson(e) {
    e.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        text="filter shown with"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons
        persons={persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )}
      />
    </div>
  );
};

export default App;
