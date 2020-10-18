import React, { useState, useEffect } from "react";
import Axios from "axios";
import service from './services'

function Person({ person, remove }) {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => remove(person)}>delete</button>
    </p>
  );
}

function Persons({ persons, remove }) {
  return persons.map((person) => (
    <Person key={person.name} person={person} remove={remove} />
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

    if ((p = persons.find((person) => person.name === newName))) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        var p

        service.editPerson(p, newNumber).then(response => {
          var i = persons.findIndex(p => p.name === newName)
          var c = [...persons]

          c[i].number = response.number
          setPersons(c)
        })
      }
    } else {
      service.addPerson(newName, newNumber).then(response => {
        setPersons([...persons, response.data])
      })
    }
  }

  function removePerson(person) {
    if (window.confirm(`Delete ${person.name}`)) {
      service.deletePerson(person.id).then(response => {
        var c = [...persons].filter((p) => p.id !== person.id)
        setPersons(c)
      }).catch(() => {
        // error
      })
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
        )} remove={removePerson}
      />
    </div>
  );
};

export default App;
