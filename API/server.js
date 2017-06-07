
// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api = require('./app/api')(app, express);
var db = require('./config/config');
// test ===========================================
var expo = require('./app/expoes');
var exposchema = require('./app/models/expo');
var country = require('./app/countries');
var countryschema = require('./app/models/country');
var store = require('./app/stores');
var gallery = require('./app/galleries');
var galleryschema = require('./app/models/gallery');
var item = require('./app/items');
var itemschema = require('./app/models/item');
var category = require('./app/categories');
var categoryschema = require('./app/models/category');
var userschema = require('./app/models/user');
var user = require('./app/users');
var master = require('./app/masters');
// configuration ===========================================
// config files
// check data conection
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(bodyParser.json({ limit: '50mb' }));
//app.use(bodyParser.json());
var port = process.env.PORT || 8007;
mongoose.connect(db.url, function (err) {
    if (err) {
        console.log(err);

    }
    else {
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, DELETE, OPTIONS');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.use(express.static('public'));
        app.use('/', api);
        app.listen(port);
        console.log('connected  to  database and server is listeining ');
    }
});
 
var newstore = new userschema({ "Email": "mynewmail3@gmail.com", "Password": "nada", "Name": "my new store3", "Country": "egypt", "Category": "furniture" });
//store.register(newstore).then(function (result) {
//    console.log(result); 
//}, function(err) {
//    console.log(err); 
//});

//store.login({'Email':'mynewmail3@gmail.com','Password':'nada'}).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//store.getAll().then(function (result) {
//        console.log(result);
//    }, function (err) {
//        console.log(err);
//    });

var newmaster = new userschema({ "Email": "newmaster@gmail.com", "Password": "123456", "Name": "anisa"});
//master.register(newmaster).then(function (result) {
//    console.log(result); 
//}, function(err) {
//    console.log(err); 
//});
//master.login({ 'Email': 'newmaster@gmail.com', 'Password': '123456' }).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

var newuser = new userschema({ "Email": "newuser@gmail.com", "Password": "123456", "Name": "ali" });
//user.register(newuser).then(function (result) {
//    console.log(result); 
//}, function(err) {
//    console.log(err); 
//});

//user.login({ 'Email': 'newmaster@gmail.com', 'Password': '123456' }).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//5936b0501fc9883c1193f7fb
var newexpo = new exposchema({ "Title": "not exist","Banner":"bnner", "Category": "59143976a6adb01098ef50b8", "Floors": [{ "Name": "2young", "Stores": [{ "Store": "59366953c2bf034812df1954", "Width": "1", "High": "2", "Position": "3", "Img": "img" }, { "Store": "59366953c2bf034812df1954", "Width": "5", "High": "6", "Position": "7", "Img": "img" }] } ]});
//expo.add(newexpo).then(function (result) {
//    console.log(result); 
//}, function(err) {
//    console.log(err); 
//});
//expo.getAll().then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//var newcountry = new countryschema({ "Name": "italy", "WelcomeMsg": "welcome in italy", "IsoCode": "445","Flag":"red/green" });
//country.add(newcountry).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

country.getAll().then(function (result) {
    console.log(result);
}, function (err) {
    console.log(err);
});
//expo.getByCategory("59143976a6adb01098ef50b8").then(function (result) {
//    console.log(result.data[0].Floors[0].Stores[0].Store);
//}, function (err) {
//    console.log(err);
//});
//expo.getStores("5936b1273e8986b400b0fe3f").then(function (result) {
//    console.log(result.data.Floors[0].Stores[0].Store);
//}, function (err) {
//    console.log(err);
//});
//category.getAll().then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

var newitem = new itemschema({ "Name": "newitem3", "Description": "desconlytodo", "Price": "777", "PriceBeforeSale": "800", "Rate": "56", "Sold": "200", "Badges": "#featured #modern", "Gallery": "5937b00f02b0ba080fe089fe" });
//item.add(newitem).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//item.getById("593699ae283e176016f402b3").then(function (result) {
//    console.log(result.data.Gallery._id);
//}, function (err) {
//    console.log(err);
//});

//item.getByGalleryId("5937b00f02b0ba080fe089fe").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//item.getFeatured("59366953c2bf034812df1954").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//item.getByBestSeller("59366953c2bf034812df1954").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//    });
//var newgallery = new galleryschema({ "Title": "gallery67", "Badges": "mostvisited2", "Store": "59366953c2bf034812df1954", "Description": "display all you dream of furniture2", "DisplayPicture": "dsp" });
//gallery.add(newgallery).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});