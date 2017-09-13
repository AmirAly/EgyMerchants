﻿egm.controller("storeController", function ($scope, API) {

    $scope.editStore = function (_id, store, Featured, HasFactory, Verified) {
        $scope.storeId = _id;
        $scope.storeName = store;
        if (Verified == 'true')
            $scope.verified = true;
        else
            $scope.verified = false;
        if (HasFactory == 'true')
            $scope.hasFactory = true;
        else
            $scope.hasFactory = false;

        if (Featured == 'true')
            $scope.featured = true;
        else
            $scope.featured = false;
    };

    $scope.save = function () {
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Store/EditBadges',
            data: {
                _id: $scope.storeId,
                Verified: $scope.verified,
                HasFactory: $scope.hasFactory,
                Featured: $scope.featured
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                window.location.reload();
            } else {
                $scope.loading = false;
                if (_res.data.code == 21) {
                    $scope.errMsg = true;
                    $scope.errdiv = true;
                    $scope.errorMsg = _res.data.data;
                } else {
                    $scope.loading = false;
                    $scope.errMsg = true;
                    $scope.errdiv = true;
                    $scope.errorMsg = _res.data.data;
                }
            }
        });
    };

    $scope.signOut = function () {
        window.location.href = '/Home';
        localStorage.clear();
    };

    $scope.activateStore = function () {
        console.log('activateStore');
        console.log($scope.selectedStore);
        // store [] is enabled now 
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Store/active',
            data: {
                _id: $scope.selectedStore,
            }
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                window.location.reload();
            } else {
                $scope.loading = false;
                $scope.errMsg = true;
                $scope.errdiv = true;
                $scope.errorMsg = _res.data.data;
            }
        });
    }

    $scope.suspendStore = function () {
        console.log('suspendStore');
        console.log($scope.selectedStore);
        // store [] is suspended now 
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Store/suspend',
            data: {
                _id: $scope.selectedStore,
            }
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                window.location.reload();
            } else {
                $scope.loading = false;
                $scope.errMsg = true;
                $scope.errdiv = true;
                $scope.errorMsg = _res.data.data;
            }
        });
    }
});
