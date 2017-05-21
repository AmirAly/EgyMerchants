egm.controller("loginController", function ($scope, API) {
    $scope.loginData = {};
    $scope.loginData.Email = '';
    $scope.loginData.Password = '';

    $scope.login = function () {
        var req = {
            method: 'post',
            url: '/Store/Login',
            data: $scope.loginData
        }
        API.execute(req).then(function (res) {
            if (res.data.code == 100) {
                console.log(res);
            } else {
                console.log(res.data);
            }
            
        });
    }
});