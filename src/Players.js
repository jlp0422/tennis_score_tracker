/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addPlayer } from './store/PlayerReducer';

class Players extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
    }
  }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change)
  }

  onSubmit() {
    const { firstName, lastName } = this.state
    this.props.createPlayer({ firstName, lastName })
    this.setState({ firstName: '', lastName: '' })
  }

  render() {
    const { firstName, lastName } = this.state
    const { players } = this.props
    return (
      <div>
        <h2>Enter Player { players.length < 1 ? 'One' : 'Two '}</h2>
        <input value={ firstName } name="firstName" onChange={ this.onChange.bind(this) } placeholder="First name" />
        <input value={ lastName } name="lastName" onChange={ this.onChange.bind(this) } placeholder="Last name" />
        <button disabled={ players.length > 1 } onClick={ this.onSubmit.bind(this) }>Create</button>
        <h3>Players in this Match</h3>
        <h5>
          { players[0] && players.length && players[0].id && `${players[0].firstName} ${players[0].lastName} vs. `}
          { players[1] && players[1].id && `${players[1].firstName} ${players[1].lastName}` }
        </h5>
      </div>
    )
  }
}

const mapState = ({ players }) => {
  return { players }
}

const mapDispatch = (dispatch) => {
  return {
    createPlayer: (player) => dispatch(addPlayer(player))
  }
}

export default connect(mapState, mapDispatch)(Players);
