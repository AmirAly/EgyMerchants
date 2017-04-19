app.controller("storeController", function ($scope, $state, $rootScope, $timeout, $stateParams, API) {

    $scope.load = function () {

        $rootScope.loading = true;


        $scope.storeData = [];
        var req = {
            method: 'get',
            url: '/store/' + $stateParams.storeid,
            data: {},
        }
        API.execute(req).then(function (_res) {
            $scope.storeData = _res.data.data;
            $rootScope.globalStoreName = _res.data.data.StoreName;
            $rootScope.globalStoreId = _res.data.data._id;

        }).finally(function () {
            $scope.galleries = [];
            var req = {
                method: 'get',
                url: '/StoreGalleries/' + $stateParams.storeid,
                data: {},
            }
            API.execute(req).then(function (_res) {
                $scope.galleries = _res.data.data;
            }).finally(function () {
                $rootScope.loading = false;
            });
        });




    }
    $scope.load();

    $scope.viewgallery = function (_id) {
        $state.go('gallery', { galleryid: _id });
    }

});


