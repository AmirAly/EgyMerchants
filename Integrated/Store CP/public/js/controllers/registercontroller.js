egm.controller("registerController", function ($scope, API, $rootScope) {
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
                //$rootScope.storeId = res.data.data._id;
                //console.log($rootScope.storeId);
            } else {
                console.log(res.data);
            }
        });
    };


});