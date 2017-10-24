﻿app.controller("notificationsController", function ($scope, $rootScope, $timeout, API) {

    $scope.init = function (_isoCode) {
        //console.log('enter');
        $rootScope.IsoCode = _isoCode;
        localStorage.setItem('IsoCode', _isoCode);
    }

    $scope.moreNotifications = true;
    $scope.notifications = [];
    var page = 1;

    $scope.getMore = function () {
        var req = {
            method: 'get',
            url: '/Notification/SeeMore/' + $rootScope.userId + '/' + page,
            data: {}
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                //console.log(_res.data.data);
                for (var i = 0; i < _res.data.data.length; i++) {
                    $scope.notifications.push(_res.data.data[i]);
                }
                //console.log($scope.notifications);
                if (_res.data.data.length == 0) {
                    $scope.moreNotifications = false;
                }
                else {
                    page++;
                }
            }
            else {
                //console.log(_res);
            }
        });
    }

});