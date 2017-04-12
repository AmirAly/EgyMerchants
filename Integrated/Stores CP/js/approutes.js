var app = angular.module("app", ['ui.router', 'ui.bootstrap.datetimepicker', 'ngAnimate', 'ui.dateTimeInput', 'uiSwitch']);

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
        url: '/gallery/:galleryid?',//index.html#/client/10
        views: {
            '': { templateUrl: 'views/gallery.html', controller: 'galleryController' },
            'headerView@gallery': { templateUrl: 'views/templates/header.temp.html' }
        }
    })
    .state('items', {
        url: '/items',
        views: {
            '': { templateUrl: 'views/items.html', controller: 'itemsController' },
            'headerView@items': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    .state('item', {
        url: '/item/:itemid?',
        views: {
            '': { templateUrl: 'views/item.html', controller: 'itemController' },
            'headerView@item': { templateUrl: 'views/templates/header.temp.html' },
        }
    })
    ;
    $urlRouterProvider.otherwise('/login');
});
