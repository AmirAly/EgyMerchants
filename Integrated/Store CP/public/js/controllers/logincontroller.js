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
                //$rootScope.storeId = res.data.data._id;
                localStorage.setItem('StoreId', res.data.data._id);
                window.location.href = '/eg/g/galleries/' + res.data.data._id;
                console.log(res);
            } else {
                $scope.errMsg = true;
                $scope.errdiv = true;
                console.log(res.data);
            }

        });
    }
});