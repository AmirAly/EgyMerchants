app.factory('API',['$http', function ($http){
    var _url = "http://10.0.0.64:8007";
    return {
        name: 'API',
        execute: function (_req) {
            var headers = {
                'Content-Type': 'application/json'
                , 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiU3RvcmUiLCJfaWQiOiI1OGVhMGI0NTEwZWNlZjE1NDhkYzYzYjkiLCJTdG9yZU5hbWUiOiJTSDJfU3RvcmUiLCJpYXQiOjE0OTE3NDQ0NDMsImV4cCI6MTQ5MTg4ODQ0M30.OBfMjGLM0L9RRu5n8PydlAk9DIaA2sA8eB58QlQatEk'
            };
            _req.url = _url + _req.url;
            _req.headers = headers;
            return $http(_req);
        }
    };
}]);