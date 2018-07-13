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
    .then(match => res.send(match))
    .catch(next)
})
