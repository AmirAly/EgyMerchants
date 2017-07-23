app.controller("headerController", function ($scope, $rootScope, $timeout, API) {
    $scope.expoHref = localStorage.getItem("expohref");
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
                        $('.header-wrapper').attr('style', 'position: static !important;background-color: #2f3946 !important;'); // .removeClass('isScrolled');
                    }
                    else {
                        $('.header-wrapper').attr('style', 'position: fixed !important;background-color: rgba(47, 57, 70, 0.58) !important;').addClass('isScrolled');
                    }
                }

            });
        });

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        // get all countries
        $scope.allCountriesGeneralList = JSON.parse(localStorage.getItem('allCountries'));
        $scope.selectedCountry = JSON.parse(localStorage.getItem('selectedCountry'));

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
    $rootScope.IsoCode = localStorage.getItem('IsoCode');
    $scope.logout = function () {
        localStorage.clear();
        window.location.href = "/" + $rootScope.IsoCode + "/Home";
    }

    $scope.searchErr = false;
    $scope.txtSearch = '';
    $scope.search = function () {
        $scope.searchErr = false;
        if ($scope.txtSearch != '' && $scope.txtSearch.length > 1) {
            window.location.href = "/" + $rootScope.IsoCode + "/Search/" + $scope.txtSearch;
        }
        else {
            console.log('2 char min');
            $scope.searchErr = true;
        }
    }
});