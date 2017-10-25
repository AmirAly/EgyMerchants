egm.controller("loginController", function ($scope, $rootScope, API) {

    $scope.preload = function () {
        if (localStorage.getItem('StoreId') !== null && localStorage.getItem('StoreId') !== '') {
            window.location.href = '/galleries/' + localStorage.getItem('StoreId');
        }
    };
    $scope.preload();

    $scope.loginData = {};
    $scope.loginData.Email = '';
    $scope.loginData.Password = '';
    $scope.doLogin = function (form) {
        angular.forEach($scope.frmLogin.$error.required, function (field) {
            field.$setTouched();
        });
        if (form.$valid) {
            login();
        }
    };

    function login() {
        $scope.loading = true;
        var req = {
            method: 'post',
            url: '/Store/Login',
            data: $scope.loginData
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                localStorage.setItem('StoreId', _res.data.data._id);
                localStorage.setItem('StoreName', _res.data.data.Name);
                $rootScope.currentUser = localStorage.getItem('StoreId');
                $rootScope.currentName = localStorage.getItem('StoreName');
                window.location.href = '/galleries/' + _res.data.data._id;
            } else {
                $scope.loading = false;
                $scope.errMsg = true;
                $scope.errdiv = true;
                $scope.errorMsg = _res.data.data;
            }

        });
    }
});