
var egm = angular.module('egm', ['ui.sortable']);

egm.run(function ($rootScope, API) {
    $rootScope.currentUser = localStorage.getItem('StoreId');
    $rootScope.currentName = localStorage.getItem('StoreName');

    $rootScope.$watch('currentUser', function () {
        if ($rootScope.currentUser != "" && $rootScope.currentUser != null) {
            $rootScope.getAdminNotifications();
        }
    });

    $rootScope.getAdminNotifications = function () {
        var req = {
            method: 'get',
            url: '/Store/GetAdminNotifications/' + $rootScope.currentUser,
            data: {}
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                //// open modal
                if (_res.data.data.AdminNotifications.length > 0) {
                    $rootScope.adminNotificationsData = _res.data.data.AdminNotifications;
                    $("#modalAdminNotifications").modal("show");
                }

            }
        });
    }

    $rootScope.readNotifications = function () {
        var req = {
            method: 'put',
            url: '/Store/SetAdminNotifications',
            data: { _id: $rootScope.currentUser, _notifications: $rootScope.adminNotificationsData }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                //// close modal
                $("#modalAdminNotifications").modal("hide");
            }
        });
    }

});
