app.controller("mobileexpoController", function ($scope, $rootScope, $timeout, $filter, API, $cookies) {
    

    $scope.expos = [];

    window.onresize = function () {
        $scope.exposList = JSON.parse((window.exposObject).replace(/&quot;/g, '"'));
    }

    $scope.loadArray = function (_expoID) {
        // get window height & width
        $scope.containerHeight = window.innerHeight;
        $scope.containerWidth = window.innerWidth;
        $scope.oneSectionHeight = $scope.containerHeight / 5;
        $scope.oneSectionWidth = $scope.containerWidth / 2;
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

