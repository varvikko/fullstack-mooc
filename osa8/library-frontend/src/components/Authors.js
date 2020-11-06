import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

let ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

let EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const Authors = (props) => {
    let result = useQuery(ALL_AUTHORS, { pollInterval: 2000 })
    let [ editAuthor ] = useMutation(EDIT_AUTHOR)

    function updateAuthor(e) {
        e.preventDefault()

        let name = e.target.name.value
        let year = e.target.year.value

        editAuthor({ variables: { name, setBornTo: Number(year)}})
    }

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading</div>
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {result.data.allAuthors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Set birthyear</h2>
            <form onSubmit={updateAuthor}>
                <select name='name'>
                    {result.data.allAuthors.map((author) => (
                        <option key={author.name}>{author.name}</option>
                    ))}
                </select>
                <div>
                    born
                    <input type='number' name='year' />
                </div>
                <input type='submit' value='update author' />
            </form>
        </div>
    )
}

export default Authors
