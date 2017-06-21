app.controller("searchController", function ($scope, $rootScope, API) {
    //$scope.keyword = '';
    $scope.expos = '';
    $scope.countries = '';
    $scope.stores = '';
    console.log(11111111111);
    $scope.init1 = function (_result) {
        console.log('enter search');
        console.log(_result);
        if ( _result != '') {
            $scope.searchResult = JSON.parse(_result);
        }
        else {
            $scope.searchResult = _result;
        }
        console.log($scope.searchResult);
    }

    $scope.refineSearch = function () {
        $rootScope.loading = true;
        console.log($scope.keyword);
        console.log($scope.expos);
        console.log($scope.countries);
        console.log($scope.stores);
        ////////////// call API /////////
        var store, expo, keyword, country;
        if ($scope.stores == '')
            store = 'all';
        else
            store = $scope.stores;
        if ($scope.expos == '')
            expo = 'all';
        else
            expo = $scope.expos
        if ($scope.keyword == '')
            keyword = 'all';
        else
            keyword = $scope.keyword;
        if ($scope.countries == '')
            country = 'all';
        else
            country = $scope.countries;


        var req = {
            method: 'get',
            url: '/Store/Search/' + store + '/' + expo + '/' + keyword + '/' + country,
            data: {}
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                $scope.searchResult = _res.data.data;
                console.log(_res.data);
                $rootScope.loading = false;
            } else {
                console.log(_res.data);
                $rootScope.loading = false;
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

