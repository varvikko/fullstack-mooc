import React, { useState } from 'react'

function BlogForm(props) {
    var [title, setTitle] = useState('')
    var [author, setAuthor] = useState('')
    var [url, setUrl] = useState('')

    return (
        <div>
            <h2>Create new</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    props.createBlog(title, author, url)
                }}>
                <div className='form__item'>
                    <label htmlFor='title'>title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id='title'
                    />
                </div>
                <div className='form__item'>
                    <label htmlFor='author'>author</label>
                    <input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        id='author'
                    />
                </div>
                <div className='form__item'>
                    <label htmlFor='title'>url</label>
                    <input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        id='url'
                    />
                </div>
                <button type='submit' id='create-blog'>
                    create
                </button>
            </form>
        </div>
    )
}

export default BlogForm
