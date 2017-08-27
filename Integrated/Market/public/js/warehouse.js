app.factory('API', function ($http) {
    //var _url = 'http://localhost:8007';
    var _url = 'https://egym.herokuapp.com';
    return {
        name: 'API',
        execute: function (_req) {
            _req.url = _url + _req.url;
            _req.headers = { 'Content-Type': 'application/json' };
            var result = $http(_req);
            return result;
        }
    }
});


app.factory('socket', ['$rootScope', function ($rootScope) {
    
    var socket = io.connect('http://localhost:8080/');
    //var socket = io.connect('https://egymarket.herokuapp.com/');
    console.log('enterrrrrrrrrrrr00');
    return {
        on: function (eventName, callback) {
            console.log('OOOOOOOOONNN');
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            console.log('EEMMIITT');

            socket.emit(eventName, data, function () {
                var args = arguments;
                console.log('enter emit');
                $rootScope.$apply(function () {
                    if (callback) {
                        console.log(callback);
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
}]);


app.factory('Socketss', function ($rootScope) {
    //var socket = io.connect("http://sockets.chatxchat.com/", { secure: true });
    var socket = io.connect("ws://127.0.0.1:8007/");

    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        },
        connected: function () {
            return socket.connected;
        }
    };
})