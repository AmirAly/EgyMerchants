app.controller("landingController", function ($scope, $rootScope, $timeout, API, $filter) {
    $rootScope.loading = true;

    $scope.init2 = function (_allcountres, _isoCode) {
        //console.log('enter');
        $scope.allCountries = JSON.parse(_allcountres);
        localStorage.setItem('allCountries', (JSON.stringify($scope.allCountries)));
        $scope.selectedCountry = ($filter('filter')($scope.allCountries, { 'IsoCode': _isoCode }))[0]; //$scope.allCountries[0];
        localStorage.setItem('selectedCountry', (JSON.stringify($scope.selectedCountry)));
        $rootScope.IsoCode = _isoCode;

        $rootScope.loading = true;
        var req = {
            method: 'get',
            url: '/Category/GetByCountry/' + _isoCode,
            data: {}
        }
        API.execute(req).then(function (_res) {
            $rootScope.loading = false;

            if (_res.data.code == 100) {
                $scope.allcategories = _res.data.data;
            } else {
                $scope.allcategories = [];
            }

            $scope.txtWelcomeHeader = "Welcome";
            $scope.txtWelcomeMsg = $scope.selectedCountry.WelcomeMsg;


        });

    }

    $scope.openExpo = function (_isoCode, _categoryId) {
        localStorage.setItem("expohref", "/" + _isoCode + "/Expos/" + _categoryId);
    }

    $scope.changeCountry = function (_isoCode) {
        $rootScope.IsoCode = _isoCode;
        $scope.selectedCountry = ($filter('filter')($scope.allCountries, { 'IsoCode': _isoCode }))[0];
        localStorage.setItem('selectedCountry', (JSON.stringify($scope.selectedCountry)));
        window.location.href = '/' + _isoCode + '/Home';
    }


});


