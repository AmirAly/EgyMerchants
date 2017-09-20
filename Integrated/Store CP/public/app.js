
var egm = angular.module('egm', ['ui.sortable']);

egm.run(function ($rootScope, API, $timeout) {
    $timeout(function () {
        $rootScope.adminNotificationsData = [{ title: 'dddddddddddd' }, { title: 'aaaaaaaaa' }, { title: 'bbbbbbbbb' }];
        $("#modalAdminNotifications").modal("show");
    }, 3000);


    $rootScope.currentUser = "";

    $rootScope.$watch('currentUser', function () {
        if ($rootScope.currentUser != "" || $rootScope.currentUser != null) {
            $rootScope.getAdminNotifications();
        }
    });

    $rootScope.getAdminNotifications = function () {
        //// call get admin notifications api //console.log($rootScope.userObject.adminNotifications);
        var req = {
            method: 'get',
            url: '/Store/adminNotification/' + $rootScope.currentUser,
            data: {}
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                //// open modal
                $rootScope.adminNotificationsData = _res.data.data;
                $("#modalAdminNotifications").modal("show");
            }
        });
    }

    $rootScope.readNotifications = function () {
        var req = {
            method: 'get',
            url: '/Store/readAdminNotifications/' + $rootScope.currentUser,
            data: {}
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                //// close modal
                $("#modalAdminNotifications").modal("hide");
            }
        });
    }

});
