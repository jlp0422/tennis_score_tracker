/* eslint-disable */
import axios from 'axios'

const CREATE_MATCH = 'CREATE_MATCH'
const LOAD_MATCHES = 'LOAD_MATCHES'

export const createNewMatch = (players, history) => {
  return (dispatch) => {
    return axios.post('/api/match', players)
      .then( res => res.data)
      .then( match => {
        dispatch({ type: CREATE_MATCH, match })
        history.push(`/match/${match.id}`)
      })
      .catch(err => console.error(err))
  }
}

export const loadMatches = () => {
  return (dispatch) => {
    return axios.get('/api/match/all')
      .then( res => res.data)
      .then( matches => dispatch({ type: LOAD_MATCHES, matches }))
      .catch(err => console.error(err))
  }
}

const matchReducer = (state = [], action) => {
  switch(action.type) {
    case LOAD_MATCHES:
      return state = action.matches
    case CREATE_MATCH:
      return state = [...state, action.match]
    default:
      return state
  }
};

export default matchReducer;
