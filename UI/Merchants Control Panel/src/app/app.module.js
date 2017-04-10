(function () {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'triangular',
            'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngMaterial',
            //'googlechart', 'chart.js', 'linkify', 'ui.calendar', 'angularMoment', 'textAngular', 'uiGmapgoogle-maps', 'hljs',
            'md.data.table',
            //angularDragula(angular), 
            'ngFileUpload',// 'nvd3',
            'app.examples'
        ])
        // set a constant for the API we are connecting to
        .constant('API_CONFIG', {
            'url': 'http://egm-api.azurewebsites.net/'
        })
        .factory('API', ['$http', function ($http) {
            //var _url = "http://localhost:8007";
            var _url = "http://egm-api.azurewebsites.net";
            return {
                name: 'API',
                execute: function (_req,_callback) {
                    var headers = { 'Content-Type': 'application/json' };
                    _req.url = _url + _req.url;
                    _req.headers = headers;
                    $http(_req).then(_callback(_res)).error(console.log('I have an error with API'));
                }
            };
        }]).factory('httpRequestInterceptor', function () {
            return {
                request: function (config) {
                    config.headers['Authorization'] = $rootScope.Token;
                    config.headers['Accept'] = 'application/json;odata=verbose';
                    return config;
                }
            };
        }).config(function ($httpProvider) {
            $httpProvider.interceptors.push('httpRequestInterceptor');
        });
})();


