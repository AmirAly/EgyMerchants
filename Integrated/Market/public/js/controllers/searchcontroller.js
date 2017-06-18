app.controller("searchController", function ($scope, API) {
    //$scope.keyword = '';
    $scope.expos = '';
    $scope.countries = '';
    $scope.stores = '';

    $scope.refineSearch = function () {
        console.log($scope.keyword);
        console.log($scope.expos);
        console.log($scope.countries);
        console.log($scope.stores);
        ////////////// call API /////////
        //var req = {
        //    method: 'get',
        //    url: '/search',
        //    data: {}
        //}
        //API.execute(req).then(function (_res) {
        //    console.log(_res);
        //    if (_res.data.code == 100) {
        //        console.log(_res);
        //    } else {
        //        console.log(_res);
        //    }
        //});
    }

    $scope.clearSearch = function () {
        $scope.keyword = '';
        $scope.expos = '';
        $scope.countries = '';
        $scope.stores = '';
    }
});

