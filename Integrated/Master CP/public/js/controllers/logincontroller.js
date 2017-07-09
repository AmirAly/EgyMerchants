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
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                window.location.href = '/eg/store';
                localStorage.setItem('storeId', _res.data._id);
            } else {
                $scope.loading = false;
                $scope.errMsg = true;
                $scope.errdiv = true;
                $scope.errorMsg = _res.data.data;
            }

        });
    };

});