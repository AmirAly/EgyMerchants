app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
        url: '/login',
        views: {
            '': { templateUrl: 'views/login.html', controller: 'LoginController' },
            'footerView@login': { templateUrl: 'views/templates/footer.temp.html' }
        }
    })
        .state('register', {
            url: '/register',
            views: {
                '': { templateUrl: 'views/register.html', controller: 'registerController' },
                'footerView@register': { templateUrl: 'views/templates/footer.temp.html' }
            }
        })

        /*Admin routes*/
    .state('galleries', {
        url: '/galleries',
        views: {
            '': { templateUrl: 'views/galleries.html', controller: 'galleriesController' },
            'headerView@galleries': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('gallery', {
        url: '/gallery/:galleryid?',//index.html#/gallery/10
        views: {
            '': { templateUrl: 'views/gallery.html', controller: 'galleryController' },
            'headerView@gallery': { templateUrl: 'views/templates/header.temp.html' }
        }
    })
    .state('items', {
        url: '/items/:galleryid?',
        views: {
            '': { templateUrl: 'views/items.html', controller: 'itemsController' },
            'headerView@items': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('item', {
        url: '/item/:galleryid/:itemid?',
        views: {
            '': { templateUrl: 'views/item.html', controller: 'itemController' },
            'headerView@item': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    ;
    $urlRouterProvider.otherwise('/login');
});
