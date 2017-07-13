app.controller("landingController", function ($scope, $rootScope, $timeout, API, $filter) {
    $rootScope.loading = true;
    $timeout(function () {
        $rootScope.loading = false;
    }, 2000);

    $scope.init = function (_allcountres, _allcategories, _isoCode) {
        console.log(_isoCode);

        $scope.allCountries = JSON.parse(_allcountres);
        localStorage.setItem('allCountries', (JSON.stringify($scope.allCountries)));

        $scope.selectedCountry = ($filter('filter')($scope.allCountries, { 'IsoCode': _isoCode }))[0]; //$scope.allCountries[0];
        console.log($scope.selectedCountry);

        console.log(_allcategories);
        if (_allcategories == '') {
            console.log('if');
            $scope.allcategories = [];
        }
        else {
            console.log('else');
            $scope.lstCategories = JSON.parse(_allcategories);
            console.log($scope.lstCategories);
            $scope.allcategories = $scope.lstCategories;
        }
        console.log($scope.allcategories);
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
                        window.location.href = '/' + _res.data.data.IsoCode + '/Home';
                        //console.log(_res);
                    } else {
                        //console.log(_res);
                    }
                });

            }
        }
    }
});


