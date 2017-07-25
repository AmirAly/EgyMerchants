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

    $scope.init = function ( _isoCode) {
        $rootScope.IsoCode = _isoCode;

        $scope.exposList = JSON.parse((window.exposObject).replace(/&quot;/g, '"'));
            currentExpoId = $scope.exposList[0]._id;
        
        // set which activeFloorCounter for every expo
        angular.forEach($scope.exposList, function (expo) {
            var expoId = expo._id;
            $scope['activeFloorCounter' + expoId] = 0;
        });
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
     
    $(document).ready(function () {
        swinch.init(null, {
            onSnapped: function (current, previous, direction) {
                currentExpoId = (current.id).slice(4);
                $scope.$apply();
            }
        });
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

