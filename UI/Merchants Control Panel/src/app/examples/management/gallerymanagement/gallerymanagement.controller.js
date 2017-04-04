
(function () {
    'use strict';
    angular
        .module('app.examples.management')
        .controller('galleryManagementController', galleryManagementController);

    /* @ngInject */

    function galleryManagementController($state, $scope, $rootScope) {
        var vm = this;
        vm.columns = [{
            title: '',
            field: 'thumb',
            sortable: false,
            filter: 'tableImage'
        }, {
            title: 'Gallery name',
            field: 'name',
            sortable: true
        }, {
            title: 'Description',
            field: 'description',
            sortable: true
        }];

        vm.contents = [{
            thumb: 'assets/images/img/chair.jpg',
            name: 'Furniture',
            description: 'Classic Furniture',
        }, {
            thumb: 'assets/images/img/Shoes.jpg',
            name: 'Shoes',
            description: 'Shoes For Girls',
        }, {
            thumb: 'assets/images/img/carpet.jpg',
            name: 'carpets',
            description: 'Classic carpet'
        }, {
            thumb: 'assets/images/img/clothes.png',
            name: 'Clothes',
            description: 'Clothes',

        }];
        $scope.editableTble = true;
        $scope.deleteableTble = true;
        $scope.edit = function (_content) {
            console.log(_content);
        }
        $scope.delete = function (_content) {
            console.log(_content);
        }


        vm.addGallery = addGallery;
        function addGallery() {
            $state.go('triangular.newgallery');
        };
        $rootScope.editGallery = function (_id) {
            alert(_id);
        };
        vm.deleteGallery = deleteGallery;
        function deleteGallery() {
            alert('enter');
        }
    }
})();
