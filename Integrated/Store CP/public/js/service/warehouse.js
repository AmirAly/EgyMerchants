egm.factory('API', function ($http) {
    var _url = 'http://localhost:8007';
    return {
        name: 'API',
        execute: function (_req) {
            _req.url =  _url + _req.url;
            _req.headers = { 'Content-Type': 'application/json' };
            console.log(_req);
            var result = $http(_req);
            console.log(result);
            return result;
        }
    }
});
