app.controller("expoController", function ($scope, $rootScope, $timeout, $filter, API, $cookies) {
    //prepare social plugins (default data)
    $rootScope.Contacts = [{ Label: 'Address', Value: 'End of Al-ashraf st., El imam tower, Tanta, Egypt.' },
   { Label: 'Phone', Value: '+2 (012) 111 11111' },
   { Label: 'Mobile', Value: '+2 (012) 222 22222' },
   { Label: 'Fax', Value: '+2 (012) 333 33333' }
    ]

    jQuery(function ($) {
        "use strict";

        $rootScope.TwitterLink = "https://twitter.com/TwitterLive";
        $rootScope.FacebookLink = "https://www.facebook.com/AppoutLLC";

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




    $scope.expos = [];

    window.onresize = function () {
        $scope.exposList = JSON.parse((window.exposObject).replace(/&quot;/g, '"'));
    }

    $scope.loadArray = function (_expoID) {
        // get window height & width
        $scope.containerHeight = window.innerHeight;
        $scope.containerWidth = window.innerWidth;
        $scope.oneSectionHeight = $scope.containerHeight / 5;
        $scope.oneSectionWidth = $scope.containerWidth / 6;
        $rootScope.loading = false;

    }
    var currentExpoId;
    var floorsCounter;
    var intervalPeriod;
    var i = 0;
    $scope.getstores = function (i) {
        if (i < $scope.exposList.length) {
            var req = {
                method: 'get',
                url: '/Expo/GetStore/' + $scope.exposList[i]._id,
                data: {}
            }
            API.execute(req).then(function (_res) {
                if (_res.data.code == 100) {
                    $scope.exposList[i].stores = _res.data.data;
                    $scope.getstores(i + 1);
                }
            });

        }
    }

    $scope.init = function (_isoCode) {
        $rootScope.IsoCode = _isoCode;
        localStorage.setItem('IsoCode', _isoCode);
        $scope.exposList = JSON.parse((window.exposObject).replace(/&quot;/g, '"'));
        currentExpoId = $scope.exposList[0]._id;
        floorsCounter = $scope.exposList[0].Floors.length;
        intervalPeriod = $scope.exposList[0].FlipTime * 1000;
        $scope.getstores(i);
        // set which activeFloorCounter for every expo
        angular.forEach($scope.exposList, function (expo) {
            var expoId = expo._id;
            $scope['activeFloorCounter' + expoId] = 0;
        });
        if (true) { // parameter of expo
            //setInterval(function () { alert("Interval reached"); }, 60000);
        }
    }

    //// swipe floors 1 ,  2
    $scope.nextPage = function (_expoId, _floorsCounter) {
        $scope['activeFloorCounter' + _expoId]++;
        if ($scope['activeFloorCounter' + _expoId] < _floorsCounter) {
            $scope['activePageNumber' + _expoId] = $scope['activeFloorCounter' + _expoId];
        }
        else {
            $scope['activeFloorCounter' + _expoId] = 0;
            $scope['activePageNumber' + _expoId] = $scope['activeFloorCounter' + _expoId];
        }
    }
    $scope.previousPage = function (_expoId, _floorsCounter) {
        $scope['activeFloorCounter' + _expoId]--;
        if ($scope['activeFloorCounter' + _expoId] < _floorsCounter && $scope['activeFloorCounter' + _expoId] >= 0) {
            $scope['activePageNumber' + _expoId] = $scope['activeFloorCounter' + _expoId];
        }
        else {
            $scope['activeFloorCounter' + _expoId] = _floorsCounter - 1;
            $scope['activePageNumber' + _expoId] = $scope['activeFloorCounter' + _expoId];
        }
    }
    $scope.initfirstPage = function (_expoId, _floorId) {
        $scope['activePageNumber' + _expoId] = _floorId;
    }

    //$(document).ready(function () {
    angular.element(document).ready(function () {
        var interval;
        $scope.startShowLogos = false;
        $scope.startScroll = function () {
            $timeout(function () {
                swinch.init(null, {
                    snapTo: 'bottom',
                    scrollToElem: '.secondExpo',
                    onBeforeSnap: function onBeforeSnap(currentSection, nextSection, scrollDirection) {
                        //
                    },
                    onSnapped: function (current, previous, direction) {
                        clearInterval(interval);
                        currentExpoId = (current.id).slice(4);
                        intervalPeriod = current.getAttribute('data-flipTime') * 1000;
                        floorsCounter = current.getAttribute('data-floors'); // no need for it now
                        if (intervalPeriod > 0) {
                            interval = setInterval(function () {
                                $('#nextFloor' + currentExpoId).click();
                            }, intervalPeriod);
                        }
                        $scope.$apply();
                    }
                });
            }, 2000);
        }

         //$cookies.remove('myTour');
        var curStep = $cookies.get('myTour');
        if (typeof curStep === 'string')
            curStep = parseInt(curStep);
        $scope.currentStep = curStep || 0;
        //console.log($scope.currentStep);
        if ($scope.currentStep < 5 && $scope.exposList[0].Floors[0].Coordinates.length > 0) { //floor array not empty
            $timeout(function () {
                $scope.currentStep = 0;
            }, 1000);
        }
        else {
            $scope.currentStep = 5;
            $scope.startScroll();
            $scope.startShowLogos = true;
        }


        $scope.postTourCallback = function () {//close
            //console.log('tour closes');            
            $scope.startScroll();
            $scope.startShowLogos = true;
            $cookies.put('myTour', $scope.currentStep);
            $scope.startShowLogos = true;
        };

        $scope.tourCompleteCallback = function () {// complete
            //console.log('tour completed');
            $scope.startScroll();
            $scope.startShowLogos = true;
            $cookies.put('myTour', $scope.currentStep);
            $scope.startShowLogos = true;
        }

        $scope.postStepCallback = function () {// one step
            //console.log('Tour - Update Step', $scope.currentStep);
            $cookies.put('myTour', $scope.currentStep);
        };

    });

    $(document).keydown(function (e) {
        if (e.which == 37) { // left arrow keyboard --> previous
            $scope.selectedExpo = ($filter('filter')($scope.exposList, { '_id': currentExpoId }))[0];
            $scope.previousPage(currentExpoId, $scope.selectedExpo.Floors.length);
            $scope.$apply();
        }
        else if (e.which == 39) { // right arrow keyboard --> next
            $scope.selectedExpo = ($filter('filter')($scope.exposList, { '_id': currentExpoId }))[0];
            $scope.nextPage(currentExpoId, $scope.selectedExpo.Floors.length);
            $scope.$apply();
        }

        // e.preventDefault(); // prevent the default action (scroll / move caret)
    });

});

