// modules =================================================
var express = require('express');
var app = express();
var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);
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
var messageschema = require('./app/models/message');//not delete for socket.io
var message = require('./app/messages');//not delete for socket.io
var commentschema = require('./app/models/comment');
var comment = require('./app/comments');
var notificationschema = require('./app/models/notification');
var notification = require('./app/notifications');
var Helper = require('./app/helper');
// configuration ===========================================
// config files
// check data conection
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(bodyParser.json({ limit: '50mb' }));
//app.use(bodyParser.json());
app.use(express.static(__dirname + '/images'));
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

     
        server.listen(port, function () {
            console.log('listening on 8007');
        });
        console.log('connected to database and server is listeining ');
    
    }
});