app.controller("storeController", function ($scope, $state, $rootScope, $timeout, $stateParams, API) {
    console.log('1111');

    $scope.load = function () {
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

        });

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
        });


    }
    $scope.load();

    $scope.viewgallery = function (_id) {
        $state.go('gallery', { galleryid: _id });
    }

});


