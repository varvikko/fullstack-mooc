import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


describe('submitting blog form', () => {
    test('gets correct values', () =>{
        var submitHandler = jest.fn()

        var component = render(<BlogForm createBlog={submitHandler} />)
    
        var title = component.container.querySelector('#title')
        var author = component.container.querySelector('#author')
        var url = component.container.querySelector('#url')

        fireEvent.change(title, { target: { value: 'Test title' }})
        fireEvent.change(author, { target: { value: 'Test author' }})
        fireEvent.change(url, { target: { value: 'Test url' }})

        var button = component.container.querySelector('#create-blog')

        fireEvent.click(button)
        expect(submitHandler.mock.calls[0][0]).toBe('Test title')
        expect(submitHandler.mock.calls[0][1]).toBe('Test author')
        expect(submitHandler.mock.calls[0][2]).toBe('Test url')
    })
})
