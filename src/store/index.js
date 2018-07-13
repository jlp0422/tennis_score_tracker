import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import playerReducer from './PlayerReducer';
import matchReducer from './MatchReducer';

const reducer = combineReducers({
  players: playerReducer,
  match: matchReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store;
