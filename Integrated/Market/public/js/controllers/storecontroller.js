app.controller("storeController", function ($scope, $rootScope, $timeout) {
    $scope.init = function (_galleriesJson, _isoCode) {
        $rootScope.IsoCode = _isoCode;
        $scope.GalleriesLst = [];
        for (var i = 0; i < _galleriesJson.length; i++) {
            var result = _galleriesJson[i].gallery.slice(1, -1);
            var result2 = $.trim(result.substring(result.indexOf("Title:") + 6));
            var result3 = result2.slice(1, -1);
            _galleriesJson[i].gallery = result3;
        }
        $scope.GalleriesLst = _galleriesJson;

        
    }
});