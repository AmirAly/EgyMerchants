app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('welcome', {
        cache: false,
        url: '/',
        views: {
            '': { templateUrl: 'views/welcome.html', controller: 'welcomeController' }
        }
    })

    .state('landing', {
        cache: false,
        url: '/landing',
        views: {
            '': { templateUrl: 'views/landing.html', controller: 'landingController' }
        }
    })
    ;
});