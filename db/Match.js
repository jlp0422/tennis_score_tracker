const conn = require('./conn');
const { Sequelize } = conn;

const Match = conn.define('match', {
  playerOneScore: Sequelize.STRING,
  playerOneGames: Sequelize.INTEGER,
  playerOneSets: Sequelize.INTEGER,
  playerTwoScore: Sequelize.STRING,
  playerTwoGames: Sequelize.INTEGER,
  playerTwoSets: Sequelize.INTEGER,
  matchWinner: Sequelize.INTEGER
})

module.exports = Match;
