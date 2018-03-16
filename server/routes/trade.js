var express = require('express');
var router = express.Router();
var admin = require('../firebaseAdmin');
var db = admin.database();
var users = db.ref().child("users");
var trades = db.ref('/market/trade');

router.post('/buy/', function(req, res, next) {
    console.log(req.body);
    var user = req.body.user;

    var obj = {};
    obj[user] = {
        'balance':0,
        'wallet': req.body.wallet
    };

    ref.update(obj);
    res.send('Cool');
});

router.past('/buy/', function(req, res, next) {
    console.log(req.body);
    var user = req.body.user;
    var price = req.body.price;
    var item = req.body.item;
    var volume = req.body.volumne;
    res.send('Cool');
});

router.past('/sell/', function(req, res, next) {
    console.log(req.body);
    var user = req.body.user;
    var price = req.body.price;
    var item = req.body.item;
    var volume = req.body.volumne;
    res.send('Cool');
});

module.exports = router;
