var express = require('express');
var router = express.Router();
var admin = require('../firebaseAdmin');
var db = admin.database();
var ref = db.ref();

router.post('/', function(req, res, next) {
    console.log(req.body);
    var user = req.body.user;

    var obj = {};
    obj[user] = {'balance':0};

    ref.update(obj);
    res.send('Cool');
});

module.exports = router;
