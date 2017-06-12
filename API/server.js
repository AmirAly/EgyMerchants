
// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api = require('./app/api')(app, express);
var db = require('./config/config');
// test ===========================================
var user = require('./app/users');
var userschema = require('./app/models/user');
var store = require('./app/stores');
var expo = require('./app/expoes');
var exposchema = require('./app/models/expo');
var country = require('./app/countries');
var countryschema = require('./app/models/country');
var gallery = require('./app/galleries');
var galleryschema = require('./app/models/gallery');
var item = require('./app/items');
var itemschema = require('./app/models/item');
var category = require('./app/categories');
var categoryschema = require('./app/models/category');
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
 
var newstore = new userschema({ "Email": "mynewmail12@gmail.com", "Password": "nada", "Name": "my new store12", "Country": "italy", "Category": "furniture" });
//store.register(newstore).
//    then(function (result) {
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
//store.editBadges("593d10430a55c750117f07f5", "true", "false", "true").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//store.editProfile("593d10430a55c750117f07f5", "mynewmail4@gmail.com", "cairoo", "addr", "italy", "desc", "").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//store.getById("5937c36103c5b66c050ffa9c").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//store.suspend("593668fd8cc4b54c0ccfaeae").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//"my new","masterexpo","","egypt"
//store.search("", "masterexpo", "", "egypt").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
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


var newuser = new userschema({ "Email": "anisa123@gmail.com", "Password": "123456", "Name": "anisa123" });
//user.register(newuser).then(function (result) {
//    console.log(result); 
//}, function(err) {
//    console.log(err); 
//});

//user.login({ 'Email': 'anisa1234@gmail.com', 'Password': '123456' }).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//5936b0501fc9883c1193f7fb

//user.editProfile("593d0d8797d4f2440b6a470f", "anisa1234@gmail.com", "anisaibrahim", "img").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

var newcountry = new countryschema({ "Name": "U.S.A", "WelcomeMsg": "welcome in U.S.A", "IsoCode": "123","Flag":"white/green"});
//country.add(newcountry).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//country.edit("593d38aab81b891415bf6fe0", "U.S.A", "yellow", "123", "welcome", ["593d3878535ef028135b7217"]).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//country.suspend("5937e5801cf86e0c0b23c9e5").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//country.getById("593d38aab81b891415bf6fe0").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//country.getAll().then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
var newexpo = new exposchema({ "Title": "newgodexpo", "Banner": "bnner", "Category": "59143976a6adb01098ef50b8" });
//expo.add(newexpo).then(function (result) {
//    console.log(result); 
//}, function(err) {
//    console.log(err); 
//});
//expo.getById("593d09ed43aeb8e8157f181d").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//expo.setFloor("593d09ed43aeb8e8157f181d", { "Name": "the lastflooradded", "Stores": [{ "Store": "59366953c2bf034812df1954", "Width": "1", "High": "2", "Position": "3", "Img": "img" }] }).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//expo.edit("5936b579d3b2169811b198c4", "editnoexistno", "banneredit", "59143976a6adb01098ef50b8", [{ "Name": "editedfloor", "Stores": [{ "Store": "59366953c2bf034812df1954", "Width": "1", "High": "2", "Position": "3", "Img": "img" }] }, { "Name": "2ndfloor", "Stores": [{ "Store": "59366953c2bf034812df1954", "Width": "1", "High": "2", "Position": "3", "Img": "img" }] }]).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//expo.getAll().then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//expo.suspend("5936b0501fc9883c1193f7fa").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//expo.getByCategory("59143976a6adb01098ef50b8").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//expo.getStores("593d09ed43aeb8e8157f181d").then(function (result) {
//    console.log(result.data.Floors[1].Stores[0].Store);
//}, function (err) {
//    console.log(err);
//});
//var newcategory = new categoryschema({ "Name": "newcategoryy" });
//category.add(newcategory).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//category.edit("593d3878535ef028135b7217", "okcar").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//category.suspend("5937eac6a0bdebb00ab1713f").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//category.getAll().then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//category.getByCountry("593d06591f0fafcc047e2388").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

var newitem = new itemschema({ "Name": "newitem34", "Description": "desconlytodo", "Price": "777", "PriceBeforeSale": "800", "Rate": "56", "Sold": "200", "Badges": "#featured #modern", "Gallery": "59369940b656ca6c03f909e7" });
//item.add(newitem).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//item.edit("593699ae283e176016f402b3", "newitem34", "desc", {
//    "Title": "t5it",
//"URL":"url"
//},"334","444","badg","tags").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//item.getById("593699ae283e176016f402b3").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//item.getByGalleryId("59369940b656ca6c03f909e7").then(function (result) {
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
var newgallery = new galleryschema({ "Title": "godgall", "Badges": "mostvisited2", "Store": "5936692ee2e8258c0c9b1206", "Description": "display all you dream of furniture2", "DisplayPicture": "dsp" });
//gallery.add(newgallery).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//gallery.edit("593913e352c7bc5019ce805b", "godgall", "des", "img").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//gallery.getById("593913e352c7bc5019ce805b").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//gallery.getByStore("59366953c2bf034812df1954").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
