import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' 
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

export default createStore(combineReducers({
    anecdote: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
}), composeWithDevTools(
    applyMiddleware(thunk)
))
