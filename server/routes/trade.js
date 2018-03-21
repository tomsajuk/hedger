var express = require('express');
var router = express.Router();
var admin = require('../firebaseAdmin');
var db = admin.database();
var users = db.ref("/users");
var trades = db.ref('/market/trade');
var openTrades = db.ref('/market/openTrade');
var Mitem = 'steel';
var openTradeVisit = false;

openTrades.on('value', snap => {
    if(!openTradeVisit){
    openTradeVisit = true;
    var buy,sell,buyx,sellx;
    console.log(Mitem);
    openTrades.child(Mitem).child('buy').orderByChild('price').limitToLast(1).once('value',snapBuy => {
        snapBuy.forEach(function(data) {
            buyx = data.key;
            buy = data.val();
        });
        if(buy == null)
            return;
        console.log(buy);
        openTrades.child(Mitem).child('sell').orderByChild('price').limitToFirst(1).once('value',snapSell => {
            snapSell.forEach(function(data) {
                sellx = data.key;
                sell = data.val();
            });
            if(sell == null)
                return;
            console.log(sell);
            if(buy.price >= sell.price) {
                var balance;
                var userObj = {};
                if(buy.volume == sell.volume) {
                    openTrades.child(Mitem).child('sell').child(sellx).set({});
                    console.log('done');
                    openTradeVisit = false;
                    openTrades.child(Mitem).child('buy').child(buyx).set({});
                    users.child(sell.user).child('balance').once('value', snap => {
                        balance = snap.val()
                        userObj = {};

                        balance = balance + buy.volume*sell.price;
                        console.log(balance);
                        userObj[sell.user] = {'balance': balance};
                        users.update(userObj);
                    });
                }else if(buy.volume < sell.volume) {
                    sell.volume = sell.volume-buy.volume;
                    console.log(sell);
                    openTrades.child(Mitem).child('sell').child(sellx).set(sell);
                    console.log('done1');
                    openTradeVisit = false;
                    openTrades.child(Mitem).child('buy').child(buyx).set({});
                    users.child(sell.user).child('balance').once('value', snap => {
                        balance = snap.val()
                        userObj = {};
                        balance = balance + buy.volume*sell.price;
                        console.log(balance);
                        userObj[sell.user] = {'balance': balance};
                        users.update(userObj);
                    });
                } else if(buy.volume > sell.volume) {

                    buy.volume = buy.volume-sell.volume;
                    console.log(buy);
                    openTrades.child(Mitem).child('sell').child(sellx).set({});
                    console.log('done2');
                    openTradeVisit = false;
                    openTrades.child(Mitem).child('buy').child(buyx).set(buy);
                    users.child(sell.user).child('balance').once('value', snap => {
                        balance = snap.val()
                        userObj = {};
                        balance = balance + sell.volume*sell.price;
                        console.log(balance);
                        userObj[sell.user] = {'balance': balance};
                        users.update(userObj);
                    });
                }

//put less than vol and change buy & sell price in trade database
            }
        });

    });
    openTrades.child(Mitem).child('buy').orderByChild('price').limitToLast(1).once('value',snap => {
        snap.forEach(function(data) {
            buyx = data.key;
            buy = data.val();
        });
        if(buy == null)
            return;
        var edii = {'buyPrice':buy.price};
        trades.child(Mitem).update(edii);
    });
    openTrades.child(Mitem).child('sell').orderByChild('price').limitToFirst(1).once('value',snap => {
        snap.forEach(function(data) {
            sellx = data.key;
            sell = data.val();
        });
        if(sell == null)
            return;
        var edii = {'sellPrice':sell.price};
        trades.child(Mitem).update(edii);
    });
    }
    openTradeVisit = false;
});

router.post('/buy/', function(req, res, next) {
    console.log(req.body);
    var user = req.body.user;
    var price = parseFloat(req.body.price);
    var item = req.body.item;
    Mitem = item;
    var volume = parseFloat(req.body.volume);
    var amount = price*volume;
    var balance ;
    users.child(user).child('balance').once('value', snap=>{
        balance=parseFloat(snap.val());
        var obj = {};
        obj[Date.now()] = {
            'price': price,
            'volume': volume,
            'user':user
        };
        var userUp = {};
        userUp[user] = {'balance':balance-amount};
        console.log(balance);
        users.update(userUp);
        openTrades.child(item).child('buy').update(obj);
    })

    trades.child(item).child('buyPrice').once('value', snap => {
        console.log(snap.val());
        var buyPrice = parseFloat(snap.val());
        if(buyPrice < price) {
            var edii = {'buyPrice':price};
            trades.child(item).update(edii);
        }
    });
    res.send('Trade for '+volume+" of "+item+" uploaded.");
});

router.post('/sell/', function(req, res, next) {
    console.log(req.body);
    var user = req.body.user;
    var price = parseFloat(req.body.price);
    var item = req.body.item;
    Mitem = item;
    var volume = parseFloat(req.body.volume);
    var obj = {};
    obj[Date.now()] = {
        'price': price,
        'volume':volume,
        'user':user
    };
    openTrades.child(item).child('sell').update(obj);
    trades.child(item).child('sellPrice').once('value', snap => {
        console.log(snap.val());
        var sellPrice = parseFloat(snap.val());
        if(sellPrice > price) {
            var edii = {'sellPrice':price};
            trades.child(item).update(edii);
        }
    });
    res.send('Trade for '+volume+" of "+item+" uploaded.");
});

module.exports = router;
