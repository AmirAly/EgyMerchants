app.factory('API', ['$http', '$rootScope', function ($http, $rootScope) {
    //var _url = "http://localhost:8007";
    var _url = "http://egm-api.azurewebsites.net";
    return {
        name: 'API',
        execute: function (_req) {
            var headers;
            if ($rootScope.currentUser && $rootScope.currentUser.Token)
                headers = { 'Content-Type': 'application/json', 'authorization': $rootScope.currentUser.Token };
            else
                headers = { 'Content-Type': 'application/json' };
            _req.url = _url + _req.url;
            _req.headers = headers;
            return $http(_req);
        }
    };
}]);
