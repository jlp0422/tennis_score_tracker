import React from 'react'
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div>
      <h2>Start a new match</h2>
      <Link to='/match'><button>Start</button></Link>
    </div>
  )
}

export default Start;
