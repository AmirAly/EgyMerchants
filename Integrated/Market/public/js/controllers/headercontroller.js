﻿app.controller("headerController", function ($scope, $rootScope, $timeout, API, socket) {
    $scope.expoHref = localStorage.getItem("expohref");
    $scope.load = function () {
        $scope.showFavorites = false;
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


    $scope.showNotificationsCounter = false;
    $scope.getUnreadNotifications = function () {
        $rootScope.loading = true;
        var req = {
            method: 'get',
            url: '/Notification/GetUnRead/' + $rootScope.userId,
            data: {}
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                $rootScope.loading = false;
                if (_res.data.data.unread) {
                    $scope.nonificationsCounter = _res.data.data.Count;
                    $scope.showNotificationsCounter = true;
                }
                else {
                    $scope.nonificationsCounter = 0;
                    $scope.showNotificationsCounter = false;
                }
            } else {
                $rootScope.loading = false;
                console.log('err');
            }
        });
    }
    $scope.getUnreadNotifications();

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
                    $rootScope.userId = _res.data.data._id;
                    localStorage.setItem('userObject', JSON.stringify(_res.data.data));
                    console.log(_res.data.data);
                    $scope.dismiss();
                    //$rootScope.addUserToSockets();
                    window.location.reload();
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
        $scope.registerObj.ProfilePicture = "data:image/jpeg;base64,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";
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
                    $rootScope.userId = _res.data.data._id;
                    localStorage.setItem('userObject', JSON.stringify(_res.data.data));
                    $scope.dismiss();
                    //$rootScope.addUserToSockets();
                    window.location.reload();
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

    $scope.getFavorites = function () {
        if ($scope.showFavorites) {
            $scope.showFavorites = false;
        } else {
            // fill listFavourites
            $rootScope.loading = true;
            var req = {
                method: 'get',
                url: '/GetFavourites/' + $rootScope.userId,
                data: {}
            }
            API.execute(req).then(function (_res) {
                console.log(_res);
                if (_res.data.code == 100) {
                    $rootScope.loading = false;
                    console.log('get fav');
                    $scope.listFavourites = _res.data.data.FavouriteItems;

                } else {
                    $rootScope.loading = false;
                    console.log('err');
                }
                $scope.showFavorites = true;
            });
        }
    }

    $scope.removeFromFavorites = function (_itemId) {
        $rootScope.loading = true;
        $scope.favData = {};
        $scope.favData._userid = $rootScope.userId;
        $scope.favData._itemid = _itemId;

        var req = {
            method: 'put',
            url: '/User/RemoveFromFavourites',
            data: $scope.favData
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                //$rootScope.loading = false;
                $scope.IsFav = true;
                console.log('removed fav');
                localStorage.setItem('userObject', JSON.stringify(_res.data.data));
                window.location.reload();

            } else {
                $rootScope.loading = false;
                $scope.IsFav = false;
                console.log('not removed fav');
            }

        });
    }

    $scope.redirectToItem = function (_name, _id) {
        window.location.href = '/' + $rootScope.IsoCode + '/Product/' + _name + '/' + _id;
    }

    // Socket listeners
    // ================
    function addUser() {
        if ($rootScope.userObject) {
            console.log('enter ' + $rootScope.userObject._id);
            socket.emit('adduser', $rootScope.userObject._id);
        }
    }
    $timeout(function () {
        addUser();
    }, 5000);

    socket.on('newmsg', function (_data) {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");

        // Add the "show" class to DIV
        x.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

        //$scope.$apply();

    });

});