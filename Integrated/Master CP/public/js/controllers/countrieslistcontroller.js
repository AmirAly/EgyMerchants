egm.controller("countriesListController", function ($scope, API) {
    $scope.editCountry = function () {
        window.location.href = '/eg/country';
    }
});