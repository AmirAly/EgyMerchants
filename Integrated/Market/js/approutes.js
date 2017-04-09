app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    /*System routes*/
    .state('landing', {
        url: '/landing',
        views: {
            '': { templateUrl: 'views/landing.html', controller: 'landingController' },
            'headerView@landing': { templateUrl: 'views/templates/header.temp.html' },
            'footerView@landing': { templateUrl: 'views/templates/footer.temp.html' }
        }
    })
    .state('store', {
        url: '/store/:storeid?',
        views: {
            '': { templateUrl: 'views/store.html', controller: 'storeController' },
            'headerView@store': { templateUrl: 'views/templates/header.temp.html' },
            'footerView@store': { templateUrl: 'views/templates/footer.temp.html' }
        }
    })
 .state('gallery', {
     url: '/gallery/:galleryid?',
     views: {
         '': { templateUrl: 'views/gallery.html', controller: 'galleryController' },
         'headerView@gallery': { templateUrl: 'views/templates/header.temp.html' },
         'footerView@gallery': { templateUrl: 'views/templates/footer.temp.html' }
     }
 })
    ;
    $urlRouterProvider.otherwise('/landing');
});
