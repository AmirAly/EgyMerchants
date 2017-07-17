app.controller("storeController", function ($scope, $rootScope, $timeout) {
<<<<<<< HEAD
    $scope.init = function (_galleriesJson, _isoCode) {
        $rootScope.IsoCode = _isoCode;
=======
    $scope.init = function (_galleriesJson) {
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
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