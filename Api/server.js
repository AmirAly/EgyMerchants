
// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api = require('./app/api')(app, express);
var db = require('./config/config');

// configuration ===========================================
// config files
// check data conection
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
var port = process.env.PORT || 8007;
var path = require("path");
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
        app.use(express.static(__dirname + '/public'));
        app.use('/', api);
        app.listen(port);
        console.log('connected  to  database and server is listeining ');
    }
});

