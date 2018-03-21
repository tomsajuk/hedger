var nodeUrl = "https://hedger.herokuapp.com";

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
    const txtWalletAdd = document.getElementById("txtWalletAdd");
    const btnLogin = document.getElementById("btnLogin");
    const btnSignUp = document.getElementById("btnSignUp");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    function validateLogin() {
        if(txtEmail.value == "" || !txtEmail.value.match(/@/g)){
            alert("Enter Valid EmailID");
            txtEmail.setAttribute("style","border-color:red;");
            return 5;
        }
        var flag = 0;
    	if(txtPassword.value.length < 6)
    		flag = 1;
    	var numbers = /[0-9]/g;
    	if(!txtPassword.value.match(numbers))
    		flag = 1;
    	var uppercase = /[A-Z]/g;
    	if(!txtPassword.value.match(uppercase))
    		flag = 1;
    	var lowercase = /[a-z]/g;
    	if(!txtPassword.value.match(lowercase))
    		flag = 1;
        if(flag) {
            alert("Password should contain atleast one Uppercase, one Lowercase and one number");
            txtPassword.setAttribute("style", "border-color:red");
            txtPassword.value = "";
            return 1;
        }
    	return 0;
    }

    txtEmail.addEventListener("keyup", e => {
        if(!txtEmail.value.match(/@/g))
            txtEmail.setAttribute("style","border-color:red;");
        else
            txtEmail.setAttribute("style","border-color:none;");
    });
    txtPassword.addEventListener("keyup", e => {
        if(txtPassword.value.length < 6)
            txtPassword.setAttribute("style","border-color:red;");
        else
            txtPassword.setAttribute("style","border-color:none;");
    });

    btnLogin.addEventListener('click', e => {
        //validate
        if(validateLogin()) {
           return;
        }
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

    function enterData(email, wallet) {
        var xhttp = new XMLHttpRequest();
        var user = email.split('.')[0]+email.split('.')[1];

    	xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            	var result = JSON.parse(this.responseText);
                console.log('Done');
           }
        };

    	var url = nodeUrl + "/auth/";
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("user="+user+"&wallet="+wallet);
        console.log('Sent');
    }

    function validate() {
        if(txtRegEmail.value.length == 0) {
            return 1;
        }
        var flag = 0;
    	if(txtRegPassword.value.length < 6)
    		flag = 1;
    	var numbers = /[0-9]/g;
    	if(!txtRegPassword.value.match(numbers))
    		flag = 1;
    	var uppercase = /[A-Z]/g;
    	if(!txtRegPassword.value.match(uppercase))
    		flag = 1;
    	var lowercase = /[a-z]/g;
    	if(!txtRegPassword.value.match(lowercase))
    		flag = 1;
        if(flag) {
            alert("Password should contain atleast one Uppercase, one Lowercase and one number");
            txtRegPassword.setAttribute("style", "border-color:red");
            txtRegPassword.value = "";
            txtConPassword.value = "";
            return 1;
        }
        if(txtConPassword.value != txtRegPassword.value){
            alert("Password should match");
            txtRegPassword.value = "";
            txtRegPassword.setAttribute("style", "border-color:red");
            txtConPassword.setAttribute("style", "border-color:red");
            txtConPassword.value = "";
            return 6;
        }
        if(txtWalletAdd.value.length != 42){
            alert("Enter Valid Wallet Address");
            txtWalletAdd.setAttribute("style", "border-color:red");
            return 7;
        }
    	return 0;

    }

    txtRegEmail.addEventListener("keyup", e => {
        if(!txtRegEmail.value.match(/@/g))
            txtRegEmail.setAttribute("style","border-color:red;");
        else
            txtRegEmail.setAttribute("style","border-color:none;");
    });
    txtRegPassword.addEventListener("keyup", e => {
        if(txtRegPassword.value.length < 6)
            txtRegPassword.setAttribute("style","border-color:red;");
        else
            txtRegPassword.setAttribute("style","border-color:none;");
    });
    txtConPassword.addEventListener("keyup", e => {
        if(txtConPassword.value != txtRegPassword.value)
            txtConPassword.setAttribute("style","border-color:red;");
        else
            txtConPassword.setAttribute("style","border-color:none;");
    });
    txtWalletAdd.addEventListener("keyup", e => {
        if(txtWalletAdd.value.length != 42)
            txtWalletAdd.setAttribute("style","border-color:red;");
        else
            txtWalletAdd.setAttribute("style","border-color:none;");
    });

    btnSignUp.addEventListener('click', e => {
        //validate
        if(validate()) {
            return;
        }
        const email = txtRegEmail.value;
        const pass = txtRegPassword.value;
        const wallet = txtWalletAdd.value;
        const auth = firebase.auth();
        //Sign in

            auth.createUserWithEmailAndPassword(email,pass).catch(e => {
                console.log(e.message);
                alert('Check the fields. Invalid emailID');
                location.reload();
            });
            enterData(email, wallet);
    });
    registerForm.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            btnSignUp.click();
        }
    });

    //realtime auth state changeing

//
