app.controller("landingController", function ($scope, $state, $rootScope , $timeout,API) {
    console.log('1111');

    $scope.load = function () {
        $timeout(function () {
            $.fancybox.open([{ href: 'images/welcome1.jpg', title: 'Welcome' }]);
        }, 1500);
        $scope.stores = [];
        var req = {
            method: 'get',
            url: '/stores/'+'All',
            data: {},
        }
        console.log(req);
        API.execute(req).then(function (_res) {
            console.log(_res);
            $scope.stores = _res.data.data;
        });
    }
    $scope.load();

    $scope.viewStore = function (_id) {
        $state.go('store', { storeid: _id });
    }
    

});


