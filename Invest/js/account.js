(function() {

    //Firebase config variable
    var config = {
      apiKey: "AIzaSyDURrjLF283phtDX0DZAhc2rPBwSgeJXVQ",
      authDomain: "hedger-invest.firebaseapp.com",
      databaseURL: "https://hedger-invest.firebaseio.com",
      projectId: "hedger-invest",
      storageBucket: "hedger-invest.appspot.com",
      messagingSenderId: "726872548070"
    };
    firebase.initializeApp(config);

    const btnLogin = document.getElementById("btnLogin");
    const btnLogout = document.getElementById("btnLogout");
    const btnLoginM = document.getElementById("btnLoginM");
    const btnLogoutM = document.getElementById("btnLogoutM");
    const formId = document.getElementById("formId");
    const displayName = document.getElementById("displayName");
    const balance = document.getElementById("balance");
    var email = "";

    function capturePay(res) {
        console.log(res.razorpay_payment_id);
        var payId = res.razorpay_payment_id;
        var amount = document.getElementById("amount").value * 100;
        var xhttp = new XMLHttpRequest();
        var user = email.split('.')[0]+email.split('.')[1];

    	xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            	var result = JSON.parse(this.responseText);
                const dbRefBal = firebase.database().ref().child("users").child(user).child('balance');
                dbRefBal.on('value', snap => {
                    balance.innerText = snap.val() + ' INR';
                    console.log(snap.val());
                });
                if(result.error) {
                    alert('Not successful');
                }
                else {
                    alert('Success');
                    balance.innerText = amount/100 + ' INR';
                    document.getElementById("amount").value = "";
                }
           }
        };

    	var url = "http://localhost:3000/process/";
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("user="+user+"&id="+payId+"&amount="+amount);
        console.log('Sent');
    }

    //razorpay config variable
    var options = {
        "key": "rzp_test_PMjmTpjCj6YGxG",
        "amount": "100", // 2000 paise = INR 20
        "name": "TSH Investments",
        "description": "Purchase Description",
        "image": "./logo.png",
        "handler": function (response){
            console.log(response.razorpay_payment_id);
            capturePay(response);
        },
        "prefill": {
            "name": displayName,
            "email": email
        },
        "notes": {
            "address": "Hello World"
        },
        "theme": {
            "color": "#F37254"
        }
    };

    document.getElementById('rzp-button1').onclick = function(e){
        var amount = document.getElementById("amount").value;
        if(amount < 50) {
            Materialize.Toast.removeAll();
            Materialize.toast('Enter Amount Greater than 50', 1000, 'rounded');
        } else {
            options.amount = amount * 100;
            var rzp1 = new Razorpay(options);
            rzp1.open();
            e.preventDefault();
        }
    }




    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser) {
            console.log(firebaseUser);
            email = firebaseUser.email;
            btnLogout.classList.remove('hide');
            btnLogoutM.classList.remove('hide');
            btnLogin.classList.add('hide');
            btnLoginM.classList.add('hide');
            investForm.classList.remove('hide');
            displayName.classList.remove('hide');
            balance.classList.remove('hide');
            displayName.innerText = email;
            const dbRefBal = firebase.database().ref().child("users").child(email.split('.')[0]+email.split('.')[1]).child('balance');
            dbRefBal.on('value', snap => {
                balance.innerText = snap.val() + ' INR';
                console.log(snap.val());
            });
            Materialize.Toast.removeAll();
            Materialize.toast('Hi '+firebaseUser.displayName, 1000, 'rounded');
        } else {

            console.log('Not Logged in');
            btnLogout.classList.add('hide');
            btnLogoutM.classList.add('hide');
            btnLogin.classList.remove('hide');
            btnLoginM.classList.remove('hide');
            investForm.classList.add('hide');
            displayName.innerText = "";
            Materialize.Toast.removeAll();
            Materialize.toast('Login to Use Our Service', 5000, 'rounded');
        }
    });


        btnLogout.addEventListener('click', e => {
            firebase.auth().signOut();
        });

        btnLogoutM.addEventListener('click', e => {
            firebase.auth().signOut();
        });

}());
