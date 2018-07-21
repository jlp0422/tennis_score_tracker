const conn = require('./conn');
const { Sequelize } = conn;
const Player = require('./Player');

const Match = conn.define('match', {
  playerOneSetOne: Sequelize.INTEGER,
  playerOneSetTwo: Sequelize.INTEGER,
  playerOneSetThree: Sequelize.INTEGER,
  playerOneSetFour: Sequelize.INTEGER,
  playerOneSetFive: Sequelize.INTEGER,
  playerTwoSetOne: Sequelize.INTEGER,
  playerTwoSetTwo: Sequelize.INTEGER,
  playerTwoSetThree: Sequelize.INTEGER,
  playerTwoSetFour: Sequelize.INTEGER,
  playerTwoSetFive: Sequelize.INTEGER,
  playerOneCurrentGameScore: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  playerTwoCurrentGameScore: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  matchWinner: Sequelize.INTEGER
}, {
  timestamps: false
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
