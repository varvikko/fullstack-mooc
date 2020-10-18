import axios from 'axios'

function getPersons() {
    return axios.get('http://localhost:3001/persons')
        .then(response => response.data)
}

function addPerson(name, number) {
    return axios.post('http://localhost:3001/persons', {
        name, number
      })
}

function deletePerson(id) {
    return axios.delete(`http://localhost:3001/persons/${id}`)
}

function editPerson(person, number) {
    return axios.put(`http://localhost:3001/persons/${person.id}`, {
        ...person,
        number
    }).then(response => response.data)
}

export default {
    getPersons,
    addPerson,
    deletePerson,
    editPerson
}
