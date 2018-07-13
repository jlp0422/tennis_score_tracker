/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

class Scores extends React.Component {
  constructor() {
    super()
    this.state = {
      playerOneGameScore: 0,
      playerOneSetScore: 0,
      playerTwoGameScore: 0,
      playerTwoSetScore: 0
    }
  }

  render() {
    const { playerOne, playerTwo, match } = this.props
    return (
      <div>
        <h1>Players in this match</h1>
        <h3>{ playerOne.firstInitialLastName } vs. { playerTwo.firstInitialLastName }</h3>
      </div>
    )
  }
}

const mapState = ({ players, matches }, { id }) => {
  console.log(id)
  const match = matches.length && matches.find(m => m.id === id)
  const playerOne = matches.length && match && players.find(p => p.id === match.playerOneId)
  const playerTwo = matches.length && match && players.find(p => p.id === match.playerTwoId)
  return { match, playerOne, playerTwo }
}

export default connect(mapState, null)(Scores);
