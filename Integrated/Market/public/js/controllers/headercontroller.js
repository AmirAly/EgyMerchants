app.controller("headerController", function ($scope, $rootScope, $timeout, API) {
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

        // get all countries
        $scope.allCountriesGeneralList = JSON.parse(localStorage.getItem('allCountries'));
<<<<<<< HEAD
        $scope.selectedCountry = JSON.parse(localStorage.getItem('selectedCountry'));
=======
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813

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
                    $rootScope.loggedUser = true;
                    $rootScope.userName = _res.data.data.Name;
                    localStorage.setItem('userObject', JSON.stringify(_res.data.data));
                    $scope.dismiss();

                } else {
                    $scope.dataLoading = false;
                    $scope.afterLoginError = _res.data.data;
                    $rootScope.loggedUser = false;
                    //localStorage.setItem('userObject', '');
                }

            });
        }
    }

    $scope.afterRegisterError = "";
    $scope.registerObj = {};
    $scope.submitRegister = function (form) {
        $scope.afterRegisterError = "";
        if (form.$valid) {
            // call loader , Register , hide modal & add user name
            $scope.dataLoading = true;
            var req = {
                method: 'post',
                url: '/User/Register',
                data: $scope.registerObj
            }
            API.execute(req).then(function (_res) {
                if (_res.data.code == 100) {
                    $scope.dataLoading = false;
                    $scope.frmRegister.$setPristine();
                    $scope.frmRegister.$setUntouched();
                    $scope.registerObj = {};
                    $rootScope.loggedUser = true;
                    $rootScope.userName = _res.data.data.Name;
                    localStorage.setItem('userObject', JSON.stringify(_res.data.data));
                    $scope.dismiss();
                } else {
                    $scope.dataLoading = false;
                    $scope.afterRegisterError = _res.data.data;
                    $rootScope.loggedUser = false;
                    //localStorage.setItem('userObject', '');
                }
            });
        }
    }

    $scope.logout = function () {
        localStorage.clear();
<<<<<<< HEAD
        window.location.href = "/" + $rootScope.IsoCode + "/Home";
=======
        window.location.href = "/eg/Home";
       

>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
    }

    $scope.txtSearch = '';
    $scope.search = function () {
        if ($scope.txtSearch != '') {
<<<<<<< HEAD
            window.location.href = "/" + $rootScope.IsoCode + "/Search/" + $scope.txtSearch;
=======
            window.location.href = "/EG/Search/" + $scope.txtSearch;
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
        }
    }
});