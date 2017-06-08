egm.controller("countriesListController", function ($scope, API) {


    $scope.addCountry = function () {
        var req = {
            method: 'post',
            url: '/Country/Add',
            data: {
                Name: $scope.country.Name,
                IsoCode: $scope.country.IsoCode,
                Flag: 'hh',
                WelcomeMsg: $scope.country.WelcomeMsg,
                Status: "Active"
            }
        }
    };

    $scope.editCountry = function () {
        window.location.href = '/eg/country';
    }
});