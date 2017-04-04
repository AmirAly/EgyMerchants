(function () {
    'use strict';
    angular
        .module('app.examples.management')
        .controller('newGalleryController', newGalleryController);

    /* @ngInject */
    function newGalleryController($timeout, $mdToast, $scope, Upload, $state) {
        var vm = this;
        vm.status = 'idle';  // idle | uploading | complete
        vm.upload = upload;

        var fileList;
        /////////////////

        function upload($files) {
            console.log($files);
            if ($files !== null && $files.length > 0) {

                fileList = $files;
                uploadStarted();
                $timeout(uploadComplete, 4000);
            }
        }

        function uploadStarted() {
            vm.status = 'uploading';
        }

        function uploadComplete() {
            vm.status = 'complete';
            var message = 'Thanks for ';
            for (var file in fileList) {
                message += fileList[file].name + ' ';
                console.log(fileList);


                var f = fileList[file],
                r = new FileReader();
                r.onloadend = function (e) {
                    var data = e.target.result;
                    console.log(data);
                    $('#img').attr('src', data);
                    //send your binary data via $http or $resource or do anything else with it
                }
                r.readAsBinaryString(f);
            }
            $mdToast.show({
                template: '<md-toast><span flex>' + message + '</span></md-toast>',
                position: 'bottom right',
                hideDelay: 5000
            });

            $timeout(uploadReset, 3000);

         
           
        }

        function uploadReset() {
            vm.status = 'idle';
        }

        $scope.submit = function (_form) {
            angular.forEach($scope.formNewGallery.$error.required, function (field) {
                field.$setDirty();
            });
            if (_form.$valid) {
                $state.go('triangular.gallerymanagement');
            }
        };

        // create blank user variable for newGallery form
        vm.gallery = {
            name: '',
            description: ''
        };

    }
})();