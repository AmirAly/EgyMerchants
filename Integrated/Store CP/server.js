// server.js
// load the things we need
var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('./routes')(app);
var db = require('./config/config');
// set the view engine to ejs
app.set('view engine', 'ejs');

// set path for static
app.use(express.static(__dirname + '/public'));
var store = require('./models/stores');
// use res.render to load up an ejs view file
// index page 

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
        app.listen(process.env.PORT || 8080);
        //app.get('*', function (req, res) {
        //    res.render('pages/404');
        //});
        console.log('8080 is the magic port');
    }
});