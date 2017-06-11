egm.controller("countryController", function ($scope, API) {
    var req = {
        method: 'put',
        url: '/Country/Edit',
        data: {
            Name: $scope.country.Name,
            IsoCode: $scope.country.IsoCode,
            Flag: '',
            WelcomeMsg: $scope.country.WelcomeMsg,
            Status: "Active"
        }
    }
    API.execute(req).then(function (_res) {
        console.log(_res);
    });
});