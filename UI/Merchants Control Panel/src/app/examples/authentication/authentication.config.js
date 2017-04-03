(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('authentication', {
            abstract: true,
            views: {
                'root': {
                    templateUrl: 'app/examples/authentication/layouts/authentication.tmpl.html'
                }
            },
            data: {
                permissions: {
                    only: ['viewAuthentication']
                }
            }
        })
        .state('authentication.login', {
            url: '/login',
            templateUrl: 'app/examples/authentication/login/login.tmpl.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
        .state('authentication.signup', {
            url: '/signup',
            templateUrl: 'app/examples/authentication/signup/signup.tmpl.html',
            controller: 'SignupController',
            controllerAs: 'vm'
        })
        
        ;

        
    }
})();
