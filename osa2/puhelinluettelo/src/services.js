import axios from 'axios'

var baseUrl = '/api/persons'

function getPersons() {
    return axios.get(baseUrl)
        .then(response => response.data)
}

function addPerson(name, number) {
    return axios.post(baseUrl, {
        name, number
      })
}

function deletePerson(id) {
    return axios.delete(`${baseUrl}/${id}`)
}

function editPerson(person, number) {
    return axios.put(`${baseUrl}/${person.id}`, {
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
