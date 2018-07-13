/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addPlayer } from './store/PlayerReducer';
import { createNewMatch } from './store/MatchReducer';

class Players extends React.Component {
  constructor() {
    super()
    this.state = {
      playerOneId: '',
      playerTwoId: ''
    }
  }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value * 1
    this.setState(change)
  }

  onSubmit() {
    this.props.createMatch(this.state)
  }

  render() {
    const { playerOneId, playerTwoId } = this.state
    const { players, match } = this.props
    return (
      <div>
        <h2>Select Players</h2>

        <label>Player One</label>
        <select name="playerOneId" onChange={ this.onChange.bind(this) } value={ playerOneId }>
            <option value={0}>Select player</option>
          { players.map(player => (
            <option value={ player.id } key={player.id}>{`${player.firstName} ${player.lastName}`}</option>
          ))}
        </select>
          <br/>
        <label>Player Two</label>
        <select name="playerTwoId" onChange={ this.onChange.bind(this) } value={ playerTwoId }>
            <option value={0}>Select player</option>
          { players.map(player => (
            <option value={ player.id } key={player.id}>{`${player.firstName} ${player.lastName}`}</option>
          ))}
        </select>
          <br />
        <button disabled={ playerOneId === playerTwoId || !playerOneId || !playerTwoId } onClick={ this.onSubmit.bind(this) }>Start Match</button>
        <h3>Players in this Match</h3>
          <p>{ match.id ? (
          `${players.find(player => player.id === match.playerOneId).firstInitialLastName} vs. ${players.find(player => player.id === match.playerTwoId).firstInitialLastName}`
          ) : null
        }</p>
        <h5>
        </h5>
      </div>
    )
  }
}

const mapState = ({ players, match }) => {
  return { players, match }
}

const mapDispatch = (dispatch) => {
  return {
    // createPlayer: (player) => dispatch(addPlayer(player)),
    createMatch: (players) => dispatch(createNewMatch(players))
  }
}

export default connect(mapState, mapDispatch)(Players);
