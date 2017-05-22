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
        $scope.loading = true;
        var req = {
            method: 'post',
            url: '/Store/Register',
            data:$scope.register
        }
        API.execute(req).then(function (res) {
            if (res.data.code == 100) {
                window.location.href = '/eg/Home';
            } else {
                $scope.errMsg = true;
                $scope.errdiv = true;
                console.log(res.data);
            }
        }).finally(function () {
            $scope.loading = false;
        });
    };


});