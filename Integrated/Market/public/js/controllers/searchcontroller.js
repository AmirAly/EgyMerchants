app.controller("searchController", function ($scope, $rootScope, API) {
    //$scope.keyword = '';
    $scope.expos = 'all';
    $scope.countries = 'all';
    $scope.stores = 'all';

    console.log(JSON.parse((window.x).replace(/&quot;/g, '"')));
    $scope.searchResult = JSON.parse((window.x).replace(/&quot;/g, '"'));

    $scope.init1 = function ( _isoCode) {
        $rootScope.IsoCode = _isoCode;
        console.log($rootScope.IsoCode);
        localStorage.setItem('IsoCode', _isoCode);
    }

    $scope.refineSearch = function () {
        $rootScope.IsoCode = localStorage.getItem('IsoCode');
        console.log($rootScope.IsoCode);
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
                $scope.searchResult = '';
                $rootScope.loading = false;
            }
            console.log($rootScope.IsoCode);
        });
    }

    $scope.clearSearch = function () {
        //$scope.keyword = '';
        $scope.expos = 'all';
        $scope.countries = 'all';
        $scope.stores = 'all';
        var req = {
            method: 'get',
            url: '/Store/Search/' + $scope.stores + '/' + $scope.expos + '/' + $scope.keyword + '/' + $scope.countries,
            data: {}
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                $scope.searchResult = _res.data.data;
                $rootScope.loading = false;
            } else {
                $scope.searchResult = '';
                $rootScope.loading = false;
            }
            console.log($rootScope.IsoCode);
        });

    }


});

