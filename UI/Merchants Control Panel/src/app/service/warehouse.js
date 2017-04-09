//(function () {
//    'use strict';
//    angular
//        .module('app.examples.management')
//        .factory('API', ['$http', '$rootScope',  '$state', function ($http, $rootScope, $state) {
//            var _url = "http://localhost:8007";
//            //var _url = "http://ucare-pre.azurewebsites.net";
//            //var _url = "https://ucare-live.azurewebsites.net";
//            return {
//                name: 'API',
//                execute: function (_req) {
//                    var headers = { 'authorization': $rootScope.userToken };
//                    _req.url = _url + _req.url;
//                    _req.headers = headers;
//                    _req.timeout = 10000;
//                    var _result = $http(_req).error(function (_data, _status) {
                        
//                    }).success(function (_data) {
                        
//                    });
//                    return _result;
//                },
//            };
//        }]);
//})();
