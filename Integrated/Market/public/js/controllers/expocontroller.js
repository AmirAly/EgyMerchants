app.controller("expoController", function ($scope, $rootScope, $timeout) {
    $rootScope.loading = true;
    $scope.expos = [];
    $timeout(function () {

    }, 2000);
    $scope.loadArray = function (_data) {
        console.log(_data);
        //_data = JSON.parse(_data);
        //console.log(_data);

            //empty container dv
            document.getElementById('imagesContainer').innerHTML = "";

            // get window height & width
            var containerHeight = document.getElementById('imagesContainer').offsetHeight;
            var containerWidth = document.getElementById('imagesContainer').offsetWidth;
            var oneSectionHeight = containerHeight / 5;
            var oneSectionWidth = containerWidth / 6;

            for (var i = 0; i < _data.length; i++) {
                var top = _data[i].Top * oneSectionHeight;
                var left = _data[i].Left * oneSectionWidth;
                var height = _data[i].Height * oneSectionHeight;
                var width = _data[i].Width * oneSectionWidth;

                var div = document.createElement('div');
                div.innerHTML = '<div style="background-image:url(' + _data[i].Img + ');position:absolute;top:' + top + 'px;left:' + left + 'px;height:' + height + 'px;width:' + width + 'px;background-size: cover;background-repeat: no-repeat;"></div>';
                document.getElementById('imagesContainer').appendChild(div);
            }

        }

    $scope.toggle = function (_id) {
        $scope['hidePages' + _id] = !$scope['hidePages' + _id];
    }

    $scope.initHidePags = function (_id) {
        $scope['hidePages' + _id] = true;
    }

    $scope.selectPage = function (_expoId, _pageNo) {
        $scope['activePageNumber' + _expoId] = _pageNo;
    }

    $scope.initfirstPage = function (_expoId) {
        $scope['activePageNumber' + _expoId] = 1;
        console.log($scope['activePageNumber' + _expoId]);
    }
});
