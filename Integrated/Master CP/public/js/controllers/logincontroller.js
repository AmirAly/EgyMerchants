egm.controller("loginController", function ($scope, API) {
    $scope.loginData = {};
    $scope.loginData.Email = '';
    $scope.loginData.Password = '';
<<<<<<< HEAD
    $scope.doLogin = function (form) {
        angular.forEach($scope.frmLogin.$error.required, function (field) {
            field.$setDirty();
        });
        if (form.$valid) {
            login();
        }
    }

    function login () {
=======

    $scope.login = function () {
>>>>>>> d8533afff7a9d35c04581998312cd97fadad366c
        $scope.loading = true;
        var req = {
            method: 'post',
            url: '/Master/Login',
            data: $scope.loginData
        }
<<<<<<< HEAD
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                window.location.href = '/store';
                localStorage.setItem('storeId', _res.data._id);
            } else {
                $scope.loading = false;
                $scope.errMsg = true;
                $scope.errdiv = true;
                $scope.errorMsg = _res.data.data;
=======
        API.execute(req).then(function (res) {
            if (res.data.code == 100) {
                window.location.href = '/eg/store';
                localStorage.setItem('storeId', res.data._id);
            } else {
                $scope.errMsg = true;
                $scope.errdiv = true;
                $scope.loading = false;
>>>>>>> d8533afff7a9d35c04581998312cd97fadad366c
            }

        });
    };

});