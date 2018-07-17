/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { setFinal } from './store/MatchReducer';

class Scores extends React.Component {
  constructor() {
    super()
    this.state = {
      playerOneGameScore: 0,
      playerOneSetScore: 0,
      playerTwoGameScore: 0,
      playerTwoSetScore: 0,
      activeSet: 1
    }
    this.addPoint = this.addPoint.bind(this)
  }

  addPoint(player) {
    let newGameScore
    let newSetScore
    const { submitSet, match } = this.props
    const { playerOneGameScore, playerOneSetScore, playerTwoGameScore, playerTwoSetScore, activeSet } = this.state
    submitSet(match.id, playerOneSetScore, playerTwoSetScore, activeSet)
    if (player === 'playerOne') {
      if (playerOneGameScore >= 30) {
        if (playerTwoGameScore <= 30) {
          // if player two has less than 30
          if (playerOneGameScore === 30) this.setState({ playerOneGameScore: 40 })
          else {
            this.setState({ playerOneGameScore: 0, playerTwoGameScore: 0, playerOneSetScore: playerOneSetScore + 1})
          }
        } else {
          // if player two has 40
          if (playerTwoGameScore === 45) this.setState({ playerTwoGameScore: 40 })
          else if (playerOneGameScore === 30) this.setState({ playerOneGameScore: 40 })
          else if (playerOneGameScore === 40) this.setState({ playerOneGameScore: 45 })
          else {
            this.setState({ playerOneGameScore: 0, playerTwoGameScore: 0, playerOneSetScore: playerOneSetScore + 1 })

          }
        }
      }
      else this.setState({ playerOneGameScore: playerOneGameScore + 15 })
    }
    else {
      if (playerTwoGameScore >= 30) {
        if (playerOneGameScore <= 30) {
          // if player one has less than 30
          if (playerTwoGameScore === 30) this.setState({ playerTwoGameScore: 40 })
          else this.setState({ playerTwoGameScore: 0, playerOneGameScore: 0, playerTwoSetScore: playerTwoSetScore + 1 })
        } else {
          // if player one has 40
          if (playerOneGameScore === 45) this.setState({ playerOneGameScore: 40})
          else if (playerTwoGameScore === 30) this.setState({ playerTwoGameScore: 40 })
          else if (playerTwoGameScore === 40) this.setState({ playerTwoGameScore: 45 })
          else this.setState({ playerTwoGameScore: 0, playerOneGameScore: 0, playerTwoSetScore: playerTwoSetScore + 1 })
        }
      }
      else this.setState({ playerTwoGameScore: playerTwoGameScore + 15 })
    }
  }

  render() {
    const { addPoint } = this
    const { playerOne, playerTwo, match } = this.props
    const { playerOneGameScore, playerOneSetScore, playerTwoGameScore, playerTwoSetScore } = this.state
    if (!playerOne || !playerTwo) return null
    console.log(match)
    return (
      <div>
        <h1>Players in this match</h1>
        <h3>{ playerOne.firstInitialLastName } vs. { playerTwo.firstInitialLastName }</h3>
        <h4>Last Point:
          <button onClick={() => addPoint('playerOne')}>{ playerOne.lastName }</button>
          {'  '}
          <button onClick={() => addPoint('playerTwo')}>{ playerTwo.lastName }</button>
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '150px 100px 100px 100px 100px 100px', gridTemplateRows: '50px 50px 50px',border: '1px solid black'}}>
        <p style={{ gridRowStart: 1}}>Player Name</p>
        <p style={{ gridColumnStart: 2}}>Current Game</p>
        <p style={{ gridColumnStart: 3}}>Set 1</p>
          {/* PLAYER ONE */}
          <p style={{ gridColumnStart: 1, gridRowStart: 2, fontWeight: 'bold' }}>{playerOne.firstInitialLastName}</p>
          <p style={{ gridColumnStart: 2, gridRowStart: 2, fontWeight: 'bold' }}>{ playerOneGameScore }</p>
          <p style={{ gridColumnStart: 3, gridRowStart: 2 }}>{ match.playerOneSetOne || playerOneSetScore }</p>
          { match.playerOneSetOne &&
            <p style={{ gridColumnStart: 4, gridRowStart: 2 }}>{match.playerOneSetTwo || playerOneSetScore}</p>
          }
          { match.playerOneSetTwo &&
            <p style={{ gridColumnStart: 5, gridRowStart: 2 }}>{match.playerOneSetThree || playerOneSetScore}</p>
          }
          { match.playerOneSetThree &&
            <p style={{ gridColumnStart: 6, gridRowStart: 2 }}>{match.playerOneSetFour || playerOneSetScore}</p>
          }
          { match.playerOneSetFour &&
            <p style={{ gridColumnStart: 7, gridRowStart: 2 }}>{match.playerOneSetFive || playerOneSetScore}</p>
          }

          {/* PLAYER TWO */}
          <p style={{ gridColumnStart: 1, gridRowStart: 3, fontWeight: 'bold' }}>{playerTwo.firstInitialLastName}</p>
          <p style={{ gridColumnStart: 2, gridRowStart: 3, fontWeight: 'bold' }}>{playerTwoGameScore}</p>
          <p style={{ gridColumnStart: 3, gridRowStart: 3 }}>{ match.playerTwoSetOne || playerTwoSetScore }</p>
          { match.playerTwoSetOne &&
            <p style={{ gridColumnStart: 4, gridRowStart: 2 }}>{match.playerTwoSetTwo || playerTwoSetScore}</p>
          }
          { match.playerTwoSetTwo &&
            <p style={{ gridColumnStart: 5, gridRowStart: 2 }}>{match.playerTwoSetThree || playerTwoSetScore}</p>
          }
          { match.playerTwoSetThree &&
            <p style={{ gridColumnStart: 6, gridRowStart: 2 }}>{match.playerTwoSetFour || playerTwoSetScore}</p>
          }
          { match.playerTwoSetFour &&
            <p style={{ gridColumnStart: 7, gridRowStart: 2 }}>{match.playerTwoSetFive || playerTwoSetScore}</p>
          }
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

const mapDispatch = ( dispatch ) => {
  return {
    submitSet: (id, p1, p2, set) => dispatch(setFinal(id, p1, p2, set))
  }
}

export default connect(mapState, mapDispatch)(Scores);
