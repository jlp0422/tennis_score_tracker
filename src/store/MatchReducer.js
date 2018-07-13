/* eslint-disable */
import axios from 'axios'

const CREATE_MATCH = 'CREATE_MATCH'

export const createNewMatch = (players) => {
  return (dispatch) => {
    return axios.post('/api/match', players)
      .then( res => res.data)
      .then( match => dispatch({ type: CREATE_MATCH, match }))
      .catch(err => console.error(err))
  }
}

const matchReducer = (state = {}, action) => {
  switch(action.type) {
    case CREATE_MATCH:
      return state = action.match
    default:
      return state
  }
};

export default matchReducer
