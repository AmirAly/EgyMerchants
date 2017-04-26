
// server.js
// modules =================================================
// load the things we need

var express = require('express');
var mongoose = require('mongoose');
var app = express();
require('./routes')(app);
var db = require('./config/config');

// set the view engine to ejs
app.set('view engine', 'ejs');

// set path for static
app.use(express.static('public'));

app.get('*', function (req, res) {
    res.send('msg', 404);
});
app.listen(8080);
console.log('8080 is the magic port');


mongoose.connect(db.url, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, DELETE, OPTIONS');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , authorization");
            next();
        });
        

    }
});