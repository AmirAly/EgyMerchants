app.controller("searchController", function ($scope, $rootScope, API) {
    //$scope.keyword = '';
    $scope.expos = '';
    $scope.countries = '';
    $scope.stores = '';
    $scope.init1 = function (_result) {
        if ( _result != '') {
            $scope.searchResult = JSON.parse(_result);
        }
        else {
            $scope.searchResult = _result;
        }
    }

    $scope.refineSearch = function () {
        $rootScope.loading = true;
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
            if (_res.data.code == 100) {
                $scope.searchResult = _res.data.data;
                $rootScope.loading = false;
            } else {
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

