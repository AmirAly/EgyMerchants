app.controller("storeController", function ($scope, $rootScope, $timeout, API) {
    $scope.init = function (_isoCode, _storeId) {
        $rootScope.IsoCode = _isoCode;

        if (window.GalleriesJson.length > 0) {
            $scope.GalleriesJson = JSON.parse(window.GalleriesJson);
        }
        else {
            $scope.GalleriesJson = [];
        }


        $scope.GalleriesLst = [];
        for (var i = 0; i < $scope.GalleriesJson.length; i++) {
            console.log($scope.GalleriesJson);
            var result = $scope.GalleriesJson[i].gallery.slice(1, -1);
            var result2 = $.trim(result.substring(result.indexOf("Title:") + 6));
            var result3 = result2.slice(1, -1);
            $scope.GalleriesJson[i].gallery = result3;
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