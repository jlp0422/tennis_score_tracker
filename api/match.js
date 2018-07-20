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

app.post('/create', (req, res, next) => {
  const { playerOneId, playerTwoId } = req.body
  Match.create({ playerOneId, playerTwoId })
    .then(match => res.send(match))
    .catch(next)
})

app.put('/:id', (req, res, next) => {
  console.log('submit set')
  const { playerOneScore, playerTwoScore, setNumber } = req.body
  console.log('this is the set: ', setNumber)
  Match.findById(req.params.id)
    .then( match => {
      switch(setNumber) {
        case 'One':
          Object.assign(match, { playerOneSetOne: playerOneScore, playerTwoSetOne: playerTwoScore })
          return match.save()
        case 'Two':
          console.log('hellooo set 2')
        default:
          console.log('set number: ', setNumber)
      }
    })
    .then(match => res.send(match))
    .catch(next)
})

// app.get('/:id/players', (req, res, next) => {
//   Match.findById(req.params.id)
//     .then( match => match.findPlayers(match))
//     .then( matchPlayers => res.send(matchPlayers))
//     .catch(next)
// })
