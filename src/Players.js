/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
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
    const { createMatch, history } = this.props
    createMatch(this.state, history)
  }

  render() {
    const { playerOneId, playerTwoId } = this.state
    const { players } = this.props
    return (
      <div>
        <h2>Select Players</h2>

        <label>Player One&nbsp;</label>
        <select name="playerOneId" onChange={ this.onChange.bind(this) } value={ playerOneId }>
          <option value={0}>Select player</option>
          { players.map(player => (
            <option value={ player.id } key={player.id}>{`${player.firstName} ${player.lastName}`}</option>
          ))}
        </select>
          <br/><br/>
        <label>Player Two&nbsp;</label>
        <select name="playerTwoId" onChange={ this.onChange.bind(this) } value={ playerTwoId }>
          <option value={0}>Select player</option>
          { players.map(player => (
            <option value={ player.id } key={player.id}>{`${player.firstName} ${player.lastName}`}</option>
          ))}
        </select>
        <br /><br />

        <button disabled={ playerOneId === playerTwoId || !playerOneId || !playerTwoId } onClick={ this.onSubmit.bind(this) }>Start Match</button>
        <h5>
        </h5>
      </div>
    )
  }
}

const mapState = ({ players }, { history }) => {
  return { players, history }
}

const mapDispatch = (dispatch) => {
  return {
    createMatch: (players, history) => dispatch(createNewMatch(players, history))
  }
}

export default connect(mapState, mapDispatch)(Players);
