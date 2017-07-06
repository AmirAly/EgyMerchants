app.controller("expoController", function ($scope, $rootScope, $timeout) {
    $rootScope.loading = true;
    $scope.expos = [];
    $timeout(function () {

        $rootScope.loading = false;
    }, 2000);


    $scope.loadArray = function (_expoID) {
        // get window height & width
        $scope.containerHeight = window.innerHeight;
        $scope.containerWidth = window.innerWidth;
        $scope.oneSectionHeight = $scope.containerHeight / 5;
        $scope.oneSectionWidth = $scope.containerWidth / 6;
        $rootScope.loading = false;
    }

    $scope.init = function (_list) {
        if (_list != '') {
            $scope.exposList = JSON.parse(_list);
        }
        else {
            $scope.exposList = [];
        }
    }

    //// one button to swipe floors 1 ,  2
    var fId = 0;
    $scope.selectPage = function (_expoId, _floorsCounter) {
        fId++;
        if (fId < _floorsCounter) {
            $scope['activePageNumber' + _expoId] = fId;
        }
        else {
            fId = 0;
            $scope['activePageNumber' + _expoId] = fId;
        }
       

    }

    $scope.initfirstPage = function (_expoId, _floorId) {
        $scope['activePageNumber' + _expoId] = _floorId;
    }
});

$(document).ready(function () {
    swinch.init(null, {
        onBeforeSnap: function (current, next, direction) {
            //console.log('onBeforeSnap', current, next, direction);
        },
        onSnapped: function (current, previous, direction) {
            //console.log('onSnapped', current, previous, direction);
        }
    });
});