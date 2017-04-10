(function () {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, $scope, $rootScope, $mdToast, API, triSettings, triLoaderService) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            Email: '',
            Password: ''
        };

        ////////////////

        function loginClick() {
            var req = {
                method: 'POST',
                url: '/Stores/Login',
                data: vm.user
            }
            console.log(req);
            API.execute(req, function (_res) {
                console.log(_res);
                if (_res.data.code == 20) {
                    $mdToast.show({
                        template: '<md-toast><span flex>' + _res.data.data + '</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                }
                else if (_res.data.code == 24) {
                    $mdToast.show({
                        template: '<md-toast><span flex>' + _res.data.data + '</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                }
                else if (_res.data.code == 100) {
                    $mdToast.show({
                        template: '<md-toast><span flex>Welcome back !</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                    $rootScope.Token = _res.data.data;
                    $state.go('triangular.gallerymanagement');
                }
                else if (_res.data.code == 101) {
                    $mdToast.show({
                        template: '<md-toast><span flex>' + _res.data.data + '</span></md-toast>',
                        position: 'bottom right',
                        hideDelay: 3000
                    });
                }
            });
        }
    }
})();
