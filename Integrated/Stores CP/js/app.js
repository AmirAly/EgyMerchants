var app = angular.module("app", ['ui.router', 'ui.bootstrap.datetimepicker', 'ngAnimate', 'ui.dateTimeInput', 'uiSwitch']);

app.run(function ($rootScope, $state, slidePush, $timeout, $location) {
    $rootScope.logout = function () {
        //confirm('Are you sure you want to logout ?', function () {
        //    // if menu opened , close it first before  logout
        //    console.log('am sure');
        //    slidePush.pushForceClose(angular.element(document.querySelector('#menu')), angular.element(document.querySelector('#menuIcon')));
        //    $rootScope.currentUser = '';
            $state.go('login');
        //});
    };
    $rootScope.DeleteConfirmed = false;

    // when userType is undefined ,redirect to login 
    $rootScope.$watch('$root.currentUser', function () {
        $timeout(function () {
            if (typeof $rootScope.currentUser === 'undefined') {
                $location.path("/login");
            }
        }, 1000);

    });
});