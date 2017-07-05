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
        console.log($scope.containerHeight);
        console.log($scope.containerWidth);
        console.log($scope.oneSectionHeight);
        console.log($scope.oneSectionWidth);
        $rootScope.loading = false;
    }

    $scope.init = function (_list) {
        if (_list != '') {
            $scope.exposList = JSON.parse(_list);
        }
        else {
            $scope.exposList = [];
        }
        console.log($scope.exposList);
    }


    $scope.toggle = function (_id) {
        //$scope['hidePages' + _id] = !$scope['hidePages' + _id];
        if ($('.expoPagingController' + _id).hasClass('hide')) {
            //hide paging
            $('.expoPagingController' + _id).removeClass('hide');
            $('.expoPagingControllerRemoval' + _id).addClass('hide');
        }
        else {
            //show paging
            $('.expoPagingController' + _id).addClass('hide');
            $('.expoPagingControllerRemoval' + _id).removeClass('hide');
        }
        $('.whiteLayerContainer' + _id).toggleClass('clicked');
    }

    $scope.initHidePags = function (_id) {
        $scope['hidePages' + _id] = true;
    }

    //// one button to swipe floors 1 ,  2
    var fId = 0;
    $scope.selectPage = function (_expoId, _pageNo, _floorsCounter) {
        console.log(_pageNo);
        $('.btnChangePage').removeClass('active');
        $('.page' + _pageNo).addClass('active');
        $scope['activePageNumber' + _expoId] = fId;
        console.log(_expoId);
        console.log($scope['activePageNumber' + _expoId]);
        if (fId <= _floorsCounter) {
            fId++;
        }
        else {
            fId = 0;
        }
        console.log(fId);
        console.log(_floorsCounter);
    }

    $scope.initfirstPage = function (_expoId, _floorId) {
        $scope['activePageNumber' + _expoId] = _floorId;
        console.log($scope['activePageNumber' + _expoId]);
    }
});
