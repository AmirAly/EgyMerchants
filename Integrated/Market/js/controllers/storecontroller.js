app.controller("storeController", function ($scope, $state, $rootScope, $timeout, $stateParams, API) {
    console.log('1111');

    $scope.load = function () {

        $rootScope.loading = true;

        console.log($stateParams.storeid);

        $scope.storeData = [];
        var req = {
            method: 'get',
            url: '/store/' + $stateParams.storeid,
            data: {},
        }
        console.log(req);
        API.execute(req).then(function (_res) {
            console.log(_res);
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
            console.log(req);
            API.execute(req).then(function (_res) {
                console.log(_res);
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


