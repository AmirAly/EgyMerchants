app.controller("storeController", function ($scope, $rootScope, $timeout, API) {

    $scope.init = function (_isoCode, _storeId) {
        $rootScope.IsoCode = _isoCode;
        $scope.storeId = _storeId;


        $scope.isRatedBefore = false;// get users array and check me

        //prepare social plugins

        $rootScope.Contacts = [{ Label: 'The Address', Value: 'End of Al-ashraf st., El Imam tower, Tanta, Egypt.' },
        { Label: 'The Phone', Value: '+2 (012) 111 11111' },
        { Label: 'The Mobile', Value: '+2 (012) 222 22222' },
        { Label: 'The Fax', Value: '+2 (012) 333 33333' }
        ]

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




    var ratings = document.getElementsByClassName('rating');
    for (var i = 0; i < ratings.length; i++) {
        var r = new SimpleStarRating(ratings[i]);
        ratings[i].addEventListener('rate', function (e) {
            $scope.isRatedBefore = true;
            console.log('Rating: ' + e.detail);

            var req = {
                method: 'put',
                url: '/User/AddRating',
                data: {
                    _userId: $rootScope.userId,
                    _storeId: $scope.storeId,
                    _value: e.detail
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


        });
    }





    //set new rate
    //$scope.rateFunction = function (rating) {
    //    console.log('Rating selected: ' + rating);
    //};

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