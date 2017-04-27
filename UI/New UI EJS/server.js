
// server.js
// modules =================================================
// load the things we need

var express = require('express');
var mongoose = require('mongoose');
var app = express();
require('./routes')(app);


// set the view engine to ejs
app.set('view engine', 'ejs');

// set path for static
app.use(express.static('public'));

app.get('*', function (req, res) {
    res.send('msg', 404);
});
app.listen(8080);
console.log('8080 is the magic port');

