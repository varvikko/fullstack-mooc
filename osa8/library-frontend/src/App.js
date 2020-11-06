import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useLazyQuery, gql, useQuery } from '@apollo/client'

let FAVORITE_GENRE = gql`
    query {
        favoriteGenre
    }
`

let BOOKS_IN_GENRE = gql`
    query booksInGenre($genre: String!) {
        allBooks(genre: $genre) {
            title
            author {
                name
            }
            published
        }
    }
`

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)
    let [getFavoriteGenre, favoriteGenre] = useLazyQuery(FAVORITE_GENRE)
    let [getBooks, { called }] = useLazyQuery(BOOKS_IN_GENRE, {
        onCompleted: (data) => {
            setBooks(data.allBooks)
        }
    })
    let [books, setBooks] = useState([])

    function logout() {
        window.localStorage.removeItem('token')
        setToken(null)
    }
    if ((t = window.localStorage.getItem('token')) && !token) {
        var t
        setToken(t)
    }

    if (page === 'recommendation' && !favoriteGenre.called) {
        getFavoriteGenre()
    }

    if (favoriteGenre.loading) {
        return <p>loading</p>
    }

    if (favoriteGenre.data && favoriteGenre.data.favoriteGenre && !called) {
        getBooks({ variables: { genre: favoriteGenre.data.favoriteGenre } })
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token ? (
                    <>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button
                            onClick={() => {
                                setPage('recommendation')
                            }}>
                            recommend
                        </button>
                        <button onClick={logout}>logout</button>
                    </>
                ) : (
                    <button onClick={() => setPage('login')}>login</button>
                )}
            </div>

            <Authors show={page === 'authors'} />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} />

            <Login show={page === 'login'} setToken={setToken} />

            {page === 'recommendation' ? (
                <div>
                    <h2>recommendation</h2>
                    {books && (
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
                    )}
                </div>
            ) : null}
        </div>
    )
}

export default App
