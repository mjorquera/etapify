var express = require('express');
var app = express();

app.use(express.static('public'));

var persons = require('./routes/persons');
app.use('/persons', persons);

module.exports = app;