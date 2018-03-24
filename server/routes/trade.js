var express = require('express');
var router = express.Router();
var admin = require('../firebaseAdmin');
var db = admin.database();
var users = db.ref("/users");
var trades = db.ref('/market/trade');
var openTrades = db.ref('/market/openTrade');
var Mitem = 'steel';
var openTradeVisit = false;

//checking if any sale is possible whenever database changes
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
        //console.log(buy);
        openTrades.child(Mitem).child('sell').orderByChild('price').limitToFirst(1).once('value',snapSell => {
            snapSell.forEach(function(data) {
                sellx = data.key;
                sell = data.val();
            });
            if(sell == null)
                return;
            //console.log(sell);
            //sale possible
            if(buy.price >= sell.price) {
                var balance;
                var userObj = {};
                if(buy.volume == sell.volume) {
                    //updating user details
                    users.child(sell.user).child('balance').once('value', snap => {
                        balance = snap.val()
                        userObj = {};

                        balance = parseFloat((balance + buy.volume*sell.price).toFixed(2));
                        userObj['balance'] = balance;
                        console.log(userObj);
                        users.child(sell.user).update(userObj);
                        openTrades.child(Mitem).child('sell').child(sellx).set({});
                    });
                    users.child(buy.user).child(Mitem).once('value', snap => {
                        var ussObj = {};
                        ussObj[Mitem] = parseFloat((snap.val() + buy.volume).toFixed(2));
                        console.log(ussObj);
                        users.child(buy.user).update(ussObj);
                        openTrades.child(Mitem).child('buy').child(buyx).set({});
                        openTradeVisit = false;
                    });
                    console.log('done');

                }else if(buy.volume < sell.volume) {
                    sell.volume = parseFloat((sell.volume-buy.volume).toFixed(2));
                    console.log(sell);
                    users.child(sell.user).child('balance').once('value', snap => {
                        balance = snap.val()
                        userObj = {};
                        balance = parseFloat((balance + buy.volume*sell.price).toFixed(2));
                        userObj['balance'] = balance;
                        users.child(sell.user).update(userObj);
                        openTrades.child(Mitem).child('sell').child(sellx).set(sell);
                    });
                    users.child(buy.user).child(Mitem).once('value', snap => {
                        var ussObj = {};
                        ussObj[Mitem] = parseFloat((snap.val() + buy.volume).toFixed(2));
                        console.log(ussObj);
                        users.child(buy.user).update(ussObj);
                        openTrades.child(Mitem).child('buy').child(buyx).set({});
                        openTradeVisit = false;
                    });
                    console.log('done1');

                } else if(buy.volume > sell.volume) {

                    buy.volume = parseFloat((buy.volume-sell.volume).toFixed(2));
                    console.log(buy);
                    users.child(sell.user).child('balance').once('value', snap => {
                        balance = snap.val()
                        userObj = {};
                        balance = parseFloat((balance + sell.volume*sell.price).toFixed(2));
                        console.log(balance);
                        userObj['balance'] = balance;
                        users.child(sell.user).update(userObj);
                        openTrades.child(Mitem).child('sell').child(sellx).set({});
                    });
                    users.child(buy.user).child(Mitem).once('value', snap => {
                        var ussObj = {};
                        ussObj[Mitem] = parseFloat((snap.val() + sell.volume).toFixed(2));
                        console.log(ussObj);
                        users.child(buy.user).update(ussObj);

                        openTrades.child(Mitem).child('buy').child(buyx).set(buy);
                        openTradeVisit = false;
                    });

                    console.log('done2');

                }
                var lastP = {lastPrice:sell.price};
                trades.child(Mitem).update(lastP);
            }
        });

    });
    //reCalculating the buy and sell price of the item
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
    var user = req.body.user;
    var price = parseFloat(req.body.price);
    var item = req.body.item;
    Mitem = item;
    var volume = parseFloat(req.body.volume);
    var amount = price*volume;
    var balance ;
    //check balance and if present minus the amount
    users.child(user).child('balance').once('value', snap=>{
        balance=parseFloat(snap.val());
        balance = (balance - amount).toFixed(2);
        if(balance < 0) {
            res.send('You don\'t have enough Credit.')
            return;
        }
        var obj = {};
        obj[Date.now()] = {
            'price': price,
            'volume': volume,
            'user':user
        };
        console.log(obj);
        var userUp = {};
        userUp['balance'] = parseFloat(balance);
        console.log(user,balance);
        users.child(user).update(userUp);
        openTrades.child(item).child('buy').update(obj);
        res.send('Trade for '+volume+" of "+item+" uploaded.");
    });

});

router.post('/sell/', function(req, res, next) {
    var user = req.body.user;
    var price = parseFloat(req.body.price);
    var item = req.body.item;
    Mitem = item;
    var volume = parseFloat(req.body.volume);
    //check if units present if so minus
    users.child(user).child(item).once('value', snap =>{
        var curVol = parseFloat(snap.val());
        if(curVol < volume) {
            res.send('You don\'t have enough Units of '+ item +' to sell');
            return;
        }

        var obj = {};
        obj[Date.now()] = {
            'price': price,
            'volume': volume,
            'user':user
        };
        console.log(obj);
        var userOb = {};
        userOb[item] = parseFloat((curVol - volume).toFixed(2));
        console.log(userOb);
        users.child(user).update(userOb);
        openTrades.child(item).child('sell').update(obj);
        res.send('Trade for '+volume+" of "+item+" uploaded.");
    })
});

module.exports = router;
