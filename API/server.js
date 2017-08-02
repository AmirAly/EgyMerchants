
// modules =================================================
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/images'));
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api = require('./app/api')(app, express);
var db = require('./config/config');
var _ = require("underscore");
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
var messageschema = require('./app/models/message');
var message = require('./app/messages');
var commentschema = require('./app/models/comment');
var comment = require('./app/comments');
var notificationschema = require('./app/models/notification');
var notification = require('./app/notifications');
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


//var http = require('http').Server(app);
//var io = require('socket.io')(http);
//var users = [];
//io.on('connection', function(socket) {
//    console.info('New client connected (id=' + socket.id + ').');
//    users.push(socket);

//     //When socket disconnects, remove it from the list:
//    socket.on('disconnect', function() {
//        var index = users.indexOf(socket);
//        if (index != -1) {
//            users.splice(index, 1);
//            console.info('Client gone (id=' + socket.id + ').');
//        }
//    });

//    socket.on('msg', function (data) {
//        message.send(data).then(function (result) {
//            console.log(result);
//        }, function (err) {
//            console.log(err);
//        });
//        //if this user still online then emit the message to him
//        if (_.where(users, data.to).length) {
//            io.to(users[data.to]).emit('newmsg', data)
//        }
//    })
//});

//var http = require('http').Server(app);
//var io = require('socket.io')(http);
//app.get('/', function(req, res){
//  res.sendfile('index.html');
//});
//users = [];
//io.on('connection', function(socket){
//    console.log('A user connected');
//    socket.on('setUsername', function (data) {
//        var user = new Object();
//        user.id = data;
//        user.socket = socket.id;
//        users.push(user);
//        console.log(users);
//            socket.emit('userSet', {username: data});
//    });


//    socket.on('disconnect', function () {
//        var index = users.indexOf(socket);
//        if (index != -1) {
//            users.splice(index, 1);
//            console.info('Client gone (id=' + socket.id + ').');
//        }
//    });


//    socket.on('msg', function (data) {
//        //message.send(data).then(function (result) {
//        //    console.log(result);
//        //}, function (err) {
//        //    console.log(err);
//        //});
//        //if this user still online then emit the message to him
//        //if (_.where(users, "59427908734d1d235a944767").length) {
//        for (var i = 0; i < users.length; i++) {
//            var p = users[i];
//            if (p.id == data.user) {
//                console.log(p.socket);
//                io.sockets.socket(p.socket).emit('newmsg', data);
//                break;
//            }
//        }
//            //io.to(users["59427908734d1d235a944767"]).emit('newmsg', data)
//        //}
//    })
//});
//http.listen(3000, function () {
//    console.log('listening on localhost:3000');
//});











//594660e5734d1d59b7895502,5946db5aa7eee71550d33dfc,5948d21ff17d942198191fba,5980671c6e1f6f0b30dc4377
var newmessage = new messageschema({ "From": "5980671c6e1f6f0b30dc4377", "To": "59427908734d1d235a944767", "Text": "thanks" });
//message.send(newmessage).then(function (result) {
//        console.log(result);
//    }, function (err) {
//        console.log(err);
//    });
//message.getAll("5980671c6e1f6f0b30dc4377", "5948d21ff17d942198191fba").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//message.getAllContacts("5980671c6e1f6f0b30dc4377").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//message.getUnRead("5948d21ff17d942198191fba").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

var newcomment = new commentschema({ "Item": "59466cd6ca6b1c049c494b72", "User": "594660e5734d1d59b7895502", "Text": "discount 10% for first 25 purchased" })
//comment.add(newcomment).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//comment.remove("5981caedc83e09027c676358", "59427908734d1d235a944767").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//notification.updateStatus("5981c6c603fc4a1170d828be").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//notification.getAll("5948d21ff17d942198191fba").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//notification.getUnRead("5948d21ff17d942198191fba").then(function (result) {
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

//user.addToFavourites("5980671c6e1f6f0b30dc4377", "59466f9cca6b1c049c494b81").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});

//user.removeFromFavourites("5980671c6e1f6f0b30dc4377", "59466f9cca6b1c049c494b81").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//user.addToVisited("5980671c6e1f6f0b30dc4377", "5948d21ff17d942198191fba").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//user.getFavourites("5980671c6e1f6f0b30dc4377").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//user.login({ 'Email': 'anisa123@gmail.com', 'Password': '123456' }).then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});




//notification.updateStatus("597f49114a9beb13782d1a09").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//notification.getAll("5948d21ff17d942198191fba").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});
//notification.getUnRead("5948d21ff17d942198191fba").then(function (result) {
//    console.log(result);
//}, function (err) {
//    console.log(err);
//});






