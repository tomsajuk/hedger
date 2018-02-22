
var amountno = document.getElementById("amount");

var options = {
    "key": "rzp_test_PMjmTpjCj6YGxG",
    "amount": "100", // 2000 paise = INR 20
    "name": "TSH",
    "description": "Purchase Description",
    "image": "/your_logo.png",
    "handler": function (response){
        alert(response.razorpay_payment_id);
    },
    "prefill": {
        "name": "Harshil Mathur",
        "email": "harshil@razorpay.com"
    },
    "notes": {
        "address": "Hello World"
    },
    "theme": {
        "color": "#F37254"
    }
};

document.getElementById('rzp-button1').onclick = function(e){
    options.amount = amountno.value*100;
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
}
