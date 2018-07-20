import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Scores from './Scores';
import Players from './Players';
import Start from './Start';
import { connect } from 'react-redux';
import { loadPlayers } from './store/PlayerReducer'
import { loadMatches } from './store/MatchReducer';

class App extends React.Component {

  componentDidMount() {
    this.props.loadAllPlayers()
    this.props.loadAllMatches()
  }

  render() {
    return (
      <Router>
        <div>
          <Route path='/' component={ Nav } />
          <Switch>
            <Route exact path='/' component={ Start } />
            <Route exact path='/match/create' component={ Players } />
            <Route exact path='/match/:id' render={({ match }) => (
              <Scores id={ match.params.id * 1 } />
            )} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapState = ({ players, matches }) => {
  return { players, matches }
}

const mapDispatch = (dispatch) => {
  return {
    loadAllPlayers: () => dispatch(loadPlayers()),
    loadAllMatches: () => dispatch(loadMatches())
  }
}

export default connect(mapState, mapDispatch)(App);
