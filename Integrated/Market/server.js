
// server.js
// modules =================================================
// load the things we need
var express = require('express'),
    http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var _ = require("underscore");
// Configuration

var mongoose = require('mongoose');
require('./routes')(app);
var db = require('./config/config');

var message = require('./models/messages');
var messageschema = require('./models/models/message');


// configuration ===========================================


// set the view engine to ejs
app.set('view engine', 'ejs');

// set path for static
app.use(express.static('public'));

var port = process.env.PORT || 8080;

io.heartbeatTimeout = 20000;

mongoose.connect(db.url, function (err) {
    if (err) {
        //console.log(err);
    }
    else {
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, DELETE, OPTIONS');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , authorization");
            next();
        });



        server.listen(port, function () {
            //console.log('listening on sockets');
        });


        app.get('*', function (req, res) {
            //return res.redirect('/EG/Home');
            res.render('pages/404');
        });

    }
});

// Socket.io Communication

var users = [];

io.sockets.on('connection', function (socket) {
    socket.on('adduser', function (data) {
        if (users.length) {
            if (!(_.find(users, function (user) { return (user.id.toString() == data.toString()) }))) {
                var user = new Object();
                user.id = data;
                user.socket = socket.id;
                users.push(user);
            }
        }
        else {
            var user = new Object();
            user.id = data;
            user.socket = socket.id;
            users.push(user);
        }
    });
    socket.on('disconnect', function () {
        var i = users.indexOf(socket);
        users.splice(i, 1);
    });
    socket.on('msg', function (data) {
        // add user if disconnected
        if (users.length) {
            if (!(_.find(users, function (user) { return (user.id.toString() == data.From._id.toString()) }))) {
                var user = new Object();
                user.id = data.From._id;
                user.socket = socket.id;
                users.push(user);
            }
        }
        else {
            var user = new Object();
            user.id = data.From._id;
            user.socket = socket.id;
            users.push(user);
        }
        //send msg
        var newmessage = { From: data.From._id, To: data.To._id, Text: data.Text };
        newmessage = new messageschema(newmessage);
        message.send(newmessage).then(function (result) {
            data.MessageDate = result.data.MessageDate;
            for (var i = 0; i < users.length; i++) {
                if (users[i].id == data.To._id) { // i received the msg
                    data.msgId = result.data._id;
                    io.to(users[i].socket).emit('newmsg', data);
                }
                if (users[i].id == data.From._id) { // i send the msg
                    io.to(users[i].socket).emit('messagesuccess', data);
                }
            }
        }, function (err) {
        });
    });

    socket.on('pong', function (data) {
    });

    function sendHeartbeat() {
        setTimeout(sendHeartbeat, 25000);
        socket.emit('ping', { beat: 1 });
    }
    sendHeartbeat();

});