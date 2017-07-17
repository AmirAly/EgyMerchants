app.controller("productController", function ($scope, $rootScope, $timeout) {
    //$scope.x = { "name": "ali", "password": "123456" };
    $scope.init = function (_isoCode) {
        $rootScope.IsoCode = _isoCode;
    }
});