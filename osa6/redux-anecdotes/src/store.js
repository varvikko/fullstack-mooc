import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

export default createStore(combineReducers({
    anecdote: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
}))
