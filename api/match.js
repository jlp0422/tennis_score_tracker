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
  const { playerOneGameScore, playerTwoGameScore, playerOneSetScore, playerTwoSetScore, setNumber } = req.body
  console.log('req body: ', req.body)
  const currentGameScores = { playerOneCurrentGameScore: playerOneGameScore, playerTwoCurrentGameScore: playerTwoGameScore }
  Match.findById(req.params.id)
    .then( match => {
      switch(setNumber) {
        case 1:
          Object.assign(match, currentGameScores, { playerOneSetOne: playerOneSetScore, playerTwoSetOne: playerTwoSetScore })
          return match.save()
        case 2:
          Object.assign(match, currentGameScores, { playerOneSetTwo: playerOneSetScore, playerTwoSetTwo: playerTwoSetScore })
          return match.save()
        case 3:
          Object.assign(match, currentGameScores, { playerOneSetThree: playerOneSetScore, playerTwoSetThree: playerTwoSetScore })
          return match.save()
        case 4:
          Object.assign(match, currentGameScores, { playerOneSetFour: playerOneSetScore, playerTwoSetFour: playerTwoSetScore })
          return match.save()
        case 5:
          Object.assign(match, currentGameScores, { playerOneSetFive: playerOneSetScore, playerTwoSetFive: playerTwoSetScore })
          return match.save()
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
