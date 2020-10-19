import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

var blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 22,
    user: {
        name: 'Test user'
    }
}

describe('default blog view', () => {
    test('renders title and author', () => {
        var component = render(<Blog blog={blog} />)
    
        expect(component.container).toHaveTextContent('Test title')
        expect(component.container).toHaveTextContent('Test author')
    })
    
    test('does not render likes and url', () => {
        var component = render(<Blog blog={blog} />)
    
        expect(component.container).not.toHaveTextContent('Test url')
        expect(component.container).not.toHaveTextContent('22')
    })
})

describe('full blog view', () => {
    test('renders likes, url and name when opened', () => {
        var component = render(<Blog blog={blog} />)

        var button = component.getByText('view')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent('Test url')
        expect(component.container).toHaveTextContent('22')
        expect(component.container).toHaveTextContent('Test user')
    })
})

describe('clicking like button', () => {
    test('twice calls handler twice', () => {
        var likeHandler = jest.fn()
        var component = render(<Blog blog={blog} like={likeHandler} />)

        var button = component.getByText('view')
        fireEvent.click(button)

        button = component.container.querySelector('#like-button')

        fireEvent.click(button)
        fireEvent.click(button)
        expect(likeHandler.mock.calls).toHaveLength(2)
    })
})
