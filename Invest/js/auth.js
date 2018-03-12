

    var config = {
      apiKey: "AIzaSyDURrjLF283phtDX0DZAhc2rPBwSgeJXVQ",
      authDomain: "hedger-invest.firebaseapp.com",
      databaseURL: "https://hedger-invest.firebaseio.com",
      projectId: "hedger-invest",
      storageBucket: "hedger-invest.appspot.com",
      messagingSenderId: "726872548070"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser) {
            console.log(firebaseUser);
            window.location.replace('invest.html');
        } else {
            console.log('Not Logged in');
        }
    });

    //authentication
    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const txtRegEmail = document.getElementById("txtRegEmail");
    const txtRegPassword = document.getElementById("txtRegPassword");
    const btnLogin = document.getElementById("btnLogin");
    const btnSignUp = document.getElementById("btnSignUp");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    function validate() {
    	if(txtPassword.value.length < 6)
    		return 0;
    	var numbers = /[0-9]/g;
    	if(!txtPassword.value.match(numbers))
    		return 1;
    	var uppercase = /[A-Z]/g;
    	if(!txtPassword.value.match(uppercase))
    		return 2;
    	var lowercase = /[a-z]/g;
    	if(!txtPassword.value.match(lowercase))
    		return 3;
    	return 5;
    }

    btnLogin.addEventListener('click', e => {
        //validate
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign in

            auth.signInWithEmailAndPassword(email,pass).catch(e => {
                console.log(e.message);
                alert('Invalid LoginID or Password');
                location.reload();
            });

    });

    loginForm.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            btnLogin.click();
        }
    });

    function enterData(email) {
        var xhttp = new XMLHttpRequest();
        var user = email.split('.')[0]+email.split('.')[1];

    	xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            	var result = JSON.parse(this.responseText);
                console.log('Done');
           }
        };

    	var url = "http://localhost:3000/auth/";
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("user="+user);
        console.log('Sent');
    }

    btnSignUp.addEventListener('click', e => {
        //validate
        const email = txtRegEmail.value;
        const pass = txtRegPassword.value;
        const auth = firebase.auth();
        //Sign in

            auth.createUserWithEmailAndPassword(email,pass).catch(e => {
                console.log(e.message);
                alert('Check the fields. Invalid emailID');
                location.reload();
            });
            enterData(email);
    });
    registerForm.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            btnSignUp.click();
        }
    });

    //realtime auth state changeing

//
