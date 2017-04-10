
(function () {
    'use strict';
    angular
        .module('app.examples.management')
        .controller('listitemsController', listitemsController);

    /* @ngInject */

    function listitemsController($state, $scope, $rootScope, $stateParams, API) {
        var vm = this;

        vm.contents = [];
        $scope.editableTble = false;
        $scope.deleteableTble = false;
        $scope.listItems = false;
        $scope.load = function () {
            //fill store data 

            var req = {
                method: 'get',
                url: '/Items/' + $stateParams.galleryid,
                data: {}
            }
            API.execute(req, function (_res) {
                console.log(_res);
                if (_res.data.code == 100) {
                    for (var i = 0 ; i < _res.data.data.length ; i++) {
                        if (_res.data.data[i].Pictures && _res.data.data[i].Pictures[0])
                            vm.contents.push({
                                thumb: _res.data.data[i].Pictures[0].URL,
                                name: _res.data.data[i].Name,
                                description: _res.data.data[i].Description
                            }
                                );
                        else
                            vm.contents.push({
                                thumb: '',
                                name: _res.data.data[i].Name,
                                description: _res.data.data[i].Description
                            }
                                );
                    }
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


                }
                else {
                    console.log('no data found');
                }
            });
        };
        $scope.load();

        vm.addItem = addItem;
        function addItem() {
            console.log($stateParams.galleryid);
            $rootScope.galleryData = $stateParams.galleryid;
            $state.go('triangular.items');
        };
    };
})();
