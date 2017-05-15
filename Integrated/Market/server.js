
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
        app.listen(8080);
        app.get('*', function (req, res) {
            return res.redirect('/eg/Home');
        });

        

        console.log('8080 is the magic port');
    }
});


//var newcountry = new countryschema({ Name:"Estonia" , IsoCode:'Es'});
//country.add(newcountry).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//var newcategory = new categoryschema({
//    "Name": "Home Furniture",
//    "Countries": ["59196d1da4d87d11d82559c4"]
//});
//category.add(newcategory).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//category.getByCountry("59196729c4af17073c5dbc9d").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

var newexpo = new exposchema(
//    {
//    "Title": "expofloor",
//    "Sections": [{ "Store": "", "Img": "1" }, { "Store": "", "Img": "2" }, { "Store": "", "Img": "3" }, { "Store": "59141c3088c14514387b70a2", "Img": "4" }, { "Store": "59141c3088c14514387b70a2", "Img": "5" }, { "Store": "59141c3088c14514387b70a2", "Img": "6" }],
//    "Category": ["5914365bada408109816dba9"],
//    "Banner": "banner"


//}
        {
            "Categories": ["59196e4822c6760a8829c631"],
            Title: 'Le Marchée I',
            Banner: 'http://www.brockmetal.com/wp-content/uploads/2014/01/parallax-section-background-03.jpg',
            Sections: [

              { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a1.jpg' },
              { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a2.jpg' },
              { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a1.jpg' },
              { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a2.jpg' }, { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a1.jpg' },
              { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a2.jpg' }, { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a1.jpg' },
              { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a2.jpg' }, { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a1.jpg' },
              { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a2.jpg' }, { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a1.jpg' },
              { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a2.jpg' }, { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a1.jpg' },
              { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a2.jpg' }, { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a1.jpg' },
              { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a2.jpg' }, { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a1.jpg' },
              { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a2.jpg' }, { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a1.jpg' },
              { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a2.jpg' }, { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a1.jpg' },
              { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a2.jpg' },
                                { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a1.jpg' },
                  { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a2.jpg' },
                                    { Store: '5918865bcb915416fc231ca7', Img: '/images/expo/a1.jpg' }

            ]
        }
    );
//expo.add(newexpo).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//expo.getByCategory("5914365bada408109816dba9").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//expo.getByCategoryonly25Section("5914365bada408109816dba9").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//expo.getStores("59143b7cac6b5b108c4470a5").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//59131f50e2658b09f0a4c612
var newstore = new storeschema(
    {
        "Email": "store1@mail.com", "Password": "123456", "StoreName": "nada stores", "Imgs": [
          {
              URL: 'https://s-media-cache-ak0.pinimg.com/originals/e2/5e/90/e25e90d723ba723c282068816c139f9a.jpg'
          },
                   {
                       URL: 'http://www.dwellingdecor.com/wp-content/uploads/2015/12/interior-living-room.jpg'
                   },
                   {
                       URL: 'http://metalip.com/wp-content/uploads/2016/03/modern-scandinavian-loft-living-room-design-with-upholstered-foamy-black-sofa-added-with-colorful-cushions.jpg'
                   }
        ], "CountryISOCode": "59196d1da4d87d11d82559c4", "Category": "59196e4822c6760a8829c631"
    });
//store.register(newstore).then(function (result) {
//    console.log(result); 
//}, function(err) {
//    console.log(err); 
//});
//store.login({ "Email": "storetodsoe@gmail.com", "Password": "nada" }).then(function (result) {
//console.log(result); 
//}, function(err) {
//    console.log(err); 
//});
//store.get("590f820f90a4d320165810cc").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//store.getById("591441e32b766d148c90d3d9").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//store.editProfile("591441e32b766d148c90d3d9", "nada", "nadakg", "ww@gmail.com", "alex", "zizinya", "5912065493bfda340e9b9cd0", "desc",[{"URL":"nody"}]).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//var newgallery = new galleryschema({
//    "Title": "gallerytoday", "Badges": "mostvisited2",
//    "Store": "59197187659db4039cb0b452",
//    "Description": "display all you dream of furniture2",
//    "DisplayPicture": "dsp"
//});
//gallery.add(newgallery).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//gallery.edit("59144716de37b007b08783f8", "dates", "datdesc", "new").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//gallery.getById("59144716de37b007b08783f8").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});//591222aa09563b440c36441e
//gallery.getByStore("590f820f90a4d320165810cc").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

var newitem = new itemschema({
    "Name": "itemtodospace", "Description": "desconlytodo",
    "Price": "777", "PriceBeforeSale": "800", "Rate": "56",
    "Sold": "100", "Badges": "#featured #modern",
    "Gallery": "591972e73ed7f01260d856db", "Store": "59197187659db4039cb0b452",
    "Pictures": [{ "Title": "imh1", "URL": "urerr" }, { "Title": "imh2", "URL": "poi" }]
});
//item.add(newitem).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//item.edit("59144b1bcf3c7908144055ee", "editdats", "", [{ "Title": "dat" }, {"URL":"dd"}]).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//item.getById("59144b1bcf3c7908144055ee").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//item.getByGalleryId("59141ffa476d5315f45e8aa4").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//item.getFeatured("590f820f90a4d320165810cc").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//item.getByBestSeller("590f820f90a4d320165810cc").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//    });
