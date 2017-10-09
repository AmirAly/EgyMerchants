app.controller("expoController", function ($scope, $rootScope, $timeout, $filter) {
    //$rootScope.loading = true;
    //$timeout(function () {
    //    $rootScope.loading = false;
    //}, 2000);

    $scope.expos = [];

    window.onresize = function () {
        console.log('resize');
        console.log($rootScope.loading);
        $rootScope.loading = true;
        location.reload();
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
    var intervalPeriod = 5000;
    $scope.init = function (_isoCode) {
        $rootScope.IsoCode = _isoCode;

        $scope.exposList = JSON.parse((window.exposObject).replace(/&quot;/g, '"'));
        currentExpoId = $scope.exposList[0]._id;
        floorsCounter = $scope.exposList[0].Floors.length;

        console.log($scope.exposList);
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
        console.log('enter Next');
        console.log($scope['activeFloorCounter' + _expoId]);
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

    $(document).ready(function () {
        var interval;
        swinch.init(null, {
            snapTo: 'bottom',
            scrollToElem: '.secondExpo',
            onBeforeSnap: function onBeforeSnap(currentSection, nextSection, scrollDirection) {
                //
            },
            onSnapped: function (current, previous, direction) {
                /**
                 * Called after the snapping completes
                 *
                 * @param  {Node}   currentSection
                 * @param  {Node}   previousSection
                 * @param  {Object} scrollDirection {isUp: <boolean>, isDown: <boolean>}
                 *
                 * @return {void}
                 */
                clearInterval(interval);
                console.log('onSnapped');
                console.log(direction);
                currentExpoId = (current.id).slice(4);
                console.log(current);
                var floorsCounter = current.getAttribute('data-floors'); // no need for it now
                console.log(floorsCounter);
                interval = setInterval(function () {
                    $('#nextFloor' + currentExpoId).click();
                }, intervalPeriod);

                $scope.$apply();
            }
        });

        window.tour = new Tour({
            padding: 0,
            nextText: 'More',
            doneText: 'Done',
            prevText: 'Less',
            tipClasses: 'tip-class active',
            steps: [
              {
                  element: "#one",
                  title: "Tourquoise",
                  description: "This box is tourqoise!",
                  data: "Custom Data",
                  position: "top"
              },
              {
                  element: "#two",
                  title: "Red",
                  description: "Look how red this box is!",
                  data: "Custom Data",
                  position: "top"
              }
              //,{
              //    element: ".three",
              //    title: "Blue",
              //    description: "Almost too blue! Reminds of a default anchor tag.",
              //    data: "Custom Data",
              //    position: "top"
              //}
              //,{
              //    element: ".four",
              //    title: "Green",
              //    description: "Trees!",
              //    position: "left"
              //},
              //{
              //    element: ".five",
              //    title: "Purple",
              //    description: "Because there should probably be five of these.",
              //    position: "top"
              //}
            ]
        });

        tour.override('showStep', function (self, step) {
            self(step);
        })

        tour.override('end', function (self, step) {
            self(step);
        })

        tour.start();
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

