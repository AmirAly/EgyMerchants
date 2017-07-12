app.controller("landingController", function ($scope, $rootScope, $timeout, API, $filter) {
    $rootScope.loading = true;
    $timeout(function () {
        $rootScope.loading = false;
    }, 2000);

    $scope.init = function (_allcountres, _allcategories, _isoCode) {
        $scope.allCountries = JSON.parse(_allcountres);
        localStorage.setItem('allCountries', (JSON.stringify($scope.allCountries)));
        $scope.selectedCountry = ($filter('filter')($scope.allCountries, { 'IsoCode': _isoCode }))[0]; //$scope.allCountries[0];
        $scope.IsoCode = _isoCode;
        if (_allcategories == '') {
            $scope.allcategories = [];
        }
        else {
            $scope.lstCategories = JSON.parse(_allcategories);
            $scope.allcategories = $scope.lstCategories;
        }
    }

    $scope.changeCountry = function (_isoCode) {
        $scope.IsoCode = _isoCode;
        $scope.selectedCountry = ($filter('filter')($scope.allCountries, { 'IsoCode': _isoCode }))[0];
        window.location.href = '/' + _isoCode + '/Home';
    }
});


