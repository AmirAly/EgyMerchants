egm.factory('API', function ($http) {
    //var _url = 'http://localhost:8007';
    var _url = 'http://egm-app.azurewebsites.net';
    return {
        name: 'API',
        execute: function (_req) {
            _req.url =  _url + _req.url;
            _req.headers = { 'Content-Type': 'application/json' };
            var result = $http(_req);
            return result;
        }
    }
});

