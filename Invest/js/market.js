
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

function openTrade(val) {
    var obj = val.childNodes;
    chart.innerText = obj[0].innerHTML;
    console.log(obj[0].innerHTML);
    item = obj[0].innerHTML;
    buyPrice = parseInt(obj[1].innerHTML);
    sellPrice = parseInt(obj[2].innerHTML);
}

buybtn.addEventListener('click', e=> {
    console.log(buyPrice);
    var xhttp = new XMLHttpRequest();
    var user = email.split('.')[0]+email.split('.')[1];

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);

       }
    };

    var url = "http://localhost:3000/trade/buy/";
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("user="+user+"&item="+item+"&price="+buyPrice+"&volume="+volume);
    console.log('Sent');
});

sellbtn.addEventListener('click', e=> {
    console.log(sellPrice);
    var xhttp = new XMLHttpRequest();
    var user = email.split('.')[0]+email.split('.')[1];

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);

       }
    };

    var url = "http://localhost:3000/trade/sell/";
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("user="+user+"&item="+item+"&price="+sellPrice+"&volume="+volume);
    console.log('Sent');
});
