
// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api = require('./app/api')(app, express);
var db = require('./config/config');
// test ===========================================
var schema = mongoose.Schema;
var expo = require('./app/expoes');
var exposchema = require('./app/Models/expo');
var country = require('./app/countries');
var countryschema = require('./app/models/country');
var store = require('./app/stores');
var storeschema = require('./app/models/store');
var gallery = require('./app/galleries');
var galleryschema = require('./app/models/gallery');
var item = require('./app/products');
var itemschema = require('./app/models/item');
var category = require('./app/categories');
var categoryschema = require('./app/models/category');


// configuration ===========================================
// config files
// check data conection
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());
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

var newcountry = new countryschema({ "Name": "west america" });
country.add(newcountry).then(function (result) {
    console.log(result);
}, function (err) {
    console.log(err);
});
 
//var newcategory = new categoryschema({
//    "Name": "modfdur",
//    "Country": ["5912065493bfda340e9b9cd0"]
//});
//category.add(newcategory).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//category.getByCountry("5912065493bfda340e9b9cd0").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//var newexpo = new exposchema({
//    "Title": "new expoadd",
//    "Sections": [{ "Store": "590f820f90a4d320165810cc", "Img": "" }, { "Store":"59121eff09e644400788ab94", "Img": "" }]
//});
//expo.add(newexpo).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//expo.getByCategory("59120f09d5add94019356975").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//expo.getStores(expoid).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//var newstore = new storeschema({"Email":"storethen@gmail.com","Password":"456789","StoreName":"thenstore"});
//store.register(newstore).then(function (result) {
//    console.log(result); 
//}, function(err) {
//    console.log(err); 
//});
//store.login({ "Email": "storenow@gmail.com", "Password": "456789" }).then(function (result) {
//console.log(result); 
//}, function(err) {
//    console.log(err); 
//});
//store.getById("591234344241e3180ce43d3c").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//store.editProfile("591234344241e3180ce43d3c", "456789", "123456", "editnewstore@gmail.com", "gharbia", "elsanta", "desc", "").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//var newgallery = new galleryschema({ "Title": "galleryaddalone", "Badges": "mostvisited2", "Store": "590f820f90a4d320165810cc", "Description": "display all you dream of furniture2","Status":"Suspend" });
//gallery.add(newgallery).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//gallery.edit("591222aa09563b440c36441e", "galltitilegalleryaddalone", "galldesc", "").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//gallery.getById("59122eb862cb778c0b590f8f").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});//591222aa09563b440c36441e
//gallery.getByStore("59121eff09e644400788ab94").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//var newitem = new itemschema({ "Name": "newmodelitem", "Description": "desconly", "Price": "500", "PriceBeforeSale": "500", "Rate": "56", "Sold": "100", "Badges": "#featured", "Gallery": "59122eb862cb778c0b590f8f", "Store": "59121eff09e644400788ab94" });
//item.add(newitem).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//item.edit("59122c1fd95503f00dd2be75", "featurededited", "desc", "").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//item.getById("59122865e68f84940b5c8b3b").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//item.getByGalleryId("591222aa09563b440c36441e").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//item.getFeatured("59121eff09e644400788ab94").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//item.getByBestSeller("59121eff09e644400788ab94").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});