import React, { useState, useEffect } from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'

let ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author {
                name
            }
            published
        }
    }
`

let GENRES = gql`
    query {
        genres
    }
`

let BOOKS_IN_GENRE = gql`
    query allBooks($genre: String!) {
        allBooks(genre: $genre) {
            title
            author {
                name
            }
            published
        }
    }
`

const Books = (props) => {
    let [books, setBooks] = useState([])
    let result = useQuery(ALL_BOOKS, { pollInterval: 2000 })

    let genres = useQuery(GENRES)
    let [ showGenre, { loading, data } ] = useLazyQuery(BOOKS_IN_GENRE)

    useEffect(() => {
        if (result.data && !loading) {
            setBooks(result.data.allBooks)
        }
        if (data && data.allBooks) {
            setBooks(data.allBooks)
        }
    }, [result, data])

    function filter(genre) {
        let filtered = showGenre({ variables: { genre }})
    }

    if (!props.show) {
        return null
    }

    if (result.loading || genres.loading) {
        return <div>loading</div>
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {genres.data.genres.map((genre) => (
                    <button key={genre} onClick={() => filter(genre)}>
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Books
