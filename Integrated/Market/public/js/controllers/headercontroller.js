﻿app.controller("headerController", function ($scope, $rootScope, $timeout, API) {
    $scope.load = function () {

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

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

    }
    $scope.load();

    $scope.loginForm = true;
    $scope.afterLoginError = "";
    $scope.loginObj = {};
    $scope.submitLogin = function (form) {
        $scope.afterLoginError = "";
        if (form.$valid) {
            // call loader , login , hide modal & add user name
            $scope.dataLoading = true;
            console.log($scope.loginObj);

            var req = {
                method: 'post',
                url: '/User/Login',
                data: $scope.loginObj
            }
            API.execute(req).then(function (_res) {
                if (_res.data.code == 100) {
                    $scope.dataLoading = false;
                    $scope.frmLogin.$setPristine();
                    $scope.frmLogin.$setUntouched();
                    $scope.loginObj = {};
                    $scope.loggedUser = true;
                    $scope.userName = _res.data.data.Name;
                    $scope.dismiss();

                } else {
                    $scope.dataLoading = false;
                    $scope.afterLoginError = _res.data.data;

                }

            });
            //$timeout(function () {
            //    $scope.dataLoading = false;
            //    $scope.frmLogin.$setPristine();
            //    $scope.frmLogin.$setUntouched();
            //    $scope.loginObj = {};
            //    $scope.loggedUser = true;
            //    $scope.userName = "Samar";
            //    $scope.dismiss();
            //}, 500);
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
                $scope.loggedUser = true;
                $scope.userName = "Samar";
                $scope.dismiss();
            }, 500);
        }
    }

    $scope.logout = function () {
        window.location.href = "/eg/Home";
    }

    $scope.txtSearch = '';
    $scope.search = function () {
        if ($scope.txtSearch != '') {
            window.location.href = "/EG/Search/" + $scope.txtSearch;
        }
    }
});