var express = require('express');
var app = express();

app.use(express.static('public'));

var persons = require('./routes/persons');
app.use('/persons', persons);

var stages = require('./routes/stages');
app.use('/stages', stages);

module.exports = app;