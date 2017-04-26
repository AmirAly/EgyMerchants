// server.js
// load the things we need
var express = require('express');
var app = express();
var mongoose = require('mongoose');
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
        app.get('/', function (req, res) {
            //var drinks = [
            //    { name: 'Juice', drunkness: 3 },
            //    { name: 'Tea', drunkness: 5 },
            //    { name: 'Coffee', drunkness: 10 }
            //];
            //var tagline = "Hi I'm Samar.";
            //var user = { name: 'samar', age: 28 };
            //res.render('pages/index', {
            //    drinks: drinks,
            //    tagline: tagline,
            //    user:user
            //});
            console.log(store);
            res.render('pages/index');
        });

        // store page 
        app.get('/store', function (req, res) {
            res.render('pages/store');
        });

        // items page 
        app.get('/items', function (req, res) {
            res.render('pages/items');
        });

        // product page 
        app.get('/product', function (req, res) {
            res.render('pages/product');
        });
        app.get('/contacts', function (req, res) {
            res.render('pages/contacts');
        });
        store.getStoreByName('المقصود للموبيليات').then(function (_data) {
            app.listen(8007);
            console.log(_data);
            console.log('Connected');
        }).catch(function (error) {
            // oops, mom don't buy it
            console.log(error);
            // output: 'mom is not happy'
        });;
        
    }
});