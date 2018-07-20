/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { updateMatch } from './store/MatchReducer';

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
    this.pointOver = this.pointOver.bind(this)
    this.saveMatch = this.saveMatch.bind(this)
  }

  componentDidUpdate() {
    this.checkSet()
  }

  saveMatch() {
    const { match, saveMatch } = this.props
    const {
      playerOneGameScore,
      playerOneSetScore,
      playerTwoGameScore,
      playerTwoSetScore,
      activeSet
    } = this.state
    saveMatch(match.id, playerOneGameScore, playerOneSetScore, playerTwoGameScore, playerTwoSetScore, activeSet)
  }

  pointOver(player) {
    // let newGameScore
    // let newSetScore
    // const { submitSet, match } = this.props
    const { playerOneGameScore, playerOneSetScore, playerTwoGameScore, playerTwoSetScore } = this.state
    if (player === 'playerOne') {
      if (playerOneGameScore >= 30) {
        if (playerTwoGameScore <= 30) {
          // if player two has less than 30
          if (playerOneGameScore === 30) this.setState({ playerOneGameScore: 40 })
          else this.setState({ playerOneGameScore: 0, playerTwoGameScore: 0, playerOneSetScore: playerOneSetScore + 1})
        }
        else {
          // if player two has 40
          if (playerTwoGameScore === 45) this.setState({ playerTwoGameScore: 40 })
          else if (playerOneGameScore === 30) this.setState({ playerOneGameScore: 40 })
          else if (playerOneGameScore === 40) this.setState({ playerOneGameScore: 45 })
          else this.setState({ playerOneGameScore: 0, playerTwoGameScore: 0, playerOneSetScore: playerOneSetScore + 1 })
        }
      }
      else this.setState({ playerOneGameScore: playerOneGameScore + 15 })
    }
    else if (player === 'playerTwo') {
      if (playerTwoGameScore >= 30) {
        if (playerOneGameScore <= 30) {
          // if player one has less than 30
          if (playerTwoGameScore === 30) this.setState({ playerTwoGameScore: 40 })
          else this.setState({ playerTwoGameScore: 0, playerOneGameScore: 0, playerTwoSetScore: playerTwoSetScore + 1 })
        }
        else {
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

  checkSet() {
    const { playerOneSetScore, playerTwoSetScore, activeSet } = this.state
    if (playerOneSetScore < 6 && playerTwoSetScore < 6) return;
    else if (playerOneSetScore >= 6) {
      if (playerTwoSetScore < 5) this.setFinal()
    }
    else if (playerTwoSetScore >= 6) {
      if (playerOneSetScore < 5) this.setFinal()
    }
  }

  setFinal() {
    const { saveMatch, match } = this.props
    const { activeSet, playerOneSetScore, playerTwoSetScore } = this.state
    saveMatch(match.id, 0, 0, playerOneSetScore, playerTwoSetScore, activeSet)
    this.setState({
      playerOneGameScore: 0,
      playerOneSetScore: 0,
      playerTwoGameScore: 0,
      playerTwoSetScore: 0,
      activeSet: activeSet + 1
    })
  }

  render() {
    const gridCSS = { display: 'grid', gridTemplateColumns: '150px 100px 100px 100px 100px 100px', gridTemplateRows: '50px 50px 50px', border: '1px solid black', marginTop: '20px' }
    const center = { textAlign: 'center' }
    const { pointOver, saveMatch } = this
    const { playerOne, playerTwo, match } = this.props
    const { playerOneGameScore, playerOneSetScore, playerTwoGameScore, playerTwoSetScore } = this.state
    if (!playerOne || !playerTwo) return null
    console.log(this.state)
    return (
      <div>
        <h1>Players in this match</h1>
        <h3>{ playerOne.firstInitialLastName } vs. { playerTwo.firstInitialLastName }</h3>
        <h4>Last Point:
          <button onClick={() => pointOver('playerOne')}>{ playerOne.lastName }</button>
          {'  '}
          <button onClick={() => pointOver('playerTwo')}>{ playerTwo.lastName }</button>
        </h4>
        <button onClick={ saveMatch }>Save Match</button>
        <div style={ gridCSS }>
        <p style={{ gridRowStart: 1 }}>Player Name</p>
        <p style={{ gridColumnStart: 2, textAlign: 'center' }}>Current Game</p>
        <p style={{ gridColumnStart: 3, textAlign: 'center' }}>Set 1</p>
        { match.playerOneSetOne || match.playerTwoSetOne ? <p style={{ gridColumnStart: 4, textAlign: 'center' }}>Set 2</p> : null }
        { match.playerOneSetTwo || match.playerTwoSetTwo ? <p style={{ gridColumnStart: 5, textAlign: 'center' }}>Set 3</p> : null }
        { match.playerOneSetThree || match.playerTwoSetThree ? <p style={{ gridColumnStart: 6, textAlign: 'center' }}>Set 4</p> : null }
        { match.playerOneSetFour || match.playerTwoSetFour ? <p style={{ gridColumnStart: 7, textAlign: 'center' }}>Set 5</p> : null }
          {/* PLAYER ONE */}
          <p style={{ gridColumnStart: 1, gridRowStart: 2, fontWeight: 'bold' }}>{playerOne.firstInitialLastName}</p>
          <p style={{ gridColumnStart: 2, gridRowStart: 2, fontWeight: 'bold', textAlign: 'center' }}>
            { playerOneGameScore === 45 ? 'AD' : playerOneGameScore }
          </p>
          <p style={{ gridColumnStart: 3, gridRowStart: 2, textAlign: 'center' }}>{ match.playerOneSetOne || playerOneSetScore }</p>
          { match.playerOneSetOne !== null &&
            <p style={{ gridColumnStart: 4, gridRowStart: 2, textAlign: 'center' }}>{match.playerOneSetTwo || playerOneSetScore}</p>
          }
          { match.playerOneSetTwo !== null &&
            <p style={{ gridColumnStart: 5, gridRowStart: 2, textAlign: 'center' }}>{match.playerOneSetThree || playerOneSetScore}</p>
          }
          { match.playerOneSetThree !== null &&
            <p style={{ gridColumnStart: 6, gridRowStart: 2, textAlign: 'center' }}>{match.playerOneSetFour || playerOneSetScore}</p>
          }
          { match.playerOneSetFour !== null &&
            <p style={{ gridColumnStart: 7, gridRowStart: 2, textAlign: 'center' }}>{match.playerOneSetFive || playerOneSetScore}</p>
          }

          {/* PLAYER TWO */}
          <p style={{ gridColumnStart: 1, gridRowStart: 3, fontWeight: 'bold' }}>{playerTwo.firstInitialLastName}</p>
          <p style={{ gridColumnStart: 2, gridRowStart: 3, fontWeight: 'bold', textAlign: 'center' }}>
            {playerTwoGameScore === 45 ? 'AD' : playerTwoGameScore }
          </p>
          <p style={{ gridColumnStart: 3, gridRowStart: 3, textAlign: 'center' }}>{ match.playerTwoSetOne || playerTwoSetScore }</p>
          { match.playerTwoSetOne !== null &&
            <p style={{ gridColumnStart: 4, gridRowStart: 3, textAlign: 'center' }}>{match.playerTwoSetTwo || playerTwoSetScore}</p>
          }
          { match.playerTwoSetTwo !== null &&
            <p style={{ gridColumnStart: 5, gridRowStart: 3, textAlign: 'center' }}>{match.playerTwoSetThree || playerTwoSetScore}</p>
          }
          { match.playerTwoSetThree !== null &&
            <p style={{ gridColumnStart: 6, gridRowStart: 3, textAlign: 'center' }}>{match.playerTwoSetFour || playerTwoSetScore}</p>
          }
          { match.playerTwoSetFour !== null &&
            <p style={{ gridColumnStart: 7, gridRowStart: 3, textAlign: 'center' }}>{match.playerTwoSetFive || playerTwoSetScore}</p>
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
    saveMatch: (id, p1game, p2game, p1set, p2set, setNumber) => dispatch(updateMatch(id, p1game, p2game, p1set, p2set, setNumber)),
  }
}

export default connect(mapState, mapDispatch)(Scores);
