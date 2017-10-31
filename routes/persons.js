var express = require('express');

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false});

// var redis = require('redis');
// if (process.env.REDISTOGO_URL) {
//     var rtg   = require("url").parse(process.env.REDISTOGO_URL);
//     var client = redis.createClient(rtg.port, rtg.hostname);
//     client.auth(rtg.auth.split(":")[1]);
// } else {
//     var client = redis.createClient();
//     client.select((process.env.NODE_ENV || 'development').length);
// }

var persons = {
    'Santino': 'Lobezno',
    'Javi': 'Saltador',
    'Lucas': 'Diestro'
};

var router = express.Router();

router.route('/')
    .get(function(req, res) {
        res.json(Object.keys(persons));
    })
    .post(urlencode, function(req, res) {
        var newPerson = req.body;
        if(!newPerson.name) {
            res.sendStatus(400);
            return false;
        } else {
            persons[newPerson.name] = newPerson.stage;
            res.status(201).json(newPerson.name);
        }
    });

    module.exports = router;
