import React from 'react'
import ReactDOM from 'react-dom'
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    gql,
    ApolloProvider
} from '@apollo/client'
import App from './App'

let client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000'
    })
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
