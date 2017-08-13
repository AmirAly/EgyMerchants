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


app.factory('socket', function ($rootScope) {
    
 
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
        }
    };
});
