
var marketTable = document.getElementById("marketTable");
var count;
var item = "",sellPrice = 0, buyPrice = 0;

firebase.database().ref('/market').once('value', snap => {
    console.log(snap.val());
    var obj = snap.val().trade;
    count = snap.val().count;
    var  row, Mname, Mbuy, Msell;
    for(i in obj) {
        row = marketTable.insertRow(1);
        row.id = i;
        row.setAttribute('onclick','openTrade('+i+')');
        Mname = row.insertCell(0);
        Mbuy = row.insertCell(1);
        Msell = row.insertCell(2);
        Mname.innerText = obj[i].name;
        Mbuy.innerText = obj[i].buyPrice;
        Msell.innerText = obj[i].sellPrice;
    }
});

firebase.database().ref('/market/trade').on("child_changed", snap => {
    console.log(snap.val());
    var obj = snap.val();
    var row = document.getElementById(obj.name).childNodes;
    row[1].innerText = obj.buyPrice;
    row[2].innerText = obj.sellPrice;
});

var buybtn = document.getElementById("buy-order");
var sellbtn = document.getElementById("sell-order");
var chart = document.getElementById("chart");
var price = document.getElementById("price");
var volume = document.getElementById("volume");
var email = "";

function openTrade(val) {
    var obj = val.childNodes;
    chart.innerText = obj[0].innerHTML;
    console.log(obj[0].innerHTML);
    item = obj[0].innerHTML;
    buyPrice = parseFloat(obj[1].innerHTML);
    sellPrice = parseFloat(obj[2].innerHTML);
}

buybtn.addEventListener('click', e=> {
    console.log(buyPrice);
    var amount = price.value;
    var vol = volume.value;
    var xhttp = new XMLHttpRequest();
    var user = email.split('.')[0]+email.split('.')[1];

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            console.log(result);
            price.value = null;
            volume.value = null;
            Materialize.toast(result, 1000, 'rounded');
       }
    };

    var url = "http://localhost:3000/trade/buy/";
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("user="+user+"&item="+item+"&price="+amount+"&volume="+vol);
    console.log('Sent');
});

sellbtn.addEventListener('click', e=> {
    console.log(sellPrice);
    var amount = price.value;
    var vol = volume.value;
    var xhttp = new XMLHttpRequest();
    var user = email.split('.')[0]+email.split('.')[1];

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            Materialize.toast(result, 1000, 'rounded');
            price.value = null;
            volume.value = null;
       }
    };

    var url = "http://localhost:3000/trade/sell/";
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("user="+user+"&item="+item+"&price="+amount+"&volume="+vol);
    console.log('Sent');
});

firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser) {
        console.log(firebaseUser);
        email = firebaseUser.email;
    } else {
        console.log('Not Logged in');
    }
});
