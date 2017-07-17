app.controller("searchController", function ($scope, $rootScope, API) {
    //$scope.keyword = '';
<<<<<<< HEAD
    $scope.expos = 'all';
    $scope.countries = 'all';
    $scope.stores = 'all';
    $scope.init1 = function (_result, _isoCode) {
        $rootScope.IsoCode = _isoCode;
=======
    $scope.expos = '';
    $scope.countries = '';
    $scope.stores = '';
    $scope.init1 = function (_result) {
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
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
<<<<<<< HEAD
                $scope.searchResult = '';
=======
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
                $rootScope.loading = false;
            }
        });
    }

    $scope.clearSearch = function () {
        $scope.keyword = '';
<<<<<<< HEAD
        $scope.expos = 'all';
        $scope.countries = 'all';
        $scope.stores = 'all';
=======
        $scope.expos = '';
        $scope.countries = '';
        $scope.stores = '';
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
    }


});

