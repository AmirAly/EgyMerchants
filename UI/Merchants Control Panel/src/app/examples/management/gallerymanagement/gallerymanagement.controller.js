
(function () {
    'use strict';
    angular
        .module('app.examples.management')
        .controller('galleryManagementController', galleryManagementController);

    /* @ngInject */

    function galleryManagementController($state, $scope, $rootScope) {
        var vm = this;
        
        vm.contents = [];
        $scope.load = function () {
            console.log('dd');
            //fill store data 
            $.ajax({
                type: "get",
                url: "http://localhost:8007/Store/" + '58e6241880cc8e168039fd52',
                data: {},
                headers: { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiU3RvcmUiLCJfaWQiOiI1OGU2MjQxODgwY2M4ZTE2ODAzOWZkNTIiLCJTdG9yZU5hbWUiOiJRYW1hciIsImlhdCI6MTQ5MTQ3NzU1MCwiZXhwIjoxNDkxNjIxNTUwfQ.E97vAGtaIrZC8AsdefN29meeC4f2HOuVMDWqPs7t8rc' },
                success: function (res) {
                    if (res.code == 100) {
                        var result = res.data;
                        console.log(result);
                        $scope.storeName = result.StoreName;
                        $scope.storeCategory = result.Category;
                        $scope.$apply();

                    }
                    else {
                        console.log('no data found');
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });

            // fill table
            vm.contents = [];
            $.ajax({
                type: "get",
                url: "http://localhost:8007/StoreGalleries/" + '58e6241880cc8e168039fd52',
                data: {},
                headers: { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiU3RvcmUiLCJfaWQiOiI1OGU2MjQxODgwY2M4ZTE2ODAzOWZkNTIiLCJTdG9yZU5hbWUiOiJRYW1hciIsImlhdCI6MTQ5MTQ3NzU1MCwiZXhwIjoxNDkxNjIxNTUwfQ.E97vAGtaIrZC8AsdefN29meeC4f2HOuVMDWqPs7t8rc' },
                success: function (res) {
                    if (res.code == 100) {
                        var result = res.data;
                        for (var i = 0; i < result.length; i++) {
                            var obj = {};
                            obj.thumb = result[i].DisplayPicture;
                            obj.name = result[i].Title;
                            obj.description = result[i].Description;
                            obj._id = result[i]._id;
                            vm.contents.push(obj);
                        }
                        console.log(vm.contents);
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
                        $scope.$apply();

                    }
                    else {
                        console.log('no data found');
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
          

        }
        $scope.load();
       
        $scope.editableTble = true;
        $scope.deleteableTble = false;

        $scope.edit = function (_content) {
            console.log(_content);
            $rootScope.galleryData = _content;
            $state.go('triangular.newgallery', { galleryid: _content._id });
            //$.ajax({
            //    type: "put",
            //    url: "http://localhost:8007/Galleries",
            //    data: {},
            //    headers: { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiU3RvcmUiLCJfaWQiOiI1OGU0ZDJhMjRkMzExMDFhYzRjMWE1MDIiLCJTdG9yZU5hbWUiOiJRYW1hciIsImlhdCI6MTQ5MTQ3MzYzOCwiZXhwIjoxNDkxNjE3NjM4fQ.wu-7VYT0J6nGpK-EmI-aoI5RVJR8qgtf3_x3txeZnro' },
            //    success: function (res) {
            //        if (res.code == 100) {
            //            var result = res.data;
            //            console.log(result);
            //            $scope.storeName = result.StoreName;
            //            $scope.storeCategory = result.Category;
            //            $scope.$apply();

            //        }
            //        else {
            //            console.log('no data found');
            //        }
            //    },
            //    error: function (err) {
            //        console.log(err);
            //    }
            //});
            //$scope.$apply();
        }
        $scope.delete = function (_content) {
            console.log(_content);
        }


        vm.addGallery = addGallery;
        function addGallery() {
            $rootScope.galleryData = '';
            $state.go('triangular.newgallery', {galleryid :''});
        };
        
    }
})();
