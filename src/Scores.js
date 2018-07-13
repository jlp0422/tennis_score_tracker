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
    const { players, match } = this.props
    console.log(players, match)
    return (
      <hr />
    )
  }
}

const mapState = ({ players, match }) => {
  return { players, match }
}

export default connect(mapState, null)(Scores);
