app.controller("LoginController", function ($scope, $state, $rootScope, API) {
    $scope.loginFormError = false;
    $scope.submit = function () {
        angular.forEach($scope.frmLogin.$error.required, function (field) {
            field.$setDirty();
        });
        var req = {
            method: 'post',
            url: '/Stores/Login',
            data: {
                Email: $scope.txtEmail,
                Password: $scope.txtPassword
            }
        }
        $rootScope.loading = true;
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                $rootScope.Token = _res.data.data.Token;
                $rootScope.currentUser = {
                    Username: _res.data.data.Username,
                    Email: _res.data.data.Email,
                    _id: _res.data.data._id,
                    AccountType: _res.data.data.AccountType,
                    Token: _res.data.data.Token,
                    FeaturedPhoto: _res.data.data.FeaturedPhoto
                };
                $scope.showMessage = true;
                $scope.messageTxt = 'Welcome back!';
                $scope.messageStatus = 'success';
                $state.go('galleries');

            }
            else if (_res.data.code == 101) { // Email not confirmed
                $rootScope.currentUser = {
                    Username: _res.data.data.Username,
                    Email: _res.data.data.Email,
                    _id: _res.data.data._id,
                    AccountType: _res.data.data.AccountType,
                    Token: _res.data.data.Token,
                    FeaturedPhoto: _res.data.data.FeaturedPhoto
                };
                $scope.showMessage = true;
                $scope.messageTxt = 'Welcome back, your email needs to be activated !';
                $scope.messageStatus = 'warning';
                $state.go('galleries');
            }
            else if (_res.data.code == 24) { // Email not confirmed
                $scope.showMessage = true;
                $scope.messageTxt = 'Sorry, your account has been suspended, please contact support';
                $scope.messageStatus = 'warning';
            }
            else { // Email not confirmed
                $scope.showMessage = true;
                $scope.messageTxt = 'Wrong login infromation';
                $scope.messageStatus = 'warning';
            }
        }, function (error) {
            $scope.showMessage = true;
            $scope.messageTxt = 'Something went wrong, Please try again later';
            $scope.messageStatus = 'warning';
        })
        .finally(function () {
            $rootScope.loading = false;
        });
    }
});


