app.factory('API',['$http', function ($http){
    var _url = "http://192.168.8.104:8007";
    return {
        name: 'API',
        execute: function (_req) {
            var headers = { 'Content-Type': 'application/json', 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiU3RvcmUiLCJfaWQiOiI1OGU2MjQxODgwY2M4ZTE2ODAzOWZkNTIiLCJTdG9yZU5hbWUiOiJRYW1hciIsImlhdCI6MTQ5MTQ4MjIwNywiZXhwIjoxNDkxNjI2MjA3fQ.cCkqDVtYbBmKQPc9N-OJIgk78uqOl_6Hxv-fzMKgLlw' };
            _req.url = _url + _req.url;
            _req.headers = headers;
            return $http(_req);
        }
    };
}]);