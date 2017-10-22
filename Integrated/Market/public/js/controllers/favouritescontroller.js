app.controller("favouritesController", function ($scope, $rootScope, $timeout, API) {

    $scope.init = function (_isoCode) {
        $rootScope.IsoCode = _isoCode;
    }

    $scope.removeFromFavorites = function (_itemId) {
        $rootScope.loading = true;
        $scope.favData = {};
        $scope.favData._userid = $rootScope.userId;
        $scope.favData._itemid = _itemId;

        var req = {
            method: 'put',
            url: '/User/RemoveFromFavourites',
            data: $scope.favData
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                $scope.IsFav = true;
                localStorage.setItem('userObject', JSON.stringify(_res.data.data));
                window.location.reload();

            } else {
                $rootScope.loading = false;
                $scope.IsFav = false;
            }

        });
    }

    $scope.redirectToItem = function (_name, _id) {
        window.location.href = '/' + $rootScope.IsoCode + '/Product/' + _name + '/' + _id;
    }
});