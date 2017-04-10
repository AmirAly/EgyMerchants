
(function () {
    'use strict';
    angular
        .module('app.examples.management')
        .controller('listitemsController', listitemsController);

    /* @ngInject */

    function listitemsController($state, $scope, $rootScope, $stateParams, API) {
        var vm = this;

        vm.contents = [];
        $scope.load = function () {
            //fill store data 

            var req = {
                method: 'get',
                url: '/Items/' + $stateParams.galleryid,
                data: {}
            }
            API.execute(req, function (_res) {
                console.log(_res);
                if (res.data.code == 100) {
                    for (var i = 0 ; i <_res.data.data.length ; i++)
                    {
                        vm.contents.push({
                            thumb: _res.data.data[i].Pictures[0].URL,
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
                    $scope.$apply();
                }
                else {
                    console.log('no data found');
                }
            });
        };
    };
})();
