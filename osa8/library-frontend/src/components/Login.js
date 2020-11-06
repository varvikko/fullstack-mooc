import React from 'react'
import { gql, useMutation } from '@apollo/client'

let LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export default function({ show, setToken }) {
    let [ login ] = useMutation(LOGIN)

    async function onLogin(e) {
        e.preventDefault()

        let username = e.target.name.value
        let password = e.target.password.value
        try {
            let token = await login({ variables: { username, password }})
            alert('Logged in')
            setToken(token.data.login.value)
            window.localStorage.setItem('token', token.data.login.value)
        } catch (e) {
            alert('Invalid password')
        }
    }

    if (!show) {
        return null
    }

    return (<form onSubmit={onLogin}>
        <h2>login</h2>
        <div>
            name
            <input name='name' />
        </div>
        <div>
            password
            <input name='password' type='password' />
        </div>
        <input type='submit' value='login' />

    </form>)
}