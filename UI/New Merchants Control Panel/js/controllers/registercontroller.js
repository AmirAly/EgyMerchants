ehs.controller("registerController", function ($scope, $state, $rootScope) {
    $scope.loginFormError = false;
    $scope.submit = function () {
        angular.forEach($scope.frmRegister.$error.required, function (field) {
                field.$setDirty();
            });

        //if (code == 100) {
            $state.go('galleries');
        //}
        //else {
        //    $scope.loginFormError = true;
        //    $scope.showMessage = true;
        //    $scope.messageTxt = 'Wrong user name or password ...';
        //    $scope.messageStatus = 'danger';
            
        //}
    }
});


