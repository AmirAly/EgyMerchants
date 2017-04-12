app.controller("registerController", function ($scope, $state, $rootScope, API) {
    $scope.loginFormError = false;
    $scope.submit = function () {
        angular.forEach($scope.frmRegister.$error.required, function (field) {
            field.$setDirty();
        });

        //if (code == 100) {
            var req = {
                method: 'post',
                url: '/Stores/Register',
                data: {
                    StoreName: $scope.txtName,
                    Email: $scope.txtEmail,
                    Password: $scope.passData.txtPassword,
                    //CountryISOCode: response.country,
                    Category: 'Furniture'
                }
            }
        //})
        $rootScope.loading = true;
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                $rootScope.Token = _res.data.data.Token;
                $rootScope.currentUser = {
                    StoreName: _res.data.data.StoreName,
                    Email: _res.data.data.Email,
                    _id: _res.data.data._id,
                    Password: _res.data.data.Password,
                    CountryISOCode: _res.data.data.CountryISOCode,
                    Token: _res.data.data.Token
                };
                $scope.showMessage = true;
                $scope.messageTxt = 'Welcome back!';
                $scope.messageStatus = 'success';
                console.log($rootScope.currentUser);
                $state.go('login');
            } else {
                $scope.showMessage = true;
                $scope.messageTxt = 'This email/store name is already registered with us';
                $scope.messageStatus = 'warning';
            }

        })

        .finally(function () {
            $rootScope.loading = false;
        });

    };
});
