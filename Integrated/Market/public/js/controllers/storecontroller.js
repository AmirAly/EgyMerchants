app.controller("storeController", function ($scope, $rootScope, $timeout, API, $filter) {

    $scope.init = function (_isoCode, _storeId) {
        $rootScope.IsoCode = _isoCode;
        localStorage.setItem('IsoCode', _isoCode);
        $scope.storeId = _storeId;

        if (window.storeJson.length > 0) {
            $scope.storeJson = JSON.parse(window.storeJson);
            $rootScope.Contacts = $scope.storeJson.Contacts;

            if ($scope.storeJson.Rate.length > 0) {
                $scope.exist = $filter('filter')($scope.storeJson.Rate, { User: $rootScope.userId })[0];
                if (!$rootScope.activeUser) {
                    $scope.isRatedBefore = true;
                    $scope.RateValue = ", You have to active your account first to rate a store";
                    $("#input-id").rating({ step: 0.1 });
                    $('#input-id').rating('update', $scope.storeJson.Average);
                    $('#input-id').rating('refresh', { disabled: true, showClear: false, showCaption: true });

                    $('#input-id').on('rating.change', function (event, value, caption) {
                        $scope.addRate(value);
                    });
                }
                else if ($scope.exist && $rootScope.activeUser) {
                    $scope.isRatedBefore = true;
                    if ($rootScope.loggedUser && $rootScope.activeUser) {
                        $scope.RateValue = ", You rated this store with " + $scope.exist.Value;
                    } else {
                        $scope.RateValue = ", You have to log in first to rate a store";
                    }

                    $("#input-id").rating({ step: 0.1 });
                    $('#input-id').rating('update', $scope.storeJson.Average);
                    $('#input-id').rating('refresh', { disabled: true, showClear: false, showCaption: true });

                    $('#input-id').on('rating.change', function (event, value, caption) {
                        $scope.addRate(value);
                    });
                }
                else {
                    $scope.isRatedBefore = false; // allow rate
                    $("#input-id").rating({ step: 1 });
                    $('#input-id').rating('update', $scope.storeJson.Average);
                    $('#input-id').rating('refresh', { disabled: false, showClear: false, showCaption: true });

                    $('#input-id').on('rating.change', function (event, value, caption) {
                        $scope.addRate(value);
                    });
                }
            }
            else {
                $scope.isRatedBefore = false; // get users array and check me
                $("#input-id").rating({ step: 1 });
                $('#input-id').rating('update', $scope.storeJson.Average);
                $('#input-id').rating('refresh', { disabled: false, showClear: false, showCaption: true });

                $('#input-id').on('rating.change', function (event, value, caption) {
                    $scope.addRate(value);
                });
            }

            jQuery(function ($) {
                //prepare social plugins
                if ($scope.storeJson.Contacts.length > 0) {
                    $rootScope.FacebookLink = $scope.storeJson.Contacts[0].Value;
                    $rootScope.TwitterLink = $scope.storeJson.Contacts[1].Value;

                } else {
                    $rootScope.FacebookLink = '';
                    $rootScope.TwitterLink = '';
                }
                "use strict";
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
        if ($rootScope.loggedUser) {
            $scope.visitedList = JSON.parse(localStorage.getItem('userObject')).VisitedStores;
            if ($scope.visitedList && $scope.visitedList.indexOf(_storeId) !== -1) {
                $scope.message = 'artNr  visited!';
                $scope.isVisited = true;
            }
            else {
                $scope.message = 'artNr Not visited!';
                $scope.isVisited = false;
                //call to add to visited
                $scope.addToVisited(_storeId);
            }
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
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                location.reload(true);
            } else {
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
            if (_res.data.code == 100) {
                localStorage.setItem('userObject', JSON.stringify(_res.data.data));
            }

        });
    }

});