const app = require('express').Router();
module.exports = app;

app.use('/match', require('./match'));
app.use('/player', require('./player'));
