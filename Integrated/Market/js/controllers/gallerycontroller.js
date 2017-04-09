app.controller("galleryController", function ($scope, $state, $rootScope, $timeout, $stateParams, API) {
    console.log('1111');

    $scope.load = function () {
        console.log($stateParams.galleryid);
        $scope.gallery = [];
        var req = {
            method: 'get',
            url: '/Gallery/' + $stateParams.galleryid,
            data: {},
        }
        console.log(req);
        API.execute(req).then(function (_res) {
            console.log(_res);
            $scope.gallery = _res.data.data;
        });

        $scope.items = [];
        var req = {
            method: 'get',
            url: '/Items/' + $stateParams.galleryid,
            data: {},
        }
        console.log(req);
        API.execute(req).then(function (_res) {
            console.log(_res);
            //$scope.items = _res.data.data;
            for (var i = 0; i < _res.data.data.length; i++) {
                $scope.items.push({
                    Name: _res.data.data[i].Name,
                    Img: _res.data.data[i].Pictures[0].URL
                });
            }
            console.log($scope.items);
        });

    }
    
    $scope.load();

});


