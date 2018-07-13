const app = require('express').Router()
const { Match } = require('../db').models
module.exports = app;

app.get('/all', (req, res, next) => {
  Match.findAll()
    .then( matches => res.send(matches))
    .catch(next)
})

app.get('/:id', (req, res, next) => {
  Match.findById(req.params.id)
    .then( match => res.send(match))
    .catch(next)
})

app.post('/', (req, res, next) => {
  const { playerOneId, playerTwoId } = req.body
  Match.create({ playerOneId, playerTwoId })
    .then(match => res.send(match))
    .catch(next)
})

// app.get('/:id/players', (req, res, next) => {
//   Match.findById(req.params.id)
//     .then( match => match.findPlayers(match))
//     .then( matchPlayers => res.send(matchPlayers))
//     .catch(next)
// })
