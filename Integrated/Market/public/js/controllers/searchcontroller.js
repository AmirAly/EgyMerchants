app.controller("searchController", function ($scope, API) {
    //$scope.keyword = '';
    $scope.expos = '';
    $scope.countries = '';
    $scope.stores = '';

    $scope.init = function (_result) {
        $scope.searchResult = JSON.parse(_result);
    }

    $scope.refineSearch = function () {
        console.log($scope.keyword);
        console.log($scope.expos);
        console.log($scope.countries);
        console.log($scope.stores);
        ////////////// call API /////////
        var store, expo, keyword, country;
        if ($scope.stores == '')
            store = 'all';
        else store = $scope.stores;
        if ($scope.expos == '')
            expo = 'all';
        else expo = $scope.expos
        if ($scope.keyword == '')
            keyword = 'all';
        else keyword = $scope.keyword;
        if ($scope.countries == '')
            country = 'all';
        else country = $scope.countries;


        var req = {
            method: 'get',
            url: '/Store/Search/' + store + '/' + expo + '/' + keyword + '/' + country,
            data: {}
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                $scope.searchResult = _res.data.data;
                console.log(_res);
            } else {
                console.log(_res);
            }
        });
    }

    $scope.clearSearch = function () {
        $scope.keyword = '';
        $scope.expos = '';
        $scope.countries = '';
        $scope.stores = '';
    }


});

