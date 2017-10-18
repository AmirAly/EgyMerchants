app.controller("storeController", function ($scope, $rootScope, $timeout, API, $filter) {

    $scope.init = function (_isoCode, _storeId) {
        $rootScope.IsoCode = _isoCode;
        $scope.storeId = _storeId;

        if (window.storeJson.length > 0) {
            $scope.storeJson = JSON.parse(window.storeJson);
            console.log($scope.storeJson);
            $rootScope.Contacts = $scope.storeJson.Contacts;

            if ($scope.storeJson.Rate.length > 0) {
                $scope.exist = $filter('filter')($scope.storeJson.Rate, { User: $rootScope.userId })[0];
                if ($scope.exist) {
                    $scope.isRatedBefore = true;
                    console.log($scope.isRatedBefore);
                    $scope.RateValue = ", You rated this store with " + $scope.exist.Value;

                    $("#input-id").rating({ step: 0.1 });
                    $('#input-id').rating('update', $scope.storeJson.Average);
                    $('#input-id').rating('refresh', { disabled: true, showClear: false, showCaption: true });

                    $('#input-id').on('rating.change', function (event, value, caption) {
                        console.log(value);
                        console.log(caption);
                        $scope.addRate(value);
                    });
                }
                else {
                    $scope.isRatedBefore = false; // allow rate
                    console.log($scope.isRatedBefore);
                    $("#input-id").rating({ step: 1 });
                    $('#input-id').rating('update', $scope.storeJson.Average);
                    $('#input-id').rating('refresh', { disabled: false, showClear: false, showCaption: true });

                    $('#input-id').on('rating.change', function (event, value, caption) {
                        console.log(value);
                        console.log(caption);
                        $scope.addRate(value);
                    });
                }
            }
            else {
                $scope.isRatedBefore = false; // get users array and check me
                console.log($scope.isRatedBefore);
                $("#input-id").rating({ step: 1 });
                $('#input-id').rating('update', $scope.storeJson.Average);
                $('#input-id').rating('refresh', { disabled: false, showClear: false, showCaption: true });

                $('#input-id').on('rating.change', function (event, value, caption) {
                    console.log(value);
                    console.log(caption);
                    $scope.addRate(value);
                });
            }
            //prepare social plugins
            if ($scope.storeJson.Contacts.length > 0) {
                $rootScope.FacebookLink = $scope.storeJson.Contacts[0].Value;
                $rootScope.TwitterLink = $scope.storeJson.Contacts[1].Value;
            }
            jQuery(function ($) {
                "use strict";
                $rootScope.TwitterLink = "https://twitter.com/TwitterVideo";
                $rootScope.FacebookLink = "https://www.facebook.com/Skype/";

                $('.twitter-timeline').attr('href', $rootScope.TwitterLink);
                $('.fb-like-box').attr('data-href', $rootScope.FacebookLink);

                (function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_EN/all.js#xfbml=1&appId=469510423153590";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));



                var socialItems = $('.social-widgets .items .item');
                var counter = 0;
                socialItems.each(function () {
                    counter++;
                    var itemclass = "item-0" + counter;
                    $(this).addClass(itemclass)
                });


                var loadmap = $(".social-widgets .item a");
                loadmap.click(function (e) {
                    e.preventDefault()
                });
                loadmap.hover(function (e) {
                    if (!$(this).parent().hasClass("load")) {
                        var loadcontainer = $(this).parent().find(".loading");
                        $.ajax({
                            url: $(this).attr("href"),
                            cache: false,
                            success: function (data) {
                                setTimeout(function () {
                                    //loadcontainer.html(data)
                                }, 1000)
                            }
                        });
                        $(this).parent().addClass("load")
                    }
                });


                $(".social-widgets .item").each(function () {
                    var $this = $(this),
                    timer;
                    $this.on("mouseenter", function () {
                        var $this = $(this);
                        if (timer) clearTimeout(timer);
                        timer = setTimeout(function () {
                            $this.addClass("active")
                        }, 200)
                    }).on("mouseleave", function () {
                        var $this = $(this);
                        if (timer) clearTimeout(timer);
                        timer = setTimeout(function () {
                            $this.removeClass("active")
                        }, 100)
                    }).on("click", function (e) {
                        e.preventDefault()
                    })
                });


            });
        }
        else {
            $scope.storeJson = [];
        }

        if (window.GalleriesJson.length > 0) {
            $scope.GalleriesJson = JSON.parse(window.GalleriesJson);
        }
        else {
            $scope.GalleriesJson = [];
        }
        $scope.GalleriesLst = [];
        for (var i = 0; i < $scope.GalleriesJson.length; i++) {
            var result = ($scope.GalleriesJson[i].Gallery).split(',')[1].split(':')[1].slice(2, -1);
            $scope.GalleriesJson[i].Gallery = result;
        }
        $scope.GalleriesLst = $scope.GalleriesJson;
        console.log($scope.GalleriesLst);
        if ($rootScope.loggedUser) {
            $scope.visitedList = JSON.parse(localStorage.getItem('userObject')).VisitedStores;
            console.log($scope.visitedList);
            if ($scope.visitedList.indexOf(_storeId) !== -1) {
                $scope.message = 'artNr  visited!';
                $scope.isVisited = true;
            }
            else {
                $scope.message = 'artNr Not visited!';
                $scope.isVisited = false;
                //call to add to visited
                $scope.addToVisited(_storeId);
            }
            console.log($scope.message);
        }
    }


    $scope.addRate = function (_val) {
        var req = {
            method: 'put',
            url: '/User/AddRating',
            data: {
                _userId: $rootScope.userId,
                _storeId: $scope.storeId,
                _value: _val
            }
        }
        console.log(req);
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                console.log('rate added');
                location.reload(true);
            } else {
                console.log('rate NOT added');
            }

        });
    }


    $scope.addToVisited = function (_storeId) {
        $scope.storeData = {};
        $scope.storeData._userid = $rootScope.userId;
        $scope.storeData._storeid = _storeId;

        var req = {
            method: 'put',
            url: '/User/AddToVisited',
            data: $scope.storeData
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                console.log('visit added');
                localStorage.setItem('userObject', JSON.stringify(_res.data.data));
            } else {
                console.log('visit NOT added');
            }

        });
    }

});