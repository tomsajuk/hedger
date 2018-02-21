var express = require('express');
var router = express.Router();
var request = require('request');

var KEY_ID = process.env.KEY_ID;
var SECRET_KEY = process.env.SECRET_ID;


router.post('/',function(req, res, next) {
	console.log(req.body);
	var payment_id = req.body.razorpay_payment_id;
	var url = 'https://'+KEY_ID+':'+SECRET_KEY+'@api.razorpay.com/v1/payments/';
	console.log(url+payment_id);
	request(url+payment_id, function (error, response, body) {
	  console.log('Response:', body);
	  var payment = JSON.parse(body);
	  console.log(payment.amount/100);
	});
	res.send('Cool');
});

router.get('/check',function(req,res,next) {
	console.log("working");
	res.send('sucess');
});

module.exports = router;
