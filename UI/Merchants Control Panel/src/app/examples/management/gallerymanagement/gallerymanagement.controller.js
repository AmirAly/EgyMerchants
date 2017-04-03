(function() {
    'use strict';
    angular
        .module('app.examples.management')
        .controller('galleryManagementController', galleryManagementController);

    /* @ngInject */
    function galleryManagementController() {
        var vm = this;
        vm.columns = [{
            title: '',
            field: 'thumb',
            sortable: false,
            filter: 'tableImage'
        },{
            title: 'Name',
            field: 'name',
            sortable: true
        }, {
            title: 'Description',
            field: 'description',
            sortable: true
        },{
            title: '',
            field: 'editButton',
            sortable: false,
            filter: 'tableEditButton'
        
        }, {
            title: '',
            field: 'deleteButton',
            sortable: false,
            filter: 'tableDeleteButton'

        }];

        vm.contents = [{
            thumb:'assets/images/img/chair.jpg',
            name: 'Furniture',
            description: 'Classic Furniture',
            editButton: 'editGallery(1)',
            deleteButton:'vm.deleteGallery()'
        },{
            thumb: 'assets/images/img/Shoes.jpg',
            name: 'Shoes',
            description: 'Shoes For Girls',
            editButton: 'vm.editGallery(2)',
            deleteButton: 'vm.deleteGallery()'
        },{
            thumb:'assets/images/img/carpet.jpg',
            name: 'carpets',
            description: 'Classic carpet',
            editButton: 'vm.editGallery(3)',
            deleteButton: 'vm.deleteGallery()'
        },{
            thumb:'assets/images/img/clothes.png',
            name: 'Clothes',
            description: 'Clothes',
            editButton: 'vm.editGallery(4)',
            deleteButton: 'vm.deleteGallery()'
       
        }];
        vm.editGallery = editGallery;
        function editGallery(_id) {
            alert(_id);
        }
        vm.deleteGallery = deleteGallery;
        function deleteGallery() {
            alert('enter');
        }
    }
})();