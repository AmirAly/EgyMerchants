app.controller("favouritesController", function ($scope, $rootScope, $timeout, API) {

    $scope.init = function (_isoCode) {
        console.log('enter');
        $rootScope.IsoCode = _isoCode;
    }


    $scope.redirectToItem = function (_name, _id) {
        window.location.href = '/' + $rootScope.IsoCode + '/Product/' + _name + '/' + _id;
    }
});