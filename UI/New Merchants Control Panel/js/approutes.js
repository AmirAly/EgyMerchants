var ehs = angular.module("ehs", ['ui.router', 'ui.bootstrap.datetimepicker', 'ngAnimate', 'ui.dateTimeInput', 'uiSwitch']);

ehs.run(function ($rootScope, $state) {
    $rootScope.logout = function () {
        $state.go('login');
    };
    $rootScope.DeleteConfirmed = false;
});

ehs.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
        url: '/login',
        views: {
            '': { templateUrl: 'views/login.html', controller: 'LoginController' },
            'footerView@login': { templateUrl: 'views/templates/footer.temp.html' }
        }
    })

        /*Admin routes*/
    .state('clients', {
        url: '/clients',
        views: {
            '': { templateUrl: 'views/clients.html', controller: 'ClientsController' },
            'headerView@clients': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('client', {
        url: '/client/:clientid?',//index.html#/client/10
        views: {
            '': { templateUrl: 'views/client.html', controller: 'ClientController' },
            'headerView@client': { templateUrl: 'views/templates/header.temp.html' }
        }
    })
    ;
    $urlRouterProvider.otherwise('/login');
});
