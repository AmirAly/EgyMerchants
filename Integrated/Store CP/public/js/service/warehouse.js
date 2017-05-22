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
//egm.factory('Loader', function ($rootScope, $element) {
//    return {
//        show: function () {
//            $rootScope.loading = $element.show({
//                content: 'Loading',
//                animation: 'fade-in',
//                showBackdrop: true,
//                maxWidth: 200,
//                showDelay: 0,
//                template: '<img src="img/loader.png" width="30px" height="30px" class="loaderImg" />'
//            });
//        },
//        hide: function () {
//            $element.hide();
//        }
//    }
//});

