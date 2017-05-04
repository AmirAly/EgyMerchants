app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('landing', {
        url: '/',
        views: {
            '': { templateUrl: 'views/landing.html', controller: 'landingController' },
            'header@landing': { templateUrl: 'views/templates/header.html' },
            'footer@landing': { templateUrl: 'views/templates/footer.html' }
        }
    })

    .state('expo', {
        url: '/expo',
        views: {
            '': { templateUrl: 'views/expo.html' },
            'header@expo': { templateUrl: 'views/templates/header.html' },
            'footer@expo': { templateUrl: 'views/templates/footer.html' }
        }
    })


    .state('store', {
        url: '/store',
        views: {
            '': { templateUrl: 'views/store.html', controller: 'storeController' },
            'header@store': { templateUrl: 'views/templates/header.html' },
            'footer@store': { templateUrl: 'views/templates/footer.html' }
        }
    })
    ;
});