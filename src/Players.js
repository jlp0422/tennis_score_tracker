/* eslint-disable */
import React from 'react';
import axios from 'axios';

class Players extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      player: 'One',
      playerOne: {},
      playerTwo: {}
    }
  }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change)
  }

  onSubmit() {
    const { firstName, lastName, player } = this.state
    axios.post('/player', { firstName, lastName })
      .then(res => {
        player === 'One' ? (
          this.setState({ firstName: '', lastName: '', player: 'Two', playerOne: res.data })
        ) : (
          this.setState({ firstName: '', lastName: '', playerTwo: res.data })
        )
      })
      .catch(err => console.error(err))
  }

  render() {
    const { firstName, lastName, player, playerOne, playerTwo } = this.state
    return (
      <div>
        <h2>Enter Player {player}</h2>
        <input value={ firstName } name="firstName" onChange={ this.onChange.bind(this) } placeholder="First name" />
        <input value={ lastName } name="lastName" onChange={ this.onChange.bind(this) } placeholder="Last name" />
        <button disabled={ playerOne.id && playerTwo.id } onClick={ this.onSubmit.bind(this) }>Create</button>
        <h3>Players in this Match</h3>
        <h5>{ playerOne.id && `${playerOne.firstName} ${playerOne.lastName} vs. `} { playerTwo.id && `${playerTwo.firstName} ${playerTwo.lastName}`}</h5>
      </div>
    )
  }
}

export default Players;
