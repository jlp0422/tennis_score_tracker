/* eslint-disable */
import axios from 'axios';

const ADD_PLAYER = 'ADD_PLAYER';

export const addPlayer = (newPlayer) => {
  return (dispatch) => {
    return axios.post('/player', newPlayer)
      .then(res => res.data)
      .then(player => dispatch({ type: ADD_PLAYER, player }))
      .catch(err => console.error(err))
  }
}

const playerReducer = (state = [], action) => {
  switch(action.type) {
    case ADD_PLAYER:
      return state = [...state, action.player ]
    default:
      return state;
  }
}

export default playerReducer;
