var express = require('express');
var router = express.Router();
var request = require('request');
var admin = require('../firebaseAdmin');

var KEY_ID = process.env.KEY_ID;
var SECRET_KEY = process.env.SECRET_ID;
var url = 'https://'+KEY_ID+':'+SECRET_KEY+'@api.razorpay.com/v1/payments/';

router.post('/',function(req, res, next) {
	console.log(req.body);
	var payment_id = req.body.id;
	var quantity = req.body.amount;
	var preAmount = parseFloat(quantity)/100;
	console.log(url+payment_id);

    var db = admin.database();
	var ref = db.ref().child("users").child(req.body.user);

	ref.once("value", function(snapshot) {
	  console.log(snapshot.val().balance);
	  preAmount += parseFloat(snapshot.val().balance);
	  request({
	  		  method: 'POST',
	  		  url: url+payment_id+'/capture',
	  		  form: {
	  		    amount: quantity
	  		  }
	  		}, function (error, response, body) {
	  		  console.log('Status:', response.statusCode);
	  		  res.send(body);
	  		  console.log('Headers:', JSON.stringify(response.headers));
	  		  console.log('Response:', body);
	  		  ref.update({
	  			  "balance": preAmount
	  		  });
	  	});
	});

});

router.get('/check',function(req,res,next) {
	console.log("working");
	res.send('sucess');
});

module.exports = router;
