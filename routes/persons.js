var express = require('express');

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false});

var redis = require('redis');
if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var client = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);
} else {
    var client = redis.createClient();
    client.select((process.env.NODE_ENV || 'development').length);
}

var router = express.Router();

router.route('/')
    .get(function(req, res) {
        client.hkeys('persons', function(error,names){
            if(error) throw error;
            res.json(names);
        });
    })
    .post(urlencode, function(req, res) {
        var newPerson = req.body;
        if(!newPerson.name || !newPerson.stage) {
            res.sendStatus(400);
            return false;
        } else {
            client.hset('persons',newPerson.name,newPerson.stage, function(error){
                if(error) throw error;
                res.status(201).json(newPerson.name);
            });
        }
    });

router.route('/:name')
    .get(function(req, res){
        client.hget('persons', req.params.name, function(error, stage){
            if (error) throw error;
            res.render('person.ejs', { person: {
                name: req.params.name,
                stage: stage,
                img: "../img/" + stage.toLowerCase() + ".jpeg"
                }
            });
        });
    })
    .delete(function(req, res){
        client.hdel('persons',req.params.name, function(error){
            if (error) throw error;
            res.sendStatus(204);
        });
    });

    module.exports = router;
