egm.controller("loginController", function ($scope, API) {
    $scope.loginData = {};
    $scope.loginData.Email = '';
    $scope.loginData.Password = '';

    $scope.login = function () {
        $scope.loading = true;
        var req = {
            method: 'post',
            url: '/Master/Login',
            data: $scope.loginData
        }
        API.execute(req).then(function (res) {
            if (res.data.code == 100) {
                window.location.href = '/eg/store';
                localStorage.setItem('storeId', res.data._id);
            } else {
                $scope.errMsg = true;
                $scope.errdiv = true;
                $scope.loading = false;
            }

        });
    };

});