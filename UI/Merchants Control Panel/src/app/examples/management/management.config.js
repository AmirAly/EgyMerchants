(function() {
    'use strict';

    angular
        .module('app.examples.management')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.gallerymanagement', {
            url: '/management/gallerymanagement',
            templateUrl: 'app/examples/management/gallerymanagement/gallerymanagement.tmpl.html',
            controller: 'galleryManagementController',
            controllerAs:'vm',
            data: {
                layout: {
                    contentClass: 'layout-column',
                    sideMenuSize: 'icon'

                }
            }
        })
        .state('triangular.newgallery', {
            url: '/management/newgallery/:galleryid?',
            templateUrl: 'app/examples/management/newgallery/newgallery.tmpl.html',
            controller: 'newGalleryController',
            controllerAs: 'vm',
            data: {
                layout: {
                    contentClass: 'layout-column',
                    sideMenuSize: 'icon'

                }
            }
        })
        ;

        triMenuProvider.addMenu({
            name: 'Galleries',
            icon: 'zmdi zmdi-view-list-alt',
            type: 'dropdown',
            priority: 8.1,
            children: [{
                name: 'Galleries Management',
                state: 'triangular.gallerymanagement',
                type: 'link'
            }
            ,
            {
                name: 'New Gallery',
                state: 'triangular.newgallery',
                type: 'link'
            }]
        });
    }
})();
