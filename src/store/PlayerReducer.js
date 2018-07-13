/* eslint-disable */
import axios from 'axios';

const ADD_PLAYER = 'ADD_PLAYER';
const LOAD_PLAYERS = 'LOAD_PLAYERS';

export const addPlayer = (newPlayer) => {
  return (dispatch) => {
    return axios.post('/api/player', newPlayer)
      .then(res => res.data)
      .then(player => dispatch({ type: ADD_PLAYER, player }))
      .catch(err => console.error(err))
  }
}

export const loadPlayers = () => {
  return (dispatch) => {
    return axios.get('/api/player/all')
      .then( res => res.data)
      .then( players => dispatch({ type: LOAD_PLAYERS, players }))
      .catch(err => console.error(err))
  }
}

const playerReducer = (state = [], action) => {
  switch(action.type) {
    case LOAD_PLAYERS:
      return state = action.players
    case ADD_PLAYER:
      return state = [...state, action.player ]
    default:
      return state;
  }
}

export default playerReducer;
