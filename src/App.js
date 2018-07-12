import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Scores from './Scores';
import Players from './Players';

const App = () => {
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

export default App;
