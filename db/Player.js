const conn = require('./conn');
const { Sequelize } = conn;
const Match = require('./Match');

const Player = conn.define('player', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
})

Player.prototype.findMatches = function(id) {
  return Match.findAll({
    where: { $or: [{ playerOneId: id }, { playerTwoId: id }] }
  })
}

module.exports = Player;
