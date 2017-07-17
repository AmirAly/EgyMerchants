
// modules =================================================
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/images'));
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
 
var newstore = new userschema({ "Email": "gamila12@gmail.com", "Password": "nada12", "Name": "my new item store12", "Country": "italy", "Category": "furniture" });
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
//store.editProfile("5936692ee2e8258c0c9b1206", "cccc@gmail.com", "cairoo", "addr", "egypt", "desc","", "","ppppng").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//store.getById("5936692ee2e8258c0c9b1206").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//store.suspend("593668fd8cc4b54c0ccfaeae").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//"new","masterexpo/newgod/test2","new","egypt"
//store.search("all", "all", "all", "dream@@~#").then(function (result) {
//    console.log(result.data);
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
//5965dd9eceaa8fc80bddf8ff//eg,5965df57fc4340540bc921b4//italy,/5965e1a21c091a9c0884b0ca/ksa,5965e9f7168fd5c404ab9218//dubai
var newcountry = new countryschema({ "Name": "dubai", "WelcomeMsg": "welcome in dubai", "IsoCode": "db", "Flag": "white" });
//country.add(newcountry).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//country.edit("5965e9f7168fd5c404ab9218", "dubai", "flag", "iso", "welcomemsg").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//59633066a7490bf417a675c9/related/eg,/59636119220c50cc02359e78/ksa/related,596360ebb635d094156a8083//dubai,5964e0584c9d02440c7b8280/italy
//country.remove("59633066a7490bf417a675c9").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//country.getById("59633066a7490bf417a675c9").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//country.getAll().then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//country.loadAllInJson().then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
var newexpo = new exposchema({ "Title": "new expo", "Banner": "bnner", "Category": "596c9e60ebfabe101402fb6f" });
//expo.add(newexpo).then(function (result) {
//    console.log(result); 
//}, function(err) {
//    console.log(err); 
//});
//59633acd6ac2d15c01ae3734
//expo.getById("59633acd6ac2d15c01ae3734").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//expo.setFloor("59413435f9989b6412a3e100", { "Name": "testcoordinates2", "Coordinates": [{ "Store": "595b688e4df9b72c03077f81" }] }).then(function (result) {
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
//expo.remove("5963641e78d6ccb40e361416").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//expo.getByCategory("59143976a6adb01098ef50b8").then(function (result) {
//    console.log(result.data[0].Floors[0].Coordinates[0].Store);
//}, function (err) {
//    console.log(err);
//});
//expo.getStores("59423d1a45c945c40bb26e72").then(function (result) {
//    console.log(result.data.Floors[0].Coordinates[0].Store);
//}, function (err) {
//    console.log(err);
//});
//5965dd9eceaa8fc80bddf8ff//eg,5965df57fc4340540bc921b4//italy,/5965e1a21c091a9c0884b0ca/ksa,5965e9f7168fd5c404ab9218//dubai
//59633066a7490bf417a675c9/related/eg,/59636119220c50cc02359e78/ksa/related,596360ebb635d094156a8083//dubai,5965eb1913a1a4900830e6dc/italy

//5965ed146d5d42e80e4124d3,5965ed35f49c64d40adecccb,
var newcategory = new categoryschema({ "Name": "gg", "Country": "5965df57fc4340540bc921b4" });
//category.add(newcategory).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//category.edit("5965ed146d5d42e80e4124d5", "watches", "5965dd9eceaa8fc80bddf8ff").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//59636190ec710c7808cc1942,5964cca41d280820170bdcd4/hasexpo,5964ccf1e91fd4401219c435,5964cfe7b68be204141a4f2b,5964d22a140c285c001b569f,5964d2754606115416a5a66b
//category.remove("5965ef265495deac01bc51aa").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//category.getByCountry('eg').then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//category.getAll().then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
var newitem = new itemschema({ "Name": "newitemtod2'", "Description": "desconlytodo", "Price": "777", "PriceBeforeSale": "800", "Rate": "56", "Sold": "200", "Badges": "#featured #modern", "Gallery": "59369940b656ca6c03f909e7", "Store": "595b688e4df9b72c03077f81" });
//item.add(newitem).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//item.edit("594a710e3e856b0b684b3917", "beautiful dress", "desc", {
//    "Title": "t5it",
//"URL":"url"
//},"334","444","badg","tags").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//593d003bd28c8f3c127c7d38,5937b674a93c5a001176be9c,5937b5d1f10b7eb003b7ce07 ok
//item.getById("59463fb599f97ae4127813f6").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//item.getByStore("593d1eb33808cff0009cf889").then(function (result) {
//    console.log(result.data);
//}, function (err) {
//    console.log(err);
//});
//item.suspend("593d003bd28c8f3c127c7d38").then(function (result) {
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
