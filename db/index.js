const conn = require('./conn');
// const { Sequelize } = conn;
const Player = require('./Player');
const Match = require('./Match');

Match.belongsTo(Player, { as: 'playerOne' })
Match.belongsTo(Player, { as: 'playerTwo' })

const sync = () => conn.sync({ force: true })

const seed = () => {
  return Promise.all([
    Player.create({ firstName: 'Jeremy', lastName: 'Philipson' }),
    Player.create({ firstName: 'Carolyn', lastName: 'Fine' }),
    Player.create({ firstName: 'David', lastName: 'Ehrlich' })
  ])
  .then(([jeremy, carolyn, david]) => {
    Match.create({ playerOneId: jeremy.id, playerTwoId: carolyn.id })
    Match.create({ playerOneId: david.id, playerTwoId: jeremy.id })
  })
}

module.exports = {
  sync,
  seed,
  models: {
    Player,
    Match
  }
}
