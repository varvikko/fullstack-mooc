import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

let ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
          name
      }
      published
      genres
    }
  }
`

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuhtor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    let [ addBook ] = useMutation(ADD_BOOK)

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        console.log('add book...')

        addBook({ variables: {
          title, published: Number(published), author, genres
        }})

        setTitle('')
        setPublished('')
        setAuhtor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuhtor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type='number'
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type='button'>
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type='submit'>create book</button>
            </form>
        </div>
    )
}

export default NewBook
