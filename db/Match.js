const conn = require('./conn');
const { Sequelize } = conn;
const Player = require('./Player');

const Match = conn.define('match', {
  playerOneScore: Sequelize.STRING,
  playerOneGames: Sequelize.INTEGER,
  playerOneSets: Sequelize.INTEGER,
  playerTwoScore: Sequelize.STRING,
  playerTwoGames: Sequelize.INTEGER,
  playerTwoSets: Sequelize.INTEGER,
  matchWinner: Sequelize.INTEGER
})

// Match.prototype.findPlayers = function(match) {
//   console.log(match.get())
//   return Player.findAll({
//     where: {
//       $or: [{ id: match.playerOneId }, { id: match.playerTwoId }]
//     }
//   })
// }

module.exports = Match;
