app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Eg/Home');

    $stateProvider
    .state('landing', {
        url: '/Eg/Home',
        views: {
            '': { templateUrl: 'views/landing.html', controller: 'landingController' },
            //'header@landing': { templateUrl: 'views/templates/header.html' },
            //'footer@landing': { templateUrl: 'views/templates/footer.html' }
        }
    })

    .state('expo', {
        url: '/Eg/Expos',
        views: {
            '': { templateUrl: 'views/expo.html', controller: 'expoController' },
            'header@expo': { templateUrl: 'views/templates/header.html' },
            'footer@expo': { templateUrl: 'views/templates/footer1.html' },
            'footer2@expo': { templateUrl: 'views/templates/footer2.html' },
            'social@expo': { templateUrl: 'views/templates/social.html' }

        }
    })


    .state('store', {
        url: '/Eg/Store/:storeName/:storeId',
        views: {
            '': { templateUrl: 'views/store.html', controller: 'storeController' },
            'header@store': { templateUrl: 'views/templates/header.html' },
            'footer@store': { templateUrl: 'views/templates/footer1.html' },
            'footer2@store': { templateUrl: 'views/templates/footer2.html' },
            'social@store': { templateUrl: 'views/templates/social.html' }
        }
    })

    .state('gallery', {
        url: '/Eg/Gallery/:galleryName/:galleryId',
        views: {
            '': { templateUrl: 'views/gallery.html', controller: 'galleryController' },
            'header@gallery': { templateUrl: 'views/templates/header.html' },
            'footer@gallery': { templateUrl: 'views/templates/footer1.html' },
            'footer2@gallery': { templateUrl: 'views/templates/footer2.html' },
            'social@gallery': { templateUrl: 'views/templates/social.html' }
        }
    })

        .state('product', {
            url: '/Eg/Product/:productName/:productId',
            views: {
                '': { templateUrl: 'views/product.html', controller: 'productController' },
                'header@product': { templateUrl: 'views/templates/header.html' },
                'footer@product': { templateUrl: 'views/templates/footer1.html' },
                'footer2@product': { templateUrl: 'views/templates/footer2.html' },
                'social@product': { templateUrl: 'views/templates/social.html' }
            }
        })

    ;
});