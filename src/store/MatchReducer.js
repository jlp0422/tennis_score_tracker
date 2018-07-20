/* eslint-disable */
import axios from 'axios'

const CREATE_MATCH = 'CREATE_MATCH'
const LOAD_MATCHES = 'LOAD_MATCHES'
const UPDATE_MATCH = 'UPDATE_MATCH'

export const createNewMatch = (players, history) => {
  return (dispatch) => {
    return axios.post('/api/match/create', players)
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

export const setFinal = (id, playerOneScore, playerTwoScore, setNumber) => {
  return (dispatch) => {
    console.log('set posted')
    return axios.put(`/api/match/${id}`, { playerOneScore, playerTwoScore, setNumber })
      .then( res => res.data)
      .then( match => dispatch({ type: UPDATE_MATCH, match }))
      .catch(err => console.error(err))
  }
}

const matchReducer = (state = [], action) => {
  switch(action.type) {
    case LOAD_MATCHES:
      return state = action.matches
    case CREATE_MATCH:
      return state = [...state, action.match]
    case UPDATE_MATCH:
      const otherMatches = state.filter(match => match.id !== action.match.id)
      return state = [...otherMatches, action.match]
    default:
      return state
  }
};

export default matchReducer;
