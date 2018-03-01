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


    //razorpay config variable
    var options = {
        "key": "rzp_test_PMjmTpjCj6YGxG",
        "amount": "100", // 2000 paise = INR 20
        "name": "TSH Investments",
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


    const btnLogin = document.getElementById("btnLogin");
    const btnLogout = document.getElementById("btnLogout");
    const btnSignUp = document.getElementById("btnSignUp");
    const btnLoginM = document.getElementById("btnLoginM");
    const btnLogoutM = document.getElementById("btnLogoutM");
    const btnSignUpM = document.getElementById("btnSignUpM");
    const formId = document.getElementById("formId");
    const displayName = document.getElementById("displayName");
    const balance = document.getElementById("balance");
    var email = "";

    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser) {
            console.log(firebaseUser);
            email = firebaseUser.email;
            btnLogout.classList.remove('hide');
            btnLogoutM.classList.remove('hide');
            btnLogin.classList.add('hide');
            btnLoginM.classList.add('hide');
            btnSignUp.classList.add('hide');
            btnSignUpM.classList.add('hide');
            investForm.classList.remove('hide');
            displayName.classList.remove('hide');
            balance.classList.remove('hide');
            displayName.innerText = email;
            const dbRefBal = firebase.database().ref().child(email.split('@')[0]).child('balance');
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
            btnSignUp.classList.remove('hide');
            btnSignUpM.classList.remove('hide');
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
