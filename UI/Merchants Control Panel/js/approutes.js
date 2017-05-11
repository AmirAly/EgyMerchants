app.run(function ($rootScope, $state) {
    $rootScope.logout = function () {
        $state.go('login');
    };
    $rootScope.DeleteConfirmed = false;
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
        url: '/login',
        views: {
            '': { templateUrl: 'views/login.html', controller: 'loginController' },
        }
    })
        .state('register', {
            url: '/register',
            views: {
                '': { templateUrl: 'views/register.html', controller: 'registerController' },
            }
        })

        /*Admin routes*/
    .state('galleries', {
        url: '/galleries',
        views: {
            '': { templateUrl: 'views/galleries.html', controller: 'galleriesController' },
            'menu@galleries': { templateUrl: 'views/menu.html', controller: 'menuController' },
        }
    })
    .state('gallery', {
        url: '/gallery',// (/:galleryid?)
        views: {
            '': { templateUrl: 'views/gallery.html', controller: 'galleryController' },
            'menu@gallery': { templateUrl: 'views/menu.html', controller: 'menuController' },
        }
    })
    .state('items', {
        url: '/items',
        views: {
            '': { templateUrl: 'views/items.html', controller: 'itemsController' },
            'menu@items': { templateUrl: 'views/menu.html', controller: 'menuController' },
        }
    })
    .state('item', {
        url: '/item', //(/:itemid?)
        views: {
            '': { templateUrl: 'views/item.html', controller: 'itemController' },
            'menu@item': { templateUrl: 'views/menu.html', controller: 'menuController' },
        }
    })
    .state('store', {
        url: '/store',
        views: {
            '': { templateUrl: 'views/store.html', controller: 'storeController' },
            'menu@store': { templateUrl: 'views/menu.html', controller: 'menuController' },
        }
    })
    ;
    $urlRouterProvider.otherwise('/login');
});
