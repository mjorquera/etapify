var express = require('express');

var router = express.Router();

var stages = ['Lobezno', 'Saltador', 'Diestro', 'Cazador']

router.route('/')
.get(function(req, res) {
    res.json(stages);
});

module.exports = router;