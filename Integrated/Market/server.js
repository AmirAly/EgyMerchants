
// server.js
// modules =================================================
// load the things we need
var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('./routes')(app);
var db = require('./config/config');



// test ===========================================
var expo = require('./models/expoes');
var exposchema = require('./models/schema/expo');
var country = require('./models/countries');
var countryschema = require('./models/schema/country');
var store = require('./models/stores');
var storeschema = require('./models/schema/store');
var gallery = require('./models/galleries');
var galleryschema = require('./models/schema/gallery');
var item = require('./models/products');
var itemschema = require('./models/schema/item');
var category = require('./models/categories');
var categoryschema = require('./models/schema/category');

// configuration ===========================================


// set the view engine to ejs
app.set('view engine', 'ejs');

// set path for static
app.use(express.static('public'));



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
        app.get('*', function (req, res) {
            return res.redirect('/eg/Home');
        });

        

        console.log('8080 is the magic port');
    }
});
