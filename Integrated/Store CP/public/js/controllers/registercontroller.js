egm.controller("registerController", function ($scope, API) {
    $scope.categories = [];
    $scope.register = {};


    $scope.chooseCategory = function (_id) {
        console.log(_id);
        $scope.categoryId = _id;
    };


    $scope.registerStore = function () {
        console.log($scope.selectedCity);
        $scope.register.CountryISOCode = $scope.selectedCity;
        $scope.register.Category = $scope.categoryId;
        var req = {
            method: 'post',
            url: '/Store/Register',
            data:$scope.register
        }
        API.execute(req).then(function (res) {
            if (res.data.code == 100) {
                console.log(res);
            } else {
                console.log(res.data);
            }
        });
    };


});