import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Scores from './Scores';
import Players from './Players';
import { connect } from 'react-redux';
import { loadPlayers } from './store/PlayerReducer'

class App extends React.Component {

  componentDidMount() {
    this.props.loadAllPlayers()
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={ Nav } />
          <Route exact path='/' component={ Players } />
          <Route exact path='/' component={ Scores } />
        </div>
      </Router>
    )
  }
}

const mapState = ({ players }) => {
  return { players }
}

const mapDispatch = (dispatch) => {
  return {
    loadAllPlayers: () => dispatch(loadPlayers())
  }
}

export default connect(mapState, mapDispatch)(App);
