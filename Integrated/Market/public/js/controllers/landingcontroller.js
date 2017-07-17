<<<<<<< HEAD
﻿app.controller("landingController", function ($scope, $rootScope, $timeout, API, $filter) {
    //$rootScope.loading = true;

    $scope.init2 = function (_allcountres, _isoCode) {
        console.log('enter');
        $scope.allCountries = JSON.parse(_allcountres);
        localStorage.setItem('allCountries', (JSON.stringify($scope.allCountries)));
        $scope.selectedCountry = ($filter('filter')($scope.allCountries, { 'IsoCode': _isoCode }))[0]; //$scope.allCountries[0];
        localStorage.setItem('selectedCountry', (JSON.stringify($scope.selectedCountry)));
        $rootScope.IsoCode = _isoCode;

        $scope.loading = true;
        var req = {
            method: 'get',
            url: '/Category/GetByCountry/' + _isoCode,
            data: {}
        }
        API.execute(req).then(function (_res) {
            console.log(_res.data);
            if (_res.data.code == 100) {
                $scope.allcategories = _res.data.data;
            } else {
                $scope.allcategories = [];
            }
            $scope.loading = false;
        });

    }

    $scope.changeCountry = function (_isoCode) {
        $rootScope.IsoCode = _isoCode;
        $scope.selectedCountry = ($filter('filter')($scope.allCountries, { 'IsoCode': _isoCode }))[0];
        localStorage.setItem('selectedCountry', (JSON.stringify($scope.selectedCountry)));
        window.location.href = '/' + _isoCode + '/Home';
=======
﻿app.controller("landingController",  function ($scope, $rootScope, $timeout, API) {
    $rootScope.loading = true;
    $timeout(function () {
        $rootScope.loading = false;
    }, 2000);

    $scope.init = function (_allcountres, _allcategories) {
       
        $scope.allCountries = _allcountres;
        localStorage.setItem('allCountries', (JSON.stringify(_allcountres)));

        $scope.selectedCountry = $scope.allCountries[0];
        $scope.allcategories = _allcategories.Categories;
    }

    $scope.changeCountry = function (_id) {
        for (var i = 0; i < $scope.allCountries.length; i++) {
            if ($scope.allCountries[i]._id == _id) {
                $scope.selectedCountry = $scope.allCountries[i];
                // call categories  /Country/GetById/:_id
                var req = {
                    method: 'get',
                    url: '/Country/GetById/' + $scope.selectedCountry._id,
                    data: {}
                }
                API.execute(req).then(function (_res) {
                    if (_res.data.code == 100) {
                        $scope.allcategories = _res.data.data.Categories;
                        //console.log(_res);
                    } else {
                        //console.log(_res);
                    }
                });

            }
        }
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
    }
});


