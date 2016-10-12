var express = require('express');
var jwt = require('jwt-simple');
var bodyParser = require('body-parser');
var firebase = require("firebase");

var app = express();
var secret = 'xxx';

// input real parameters for db
firebase.initializeApp({
    serviceAccount: "./KiPr-2352086b109e.json",
    databaseURL: "https://kipr-391be.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("/saving-data/users/");
var urlencodedParser = bodyParser.urlencoded({extended: false});

function writeUserData(userId, name) {
    db.ref('/saving-data/users/' + userId).set({
        username: name
        //profile_picture : imageUrl
    });
}

// for action on button click
app.post('/login', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    var token = jwt.encode(req.body.name, secret);
    var shortToken = token.substr(token.length - 20, 15); // = userID
    ref.orderByChild("username").equalTo(req.body.name).once("value", function(snapshot) {
        if (snapshot.val()) {
            res.status(403).send('Authentication failed. User already exist.');
        }
        else {
            writeUserData (shortToken, req.body.name);
            res.status(200).send(shortToken);
        }
    });
});

// for check real-time input name (only error response)
app.post('/check', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    ref.orderByChild("username").equalTo(req.body.name).once("value", function(snapshot) {
        if (snapshot.val()) {
            res.status(403).send('User already exist.');
        }
        else {
            res.status(200).send('OK');
        }
    });
});

app.listen(3002, function () {
    console.log('App listening on port 3002!');
});