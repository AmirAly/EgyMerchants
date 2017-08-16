
// server.js
// modules =================================================
// load the things we need
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var mongoose = require('mongoose');
require('./routes')(app);
var db = require('./config/config');


// configuration ===========================================


// set the view engine to ejs
app.set('view engine', 'ejs');

// set path for static
app.use(express.static('public'));
var port = process.env.PORT || 8080;



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
       // app.listen(process.env.PORT || 8080);
        server.listen(port, function () {
            console.log('listening on sockets');
        });
        app.get('*', function (req, res) {
            //return res.redirect('/EG/Home');
            res.render('pages/404');
        });

        
        

        console.log('8080 is the magic port');
    }
});


var users = [];
io.on('connection', function (socket) {
    socket.on('adduser', function (data) {
        var user = new Object();
        user.id = data;
        user.socket = socket.id;
        users.push(user);
    });
    socket.on('disconnect', function () {
        var index = users.indexOf(socket);
        if (index != -1) {
            users.splice(index, 1);
        }
    });
    socket.on('msg', function (data) {
        var newmessage = { From: data.From._id, To: data.To._id, Text: data.Text };
        newmessage = new messageschema(newmessage);
        message.send(newmessage).then(function (result) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].id == data.To._id) {
                    io.to(users[i].socket).emit('newmsg', data);
                    message.updateStatus(result.data._id).then(function (result) {
                        console.log(result);
                    }, function (err) {
                        console.log(err);
                    })
                }
                if (users[i].id == data.From._id) {
                    io.to(users[i].socket).emit('messagesuccess', data);
                }
            }
        }, function (err) {
            console.log(err);
        });
    })
});