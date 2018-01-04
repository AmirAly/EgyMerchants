app.controller("landingController", function ($scope, $rootScope, $timeout, API, $filter) {
    $rootScope.loading = true;


    $scope.allcategories = [];
    $scope.init2 = function (_allcountres, _isoCode) {
        if (_isoCode == 'null') {
            $.get("https://ipinfo.io/geo", function (response) {
                // redirect to 
                window.location = '/' + response.country + '/Home';
            }, "jsonp");
        }
        else {
            $scope.allCountries = JSON.parse(_allcountres);
            localStorage.setItem('allCountries', (JSON.stringify($scope.allCountries)));
            $scope.selectedCountry = ($filter('filter')($scope.allCountries, { 'IsoCode': _isoCode }))[0];
            localStorage.setItem('selectedCountry', (JSON.stringify($scope.selectedCountry)));
            $rootScope.IsoCode = _isoCode;

            localStorage.setItem('IsoCode', _isoCode);
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
                    $scope.txtWelcomeHeader = "Welcome";
                    $scope.txtWelcomeMsg = $scope.selectedCountry.WelcomeMsg;
                } else {
                    $scope.allcategories = [];
                    $scope.txtWelcomeHeader = "Welcome";
                    $scope.txtWelcomeMsg = 'No data available for your country.';
                }



            });
        }
    }

    $scope.openExpo = function (_isoCode, _categoryId) {
        console.log(window.screen.width);
        if (window.screen.width < 720) {
            localStorage.setItem("expohref", "/" + _isoCode + "/Mobile/Expos/" + _categoryId);
            window.location.href = "/" + _isoCode + "/Mobile/Expos/" + _categoryId;
        } else {
            localStorage.setItem("expohref", "/" + _isoCode + "/Expos/" + _categoryId);
            window.location.href = "/" + _isoCode + "/Expos/" + _categoryId;
        }
    }

    $scope.changeCountry = function (_isoCode) {
        $rootScope.IsoCode = _isoCode;
        localStorage.setItem('IsoCode', _isoCode);
        $scope.selectedCountry = ($filter('filter')($scope.allCountries, { 'IsoCode': _isoCode }))[0];
        localStorage.setItem('selectedCountry', (JSON.stringify($scope.selectedCountry)));
        window.location.href = '/' + _isoCode + '/Home';
    }


});


