egm.controller("loginController", function ($scope, API) {
    $scope.loginData = {};
    $scope.loginData.Email = '';
    $scope.loginData.Password = '';

    //$scope.login = function () {
    //    window.location.href = '/eg/store';
    //};
    $scope.login = function () {
        $scope.loading = true;
        var req = {
            method: 'post',
            url: '/Master/Login',
            data: $scope.loginData
        }
        API.execute(req).then(function (res) {
            if (res.data.code == 100) {
                //$rootScope.storeId = res.data.data._id;
                //localStorage.setItem('StoreId', res.data.data._id);
                window.location.href = '/eg/store';
                console.log(res);
            } else {
                $scope.errMsg = true;
                $scope.errdiv = true;
                console.log(res.data);
                $scope.loading = false;
            }

        });
    }
});