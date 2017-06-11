app.controller("headerController", function ($scope, $rootScope, $timeout) {

    new WOW({
        boxClass: 'wow',
        animateClass: 'animated'
    }).init();

    jQuery(function ($) {
        $(document).ready(function () {
            checkScrollTop();
            $(window).scroll(function () {
                checkScrollTop();
            });
            function checkScrollTop() {
                if ($(window).scrollTop() < 100) {
                    $('.header-wrapper').attr('style', 'position: static !important;'); // .removeClass('isScrolled');
                }
                else {
                    $('.header-wrapper').attr('style', 'position: fixed !important;').addClass('isScrolled');
                }
            }

        });
    });

    //$rootScope.$on('$stateChangeSuccess', function () {
    //    document.body.scrollTop = document.documentElement.scrollTop = 0;
    //});
    $scope.loginForm = true;
    $scope.afterLoginError = "";
    $scope.loginObj = {};
    $scope.submitLogin = function (form) {
        $scope.afterLoginError = "";
        if (form.$valid) {
            // call loader , login , hide modal & add user name
            $scope.dataLoading = true;
            console.log($scope.loginObj);
            $timeout(function () {
                $scope.dataLoading = false;
                $scope.frmLogin.$setPristine();
                $scope.frmLogin.$setUntouched();
                $scope.loginObj = {};
                $scope.dismiss();
            }, 500);
        }
    }

    $scope.afterRegisterError = "";
    $scope.registerObj = {};
    $scope.submitRegister = function (form) {
        $scope.afterRegisterError = "";
        if (form.$valid) {
            // call loader , Register , hide modal & add user name
            $scope.dataLoading = true;
            console.log($scope.registerObj);
            $timeout(function () {
                $scope.dataLoading = false;
                form.$setPristine();
                form.$setUntouched();
                $scope.registerObj = {};
                $scope.dismiss();
            }, 500);
        }
    }

    $scope.txtSearch = '';
    $scope.search = function () {
        if ($scope.txtSearch != '') {
            window.location.href = "/EG/Search/" + $scope.txtSearch;
        }
    }
});