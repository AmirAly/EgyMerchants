<<<<<<< HEAD
﻿app.controller("expoController", function ($scope, $rootScope, $timeout, $window) {
=======
﻿app.controller("expoController", function ($scope, $rootScope, $timeout) {
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
    $rootScope.loading = true;
    $scope.expos = [];
    $timeout(function () {

        $rootScope.loading = false;
    }, 2000);

<<<<<<< HEAD
    window.onresize = function () {
        console.log('resize');
        $rootScope.loading = true;
        location.reload();
    }
=======
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813

    $scope.loadArray = function (_expoID) {
        // get window height & width
        $scope.containerHeight = window.innerHeight;
        $scope.containerWidth = window.innerWidth;
        $scope.oneSectionHeight = $scope.containerHeight / 5;
        $scope.oneSectionWidth = $scope.containerWidth / 6;
        $rootScope.loading = false;
    }

<<<<<<< HEAD
    $scope.init = function (_list, _isoCode) {
        $rootScope.IsoCode = _isoCode;
=======
    $scope.init = function (_list) {
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
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
<<<<<<< HEAD

=======
       
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813

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