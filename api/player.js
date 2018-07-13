const app = require('express').Router()
const { Player } = require('../db').models
module.exports = app;

app.get('/all', (req, res, next) => {
  Player.findAll()
    .then( players => res.send(players))
    .catch(next)
})

app.get('/:id', (req, res, next) => {
  Player.findById(req.params.id)
    .then( player => res.send(player))
    .catch(next)
})

app.get('/:id/matches', (req, res, next) => {
  Player.findById(req.params.id)
    .then( player => player.findMatches(player.id))
    .then( playerMatches => res.send(playerMatches))
    .catch(next)
})
