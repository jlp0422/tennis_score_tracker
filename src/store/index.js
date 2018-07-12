import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import playerReducer from './PlayerReducer';

const reducer = combineReducers({
  players: playerReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store;
