const conn = require('./conn');
const { Sequelize } = conn;

const Player = conn.define('player', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
})

module.exports = Player;
