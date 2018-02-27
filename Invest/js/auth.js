
(function() {
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


    btnLogin.addEventListener('click', e => {
        //validate
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign in
        auth.signInWithEmailAndPassword(email,pass).catch(e => console.log(e.message));
    });

    btnSignUp.addEventListener('click', e => {
        //validate
        const email = txtRegEmail.value;
        const pass = txtRegPassword.value;
        const auth = firebase.auth();
        //Sign in
        auth.createUserWithEmailAndPassword(email,pass).catch(e => console.log(e.message));
    });

    //realtime auth state changeing

//
}());
