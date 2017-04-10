
(function () {
    'use strict';
    angular
        .module('app.examples.management')
        .controller('galleryManagementController', galleryManagementController);

    /* @ngInject */

    function galleryManagementController($state, $scope, $rootScope, API) {
        var vm = this;

        vm.contents = [];
        $scope.load = function () {
            //fill store data 

            var req = {
                method: 'get',
                url: '/Store/' + '58e6241880cc8e168039fd52',
                data: {}
            }
            API.execute(req, function (_res) {
                if (_res.data.code == 100) {
                    console.log(_res.data.data);
                    $scope.storeName = _res.data.data.StoreName;
                    $scope.storeCategory = _res.data.data.Category;
                } else {
                    console.log('no data found');
                }
            });

            // fill table
            vm.contents = [];

            var req = {
                method: 'get',
                url: '/StoreGalleries/' + '58e6241880cc8e168039fd52',
                data: {}
            }
            API.execute(req, function (_res) {
                if (_res.data.code == 100) {
                    var result = _res.data.data;
                    console.log(_res.data.data);
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

                } else {
                    console.log('no data found');
                }
            });
        }
        $scope.load();

        //////reload
        $scope.reload = function () {
            $scope.contents = [];
            var req = {
                method: 'get',
                url: '/StoreGalleries/' + '58e6241880cc8e168039fd52',
                data: {}
            }
            API.execute(req, function (_res) {
                if (_res.data.code == 100) {
                    var result = _res.data.data;
                    console.log(_res.data.data);
                    for (var i = 0; i < result.length; i++) {
                        var obj = {};
                        obj.thumb = result[i].DisplayPicture;
                        obj.name = result[i].Title;
                        obj.description = result[i].Description;
                        obj._id = result[i]._id;
                        vm.contents.push(obj);
                    }
                    $scope.refresh(true);
                }
            });
        };

        $scope.editableTble = true;
        $scope.deleteableTble = true;
        $scope.listItems = true;

        $scope.edit = function (_content) {
            console.log(_content);
            $rootScope.galleryData = _content;
            $state.go('triangular.newgallery', { galleryid: _content._id });
        };

        $scope.delete = function (_content) {
            console.log(_content);
            var req = {
                method: 'put',
                url: '/Galleries/Disable/' + _content._id,
                data: {}
            }
            API.execute(req, function (_res) {
                if (_res.data.code == 100) {
                    console.log(_res.data.data);
                    $scope.reload();
                }
                else {
                    console.log('no data found');
                }
            });

            //$.ajax({
            //    type: "put",
            //    url: "http://localhost:8007/Galleries/Disable/" + _content._id,
            //    data: {},
            //    headers: { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiU3RvcmUiLCJfaWQiOiI1OGU5ZjZmMDEwZWNlZjE1NDhkYzYzYjUiLCJTdG9yZU5hbWUiOiJTSDFfU3RvcmUiLCJpYXQiOjE0OTE3MjgxNjQsImV4cCI6MTQ5MTg3MjE2NH0.RZ1mrsuZI63-NBKc5GqketQPLS0OR47FS42SchTBkTg' },
            //    success: function (res) {
            //        if (res.code == 100) {
            //            var result = res.data;
            //            console.log(result);
            //            console.log('load');
            //            $scope.reload();
            //        }
            //        else {
            //            console.log('no data found');
            //        }
            //    },
            //    error: function (err) {
            //        console.log(err);
            //    }
            //});
        };

        vm.addGallery = addGallery;
        function addGallery() {
            $rootScope.galleryData = '';
            $state.go('triangular.newgallery', { galleryid: '' });
        };

        $scope.listItem = function (_id) {
            $state.go('triangular.listitems', { galleryid: _id });
        };

    }
})();
