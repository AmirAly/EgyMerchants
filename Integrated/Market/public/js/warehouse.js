app.factory('API', function ($http) {
   //var _url = 'http://localhost:8007';
     var _url = 'https://egym.herokuapp.com';
    return {
        name: 'API',
        execute: function (_req) {
            _req.url = _url + _req.url;
            //console.log(_req.url);
            _req.headers = { 'Content-Type': 'application/json' };
            var result = $http(_req);
            return result;
        }
    }
});


app.factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect();
    //console.log('enterrrrrrrrrrrr Sockets connect');
    return {
        on: function (eventName, callback) {
            //console.log('OOOOOOOOONNN');
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            //console.log('EEMMIITT');

            socket.emit(eventName, data, function () {
                var args = arguments;
                //console.log('enter emit');
                $rootScope.$apply(function () {
                    if (callback) {
                        //console.log(callback);
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
}]);

app.filter('unique', function () {

    // Take in the collection and which field
    //   should be unique
    // We assume an array of objects here
    // NOTE: We are skipping any object which
    //   contains a duplicated value for that
    //   particular key.  Make sure this is what
    //   you want!
    return function (arr, targetField) {

        var values = [],
            i,
            unique,
            l = arr.length,
            results = [],
            obj;

        // Iterate over all objects in the array
        // and collect all unique values
        for (i = 0; i < arr.length; i++) {

            obj = arr[i];

            // check for uniqueness
            unique = true;
            for (v = 0; v < values.length; v++) {
                if (obj[targetField] == values[v]) {
                    unique = false;
                }
            }

            // If this is indeed unique, add its
            //   value to our values and push
            //   it onto the returned array
            if (unique) {
                values.push(obj[targetField]);
                results.push(obj);
            }

        }
        return results;
    };
})