import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles/App.sass'

function Blogs({ blogs, like, remove, user }) {
    return (
        <div>
            <h2 class='blogs__title'>blogs</h2>
            {blogs
                .sort((a, b) => {
                    if (a.likes < b.likes) {
                        return 1
                    } else {
                        return -1
                    }
                })
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        like={like}
                        remove={remove}
                        user={user}
                    />
                ))}
        </div>
    )
}

function LoginForm(props) {
    return (
        <div className='login__form'>
            <h2>log in to application</h2>
            <div className='form__item'>
                username
                <input
                    value={props.username}
                    onChange={(e) => props.changeUsername(e.target.value)}
                    id='username'
                />
            </div>
            <div className='form__item'>
                password
                <input
                    type='password'
                    value={props.password}
                    onChange={(e) => props.changePassword(e.target.value)}
                    id='password'
                />
            </div>
            <button id='login-button' onClick={props.login}>
                login
            </button>
        </div>
    )
}

function Notification({ text, type }) {
    return (
        <div
            className={`notification ${
                type === 'success'
                    ? 'notification--success'
                    : 'notification--error'
            }`}>
            {text}
        </div>
    )
}

const App = () => {
    const [blogs, setBlogs] = useState([])
    var [username, setUsername] = useState('')
    var [password, setPassword] = useState('')
    var [user, setUser] = useState(null)
    var [notification, setNotification] = useState(null)
    var [formVisible, setFormVisible] = useState(false)

    async function login() {
        try {
            var u = await loginService.login({ username, password })
            setUser(u)
            window.localStorage.setItem('blogapp-user', JSON.stringify(u))
            addNotification('Logged in', 'success')
        } catch (e) {
            addNotification('Invalid credentials', 'error')
        } finally {
            setUsername('')
            setPassword('')
        }
    }

    async function like(blog) {
        var b = { ...blog }
        b.likes++
        var r = await blogService.updateBlog(b)

        var bc = [...blogs]
        var i = bc.findIndex((bb) => bb.id === b.id)
        bc[i].likes += 1
        setBlogs(bc)
    }

    async function remove(blog) {
        try {
            await blogService.removeBlog(user, blog.id)

            var cb = [...blogs]
            var i = cb.findIndex((b) => b.id === blog.id)
            cb.splice(i, 1)
            setBlogs(cb)
            addNotification(`Removed ${blog.title}.`, 'success')
        } catch (e) {
            addNotification(`Unable to remove ${blog.title}`, 'error')
        }
    }

    function logout() {
        if (user) {
            window.localStorage.removeItem('blogapp-user')
            setUser(null)
            addNotification('Logged out', 'success')
        }
    }

    async function createBlog(title, author, url) {
        if (user) {
            try {
                var response = await blogService.createBlog(
                    { title: title, author: author, url: url },
                    user
                )

                response.user = { name: user.name }
                addNotification(`Created blog ${title}`, 'success')
                setBlogs([...blogs, response])
                setFormVisible(false)
            } catch (e) {
                addNotification(e.message, 'error')
            }
        }
    }

    function addNotification(text, type) {
        if (notification) {
            clearTimeout(notification.id)
        }

        setNotification({
            text,
            type,
            id: setTimeout(() => setNotification(null), 5000)
        })
    }

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        var storageItem = window.localStorage.getItem('blogapp-user')
        if (storageItem) {
            var u = JSON.parse(storageItem)
            setUser(u)
        }
    }, [])

    return (
        <div>
            {notification && (
                <Notification
                    text={notification.text}
                    type={notification.type}
                />
            )}
            {user ? (
                <div>
                    <div className='header'>
                        {user.username} logged in{' '}
                        <button onClick={logout}>logout</button>
                        {formVisible ? (
                            <div className='blog__form'>
                                <BlogForm createBlog={createBlog} />
                                <button onClick={() => setFormVisible(false)}>
                                    cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                className='create-button'
                                onClick={() => setFormVisible(true)}
                                id='open-create-blog'>
                                create new blog
                            </button>
                        )}
                    </div>
                    <Blogs
                        blogs={blogs}
                        like={like}
                        remove={remove}
                        user={user}
                    />
                </div>
            ) : (
                <LoginForm
                    username={username}
                    password={password}
                    changeUsername={setUsername}
                    changePassword={setPassword}
                    login={login}
                />
            )}
        </div>
    )
}

export default App
