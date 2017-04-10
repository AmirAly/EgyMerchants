
(function () {
    'use strict';
    angular
        .module('app.examples.management')
        .controller('listitemsController', listitemsController);

    /* @ngInject */

    function listitemsController($state, $scope, $rootScope, $stateParams) {
        var vm = this;

        vm.contents = [];
        $scope.load = function () {
            console.log('enter');
            //fill store data 
            $.ajax({
                type: "get",
                url: "http://localhost:8007/Items/" + $stateParams.galleryid,
                data: {},
                headers: { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiU3RvcmUiLCJfaWQiOiI1OGU5ZjZmMDEwZWNlZjE1NDhkYzYzYjUiLCJTdG9yZU5hbWUiOiJTSDFfU3RvcmUiLCJpYXQiOjE0OTE4MjA3MTgsImV4cCI6MTQ5MTk2NDcxOH0.6m89vWdME6oLGeqQ3Mhp_j_MSf2UquLCxiEcGa6GJ1w' },
                success: function (res) {
                    console.log(res);
                    if (res.code == 100) {
                        //$scope.items = res.data;
                        for (var i = 0; i < res.data.length; i++) {
                            $scope.contents.push({
                                _id: res.data[i]._id,
                                Name: res.data[i].Name,
                                Img: res.data[3].Pictures[0].URL
                            });
                        }
                        console.log($scope.items);
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
                url: "http://localhost:8007/Items/" + $stateParams.galleryid,
                data: {},
                headers: { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiU3RvcmUiLCJfaWQiOiI1OGU5ZjZmMDEwZWNlZjE1NDhkYzYzYjUiLCJTdG9yZU5hbWUiOiJTSDFfU3RvcmUiLCJpYXQiOjE0OTE3MjgxNjQsImV4cCI6MTQ5MTg3MjE2NH0.RZ1mrsuZI63-NBKc5GqketQPLS0OR47FS42SchTBkTg' },
                success: function (res) {
                    if (res.code == 100) {
                        var result = res.data;
                        for (var i = 0; i < res.data.length; i++) {


                            
                                var obj = {};
                                obj.thumb = res.data[3].Pictures[0].URL;
                                obj.name = res.data[i].Name;
                                obj.description = res.data[i].Description;
                                obj._id = res.data[i]._id;
                                vm.contents.push(obj);
                            
                            //$scope.contents.push({
                            //    _id: res.data[i]._id,
                            //    Name: res.data[i].Name,
                            //    Img: res.data[3].Pictures[0].URL
                            //});
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

        //////reload
        $scope.reload = function () {
            $scope.contents = [];
            $.ajax({
                type: "get",
                url: "http://localhost:8007/StoreGalleries/" + '58e6241880cc8e168039fd52',
                data: {},
                headers: { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiU3RvcmUiLCJfaWQiOiI1OGU5ZjZmMDEwZWNlZjE1NDhkYzYzYjUiLCJTdG9yZU5hbWUiOiJTSDFfU3RvcmUiLCJpYXQiOjE0OTE3MjgxNjQsImV4cCI6MTQ5MTg3MjE2NH0.RZ1mrsuZI63-NBKc5GqketQPLS0OR47FS42SchTBkTg' },
                success: function (res) {
                    if (res.code == 100) {
                        var result = res.data;
                        for (var i = 0; i < result.length; i++) {
                            var obj = {};
                            obj.thumb = result[i].DisplayPicture;
                            obj.name = result[i].Title;
                            obj.description = result[i].Description;
                            obj._id = result[i]._id;
                            $scope.contents.push(obj);
                        }
                        $scope.refresh(true);
                        console.log('reload');
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
            console.log(_content._id);
            $.ajax({
                type: "put",
                url: "http://localhost:8007/Galleries/Disable/" + _content._id,
                data: {},
                headers: { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiU3RvcmUiLCJfaWQiOiI1OGU5ZjZmMDEwZWNlZjE1NDhkYzYzYjUiLCJTdG9yZU5hbWUiOiJTSDFfU3RvcmUiLCJpYXQiOjE0OTE3MjgxNjQsImV4cCI6MTQ5MTg3MjE2NH0.RZ1mrsuZI63-NBKc5GqketQPLS0OR47FS42SchTBkTg' },
                success: function (res) {
                    if (res.code == 100) {
                        var result = res.data;
                        console.log(result);
                        console.log('load');
                        $scope.reload();
                    }
                    else {
                        console.log('no data found');
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        };

        vm.addGallery = addGallery;
        function addGallery() {
            $rootScope.galleryData = '';
            $state.go('triangular.newgallery', { galleryid: '' });
        };

    }
})();
