app.controller("favouritesController", function ($scope, $rootScope, $timeout, API) {

    $scope.init = function (_isoCode) {
        console.log('enter');
        $rootScope.IsoCode = _isoCode;
    }

});