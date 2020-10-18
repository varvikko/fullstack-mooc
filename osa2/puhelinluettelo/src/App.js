import React, { useState, useEffect } from "react";
import Axios from "axios";
import service from './services'
import './index.css'

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

function Notification({ notification }) {
  if (!notification) {
    return null
  }

  return (
    <div className={`notification ${notification.type === 'success' ? 'notification--success' : 'notification--error'}`}>
      { notification.text }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  var [newNumber, setNewNumber] = useState("");
  var [filter, setFilter] = useState("");
  var [notification, setNotification] = useState(null)

  useEffect(() => service.getPersons().then(response => {
    console.log(response)
    setPersons(response)
  }), []);

  function addNotification(text, type) {
    if (notification) {
      clearTimeout(notification.id)
    }
    var id = setTimeout(() => setNotification(null), 3000)
    setNotification({ text, type, id })
  }

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
          addNotification(`Updated ${newName}'s number`, 'success')
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      service.addPerson(newName, newNumber).then(response => {
        setPersons([...persons, response.data])
        addNotification(`Added ${newName}`, 'success')
      }).catch(error => [
        addNotification(error.response.data.error.message, 'error')
      ]).finally(() => {
          setNewName('')
          setNewNumber('')
      })
    }
  }

  function removePerson(person) {
    if (window.confirm(`Delete ${person.name}`)) {
      service.deletePerson(person.id).then(response => {
        var c = [...persons].filter((p) => p.id !== person.id)
        setPersons(c)
        addNotification(`Removed ${person.name}`, 'success');
      }).catch(() => {
        addNotification(`${person.name} is already deleted`, 'error')
      })
    }
  }

  return (
    <div>
      <Notification notification={notification} />
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
