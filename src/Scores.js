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
    const { playerOneGameScore, playerOneSetScore, playerTwoGameScore, playerTwoSetScore } = this.state
    if (!playerOne.id || !playerTwo.id) return null
    return (
      <div>
        <h1>Players in this match</h1>
        <h3>{ playerOne.firstInitialLastName } vs. { playerTwo.firstInitialLastName }</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '150px 100px 100px 100px 100px 100px', gridTemplateRows: '50px 50px 50px',border: '1px solid black'}}>
        <p style={{ gridRowStart: 1}}>Player Name</p>
        <p style={{ gridColumnStart: 2}}>Current Game</p>
        <p style={{ gridColumnStart: 3}}>Set 1</p>
          {/* PLAYER ONE */}
          <p style={{ fontWeight: 'bold', gridRowStart: 2 }}>{playerOne.firstInitialLastName}</p>
          <p style={{ gridColumnStart: 0, gridRowStart: 2}}>{ playerOneSetScore }</p>

          {/* PLAYER TWO */}
          <p style={{ fontWeight: 'bold', gridRowStart: 3 }}>{playerTwo.firstInitialLastName}</p>
          <p style={{ gridColumnStart: 0, gridRowStart: 3 }}>{playerTwoSetScore}</p>
        </div>
      </div>
    )
  }
}

const mapState = ({ players, matches }, { id }) => {
  const match = matches.length && matches.find(m => m.id === id)
  const playerOne = matches.length && match && players.find(p => p.id === match.playerOneId)
  const playerTwo = matches.length && match && players.find(p => p.id === match.playerTwoId)
  return { match, playerOne, playerTwo }
}

export default connect(mapState, null)(Scores);
