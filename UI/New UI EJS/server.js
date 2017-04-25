
// server.js
// modules =================================================
// load the things we need
var express = require('express');
var app = express();
require('./routes')(app);

// set the view engine to ejs
app.set('view engine', 'ejs');

// set path for static
app.use(express.static('public'));
app.listen(8080);
console.log('8080 is the magic port');