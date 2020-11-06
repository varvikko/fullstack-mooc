import React from 'react'
import ReactDOM from 'react-dom'
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    gql,
    ApolloProvider
} from '@apollo/client'
import { setContext } from 'apollo-link-context'
import App from './App'

let authLink = setContext((_, { headers }) => {
    let token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null
        }
    }
})

let httpLink = new HttpLink({ uri: 'http://localhost:4000' })

let client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
