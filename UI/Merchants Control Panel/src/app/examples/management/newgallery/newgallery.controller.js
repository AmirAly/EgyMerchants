﻿(function () {
    'use strict';
    angular
        .module('app.examples.management')
        .controller('newGalleryController', newGalleryController);

    /* @ngInject */
    function newGalleryController($timeout, $mdToast, $scope, Upload, $state, $stateParams) {
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
        $scope.gallery = {};

        vm.submit = submit;
        function submit(_form) {
            $.ajax({
                type: "post",
                url: "http://localhost:8007/Galleries",
                data: {
                    "Title": "Gallery samar shymaa",
                    "Description": "SH",
                    "DisplayPicture": "data:image/png;base64,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",
                    "FeaturedPhoto": "data:image/png;base64,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",
                    "Status": "Active",
                    "Store": "58e4d2a24d31101ac4c1a502"
                },
                headers: { 'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUeXBlIjoiTWVyY2hhbnQiLCJfaWQiOiI1OGUzOTdkN2NhZDY4YjE3NzhkMDkzODciLCJTdG9yZU5hbWUiOiJzaGF5bWFhX3NhZWVkIiwiaWF0IjoxNDkxMzEwNzkxLCJleHAiOjE0OTE0NTQ3OTF9.FQwjEUfg8iuede80g_KYQSiHpPa8ia381-DWQQVzU4o' },
                success: function (res) {
                    hello(res);
                },
                error: function (err) {
                    alert("error");
                    console.log(err);
                }
            });
            function hello(_res) {
                console.log(_res);
            }

            //angular.forEach($scope.formNewGallery.$error.required, function (field) {
            //    field.$setDirty();
            //});
            //if (_form.$valid) {
            //    if ($stateParams.StoreId == "") {
            //    Loader.show();
            //    var req = {
            //        method: 'post',
            //        url: '/Galleries',
            //        data: {
            //            Title: $scope.gallery.Name,
            //            Description: $scope.gallery.Description,

            //        }
            //    }
            //    console.log(req);
            //    API.execute(req, function (_res) {
            //        console.log(_res);
            //        if (_res.data.code == 100) {
            //            $scope.gallery = _res.data.data;
            //            $state.go('triangular.gallerymanagement');
            //        } 
            //    });
            //}
            //else {
            //    $scope.services = $rootScope.currentClinic.Services;
            //    Loader.show();
            //    var req = {
            //        method: 'put',
            //        url: '/Clinics',
            //        data: $rootScope.currentClinic
            //    }
            //    API.executeCashed(req, function (_res) {
            //        if (_res.data.code == 100 || _res == 500) {
            //            //$state.go('menu.clinicservices', { clinicId: $rootScope.currentClinic._id });
            //            $state.go('menu.listclinics');
            //        } else {
            //            var alertPopup = $ionicPopup.alert({
            //                title: 'Update clinics',
            //                template: _res.data.data
            //            });
            //        }
            //    }).finally(function () {
            //        Loader.hide();
            //    });
            //}
                
            //}
        };

        // create blank user variable for newGallery form
        vm.gallery = {
            name: '',
            description: ''
        };

    }
})();