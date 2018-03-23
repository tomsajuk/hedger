var express = require('express');
var CronJob = require('cron').CronJob;
var router = express.Router();
var admin = require('../firebaseAdmin');
var db = admin.database();
var trades = db.ref('/market/trade');
var chart = db.ref('/chart');
var item = ["oil","sensex","steel"];
var itemL = item.length;
var date;

var job = new CronJob({
  cronTime: '00 00 * * * *',
  onTick: function() {
      date = Date.now();
      var i,obj = {};
      console.log('hi');
      for(i = 0; i < itemL; i++) {
          console.log(item[i]);
          trades.child(item[i]).once('value', snap => {
              console.log(snap.key,date);
              obj[date] = snap.val().lastPrice;
              console.log(obj);
              chart.child(snap.key).update(obj);
          });
      }

  },
  start: false,
  timeZone: 'Asia/Kolkata'
});
job.start();


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

    res.send('Trade for '+volume+" of "+item+" uploaded.");
});

module.exports = router;
