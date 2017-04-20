app.controller("landingController", function ($scope, $state, $rootScope , $timeout,API) {

    $scope.load = function () {

        $timeout(function () {
            $.fancybox.open([{ href: 'images/welcome0.jpg', title: 'Welcome' }]);
        });
        $scope.stores = [];
        var req = {
            method: 'get',
            url: '/stores/'+'All',
            data: {},
        }
        API.execute(req).then(function (_res) {
            $scope.stores = _res.data.data;
            $rootScope.loading = false;
        });
    }
    $scope.load();

    $scope.viewStore = function (_id) {
        $state.go('store', { storeid: _id });
    }
    

});


