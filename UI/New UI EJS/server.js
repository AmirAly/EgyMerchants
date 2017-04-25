// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// set path for static
app.use(express.static(__dirname + '/public'));

// use res.render to load up an ejs view file
// index page 
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
    res.render('pages/index');
});

// store page 
app.get('/store', function(req, res) {
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

// contacts page 
app.get('/contacts', function (req, res) {
    res.render('pages/contacts');
});
app.listen(8080);
console.log('8080 is the magic port');