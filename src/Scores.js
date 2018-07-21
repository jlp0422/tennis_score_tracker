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

  componentDidMount() {
    const { match } = this.props
    const { playerOneCurrentGameScore, playerTwoCurrentGameScore } = match
    playerOneCurrentGameScore && playerTwoCurrentGameScore && this.setState({ playerOneGameScore: playerOneCurrentGameScore, playerTwoGameScore: playerTwoCurrentGameScore })
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('prevState: ', prevState)
    // console.log('this state: ', this.state)
    if (prevState !== this.state) {
      console.log("state don't match")
      this.saveMatch()
    }
    if (prevState === this.state) {
      console.log('state match!!!')
    }
    console.log('\n')
    // if (prevState !== this.state || prevProps !== this.props) {
    // }
  }

  saveMatch() {
    const { match, saveMatchOnDB } = this.props
    const {
      playerOneGameScore,
      playerOneSetScore,
      playerTwoGameScore,
      playerTwoSetScore,
      activeSet
    } = this.state
    console.log('match being saved')
    saveMatchOnDB(match.id, playerOneGameScore, playerTwoGameScore, playerOneSetScore, playerTwoSetScore, activeSet)
    // this.checkSet()
  }

  checkSet() {
    const { playerOneSetScore, playerTwoSetScore, activeSet } = this.state
    console.log('check set state: ', this.state)
    if (playerOneSetScore < 6 && playerTwoSetScore < 6) return;
    else if (playerOneSetScore >= 6) {
      if (playerTwoSetScore < 5) this.setFinal()
    }
    else if (playerTwoSetScore >= 6) {
      if (playerOneSetScore < 5) this.setFinal()
    }
  }

  setFinal() {
    const { saveMatchOnDB, match } = this.props
    const { activeSet, playerOneSetScore, playerTwoSetScore } = this.state
    console.log('set is final')
    saveMatchOnDB(match.id, 0, 0, playerOneSetScore, playerTwoSetScore, activeSet)
    this.setState({
      playerOneGameScore: 0,
      playerOneSetScore: 0,
      playerTwoGameScore: 0,
      playerTwoSetScore: 0,
      activeSet: activeSet + 1
    })
  }

  pointOver(player) {
    // let newGameScore
    // let newSetScore
    // const { match } = this.props
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


  render() {
    const gridCSS = { display: 'grid', gridTemplateColumns: '150px 100px 100px 100px 100px 100px 100px', gridTemplateRows: '50px 50px 50px', border: '1px solid black', marginTop: '20px' }
    const center = { textAlign: 'center' }
    const { pointOver, saveMatch } = this
    const { playerOne, playerTwo, match } = this.props
    const { playerOneCurrentGameScore, playerTwoCurrentGameScore } = match
    const { playerOneGameScore, playerOneSetScore, playerTwoGameScore, playerTwoSetScore, activeSet } = this.state
    const p1GameScore = playerOneCurrentGameScore || playerOneGameScore
    const p2GameScore = playerTwoCurrentGameScore || playerTwoGameScore
    const displaySetTwo = activeSet >= 2 || match.playerOneSetOne >= 6 || match.playerTwoSetOne >= 6
    const displaySetThree = activeSet >= 3 || match.playerOneSetTwo >= 6 || match.playerTwoSetTwo >= 6
    const displaySetFour = activeSet >= 4 || match.playerOneSetThree >= 6 || match.playerTwoSetThree >= 6
    const displaySetFive = activeSet >= 5 || match.playerOneSetFour >= 6 || match.playerTwoSetFour >= 6

    if (!playerOne || !playerTwo) return null
    // console.log('THIS IS THE MATCH: ', match)
    // console.log('THIS IS THE STATE: ', this.state)
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
          { displaySetTwo ?
            <p style={{ gridColumnStart: 4, textAlign: 'center' }}>Set 2</p> : null
          }
          { displaySetThree ?
            <p style={{ gridColumnStart: 5, textAlign: 'center' }}>Set 3</p> : null
          }
          { displaySetFour ?
            <p style={{ gridColumnStart: 6, textAlign: 'center' }}>Set 4</p> : null
          }
          { displaySetFive ?
            <p style={{ gridColumnStart: 7, textAlign: 'center' }}>Set 5</p> : null
          }

          {/* PLAYER ONE */}
          <p style={{ gridColumnStart: 1, gridRowStart: 2, fontWeight: 'bold' }}>{playerOne.firstInitialLastName}</p>
          <p style={{ gridColumnStart: 2, gridRowStart: 2, fontWeight: 'bold', textAlign: 'center' }}>
            { p1GameScore === 45 ? 'AD' : p1GameScore }
          </p>
          <p style={{ gridColumnStart: 3, gridRowStart: 2, textAlign: 'center' }}>
            { match.playerOneSetOne !== null ? match.playerOneSetOne : playerOneSetScore }
          </p>
          { displaySetTwo ?
            <p style={{ gridColumnStart: 4, gridRowStart: 2, textAlign: 'center' }}>
              {match.playerOneSetTwo !== null ? match.playerOneSetTwo : playerOneSetScore }
            </p> : null
          }
          {displaySetThree ?
            <p style={{ gridColumnStart: 5, gridRowStart: 2, textAlign: 'center' }}>
              {match.playerOneSetThree !== null ? match.playerOneSetThree : playerOneSetScore }
            </p> : null
          }
          { displaySetFour ?
            <p style={{ gridColumnStart: 6, gridRowStart: 2, textAlign: 'center' }}>
              {match.playerOneSetFour !== null ? match.playerOneSetFour : playerOneSetScore }
            </p> : null
          }
          { displaySetFive ?
            <p style={{ gridColumnStart: 7, gridRowStart: 2, textAlign: 'center' }}>
              {match.playerOneSetFive !== null ? match.playerOneSetFive : playerOneSetScore }
            </p> : null
          }

          {/* PLAYER TWO */}
          <p style={{ gridColumnStart: 1, gridRowStart: 3, fontWeight: 'bold' }}>{playerTwo.firstInitialLastName}</p>
          <p style={{ gridColumnStart: 2, gridRowStart: 3, fontWeight: 'bold', textAlign: 'center' }}>
            {p2GameScore === 45 ? 'AD' : p2GameScore }
          </p>
          <p style={{ gridColumnStart: 3, gridRowStart: 3, textAlign: 'center' }}>
            { match.playerTwoSetOne !== null ? match.playerTwoSetOne : playerTwoSetScore }
          </p>
          { displaySetTwo ?
            <p style={{ gridColumnStart: 4, gridRowStart: 3, textAlign: 'center' }}>
              {match.playerTwoSetTwo !== null ? match.playerTwoSetTwo : playerTwoSetScore}
            </p> : null
          }
          { displaySetThree ?
            <p style={{ gridColumnStart: 5, gridRowStart: 3, textAlign: 'center' }}>
              {match.playerTwoSetThree !== null ? match.playerTwoSetThree : playerTwoSetScore }
            </p> : null
          }
          { displaySetFour ?
            <p style={{ gridColumnStart: 6, gridRowStart: 3, textAlign: 'center' }}>
              {match.playerTwoSetFour !== null ? match.playerTwoSetFour : playerTwoSetScore }
            </p> : null
          }
          { displaySetFive ?
            <p style={{ gridColumnStart: 7, gridRowStart: 3, textAlign: 'center' }}>
              {match.playerTwoSetFive !== null ? match.playerTwoSetFive : playerTwoSetScore }
            </p> : null
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
    saveMatchOnDB: (id, p1game, p2game, p1set, p2set, setNumber) => dispatch(updateMatch(id, p1game, p2game, p1set, p2set, setNumber)),
  }
}

export default connect(mapState, mapDispatch)(Scores);
