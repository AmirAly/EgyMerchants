app.controller("favouritesController", function ($scope, $rootScope, $timeout, API) {

    $scope.init = function (_isoCode) {
        console.log('enter');
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
            console.log(_res);
            if (_res.data.code == 100) {
                //$rootScope.loading = false;
                $scope.IsFav = true;
                console.log('removed fav');
                localStorage.setItem('userObject', JSON.stringify(_res.data.data));
                window.location.reload();

            } else {
                $rootScope.loading = false;
                $scope.IsFav = false;
                console.log('not removed fav');
            }

        });
    }

    $scope.redirectToItem = function (_name, _id) {
        window.location.href = '/' + $rootScope.IsoCode + '/Product/' + _name + '/' + _id;
    }
});