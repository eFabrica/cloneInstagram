import {createStore, combineReducers, compose, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import userReducer from './reduces/user'
import postsReducer from './reduces/posts'

const reducers = combineReducers({
    user: userReducer,
    posts: postsReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig
    