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
    Player.create({ firstName: 'Luke', lastName: 'Andrews' }),
    Player.create({ firstName: 'David', lastName: 'Ehrlich' }),
    Player.create({ firstName: 'Andrew', lastName: 'Greif' }),
    Player.create({ firstName: 'Steve', lastName: 'Collins' }),
  ])
  .then(([jeremy, luke, david, andrew, steve ]) => {
    Match.create({ playerOneId: jeremy.id, playerTwoId: luke.id })
    Match.create({ playerOneId: david.id, playerTwoId: jeremy.id })
    Match.create({ playerOneId: andrew.id, playerTwoId: david.id })
    Match.create({ playerOneId: steve.id, playerTwoId: jeremy.id })
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
