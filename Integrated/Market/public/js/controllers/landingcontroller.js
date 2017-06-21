app.controller("landingController", function ($scope, $rootScope, $timeout, API) {
    $rootScope.loading = true;
    $timeout(function () {
        $rootScope.loading = false;
    }, 2000);
    console.log('sss');

    $scope.init = function (_allcountres, _allcategories) {
       
        $scope.allCountries = _allcountres;
        localStorage.setItem('allCountries', (JSON.stringify(_allcountres)));

        $scope.selectedCountry = $scope.allCountries[0];
        console.log($scope.selectedCountry);
        $scope.allcategories = _allcategories.Categories;
    }

    $scope.changeCountry = function (_id) {
        for (var i = 0; i < $scope.allCountries.length; i++) {
            if ($scope.allCountries[i]._id == _id) {
                console.log($scope.allCountries[i]);
                $scope.selectedCountry = $scope.allCountries[i];
                // call categories  /Country/GetById/:_id
                var req = {
                    method: 'get',
                    url: '/Country/GetById/' + $scope.selectedCountry._id,
                    data: {}
                }
                API.execute(req).then(function (_res) {
                    console.log(_res);
                    if (_res.data.code == 100) {
                        $scope.allcategories = _res.data.data.Categories;
                        //console.log(_res);
                    } else {
                        //console.log(_res);
                    }
                });

            }
        }
    }
});


