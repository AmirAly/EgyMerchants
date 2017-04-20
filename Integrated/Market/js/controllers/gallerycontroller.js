app.controller("galleryController", function ($scope, $state, $rootScope, $timeout, $stateParams, API) {

    $scope.load = function () {
        $scope.gallery = [];
        var req = {
            method: 'get',
            url: '/Gallery/' + $stateParams.galleryid,
            data: {},
        }
        API.execute(req).then(function (_res) {
            $scope.gallery = _res.data.data;
        }).finally(function () {
            $scope.items = [];
            var req = {
                method: 'get',
                url: '/Items/' + $stateParams.galleryid,
                data: {},
            }
            API.execute(req).then(function (_res) {
                for (var i = 0; i < _res.data.data.length; i++) {
                    $scope.items.push({
                        Name: _res.data.data[i].Name,
                        Img: _res.data.data[i].Pictures[0].URL
                    });
                }
            });
        });



    }

    $scope.load();

});


