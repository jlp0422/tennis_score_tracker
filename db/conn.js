const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/tennis_score_tracker', {
  logging: false
})
module.exports = conn;
