const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Player, Match } = db.models

app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('body-parser').json())

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

app.post('/player', (req, res, next) => {
  Player.create(req.body)
    .then(player => res.send(player))
    .catch(next)
})

db.sync()
  .then(() => db.seed())

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`port of call: ${port}`))
