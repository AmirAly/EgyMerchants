app.controller("expoController", function ($scope, $rootScope, $timeout) {
    $rootScope.loading = true;
    $scope.expos = [];
    $timeout(function () {

    }, 2000);
    $scope.loadArray = function (_expoID, _data) {
        console.log(_data);
        for (var i = 0; i < _data.length; i++) {
            if (_data[i]._id == _expoID) {
                //empty container dv
                document.getElementById('imagesContainer' + _expoID).innerHTML = "";

                // get window height & width
                var containerHeight = document.getElementById('imagesContainer' + _expoID).offsetHeight;
                var containerWidth = document.getElementById('imagesContainer' + _expoID).offsetWidth;
                var oneSectionHeight = containerHeight / 5;
                var oneSectionWidth = containerWidth / 6;

                for (var j = 0; j < _data[i].floors[0].Coordinates.length; j++) {
                    var top = _data[i].floors[0].Coordinates[j].Top * oneSectionHeight;
                    var left = _data[i].floors[0].Coordinates[j].Left * oneSectionWidth;
                    var height = _data[i].floors[0].Coordinates[j].Height * oneSectionHeight;
                    var width = _data[i].floors[0].Coordinates[j].Width * oneSectionWidth;

                    var div = document.createElement('div');
                    div.innerHTML = '<div class="wow flipInX repeated-item" data-wow-duration="2s" style="background-image:url(' + _data[i].floors[0].Coordinates[j].Img + ');position:absolute;top:' + top + 'px;left:' + left + 'px;height:' + height + 'px;width:' + width + 'px;background-size: cover;background-repeat: no-repeat;">\
                                     <a href="/eg/Store/' + _data[i].floors[0].Coordinates[j].StoreName + '/' + _data[i].floors[0].Coordinates[j].Store + '"><div class="image-hover"><i class="icon-zoom-in-2"></i></div></a><div class="image-title">' + _data[i].floors[0].Coordinates[j].StoreName + '</div>\
                                     </div>';
                    document.getElementById('imagesContainer' + _expoID).appendChild(div);
                }
            }
        }

        //    //empty container dv
        //document.getElementById('imagesContainer' + _expoID).innerHTML = "";

        //    // get window height & width
        //var containerHeight = document.getElementById('imagesContainer' + _expoID).offsetHeight;
        //var containerWidth = document.getElementById('imagesContainer' + _expoID).offsetWidth;
        //    var oneSectionHeight = containerHeight / 5;
        //    var oneSectionWidth = containerWidth / 6;

        //    for (var i = 0; i < _data.length; i++) {
        //        var top = _data[i].Top * oneSectionHeight;
        //        var left = _data[i].Left * oneSectionWidth;
        //        var height = _data[i].Height * oneSectionHeight;
        //        var width = _data[i].Width * oneSectionWidth;

        //        var div = document.createElement('div');
        //        div.innerHTML = '<div class="wow flipInX" data-wow-duration="2s" style="background-image:url(' + _data[i].Img + ');position:absolute;top:' + top + 'px;left:' + left + 'px;height:' + height + 'px;width:' + width + 'px;background-size: cover;background-repeat: no-repeat;"></div>';
        //        document.getElementById('imagesContainer' + _expoID).appendChild(div);
        //    }

    }

    //$scope.loadFloor = function (_expoID, _floorId, _data) {
    //    console.log(_data);
    //    for (var i = 0; i < _data.length; i++) {
    //        if (_data[i]._id == _expoID) {
    //            //empty container dv
    //            document.getElementById('imagesContainer' + _expoID).innerHTML = "";

    //            // get window height & width
    //            var containerHeight = document.getElementById('imagesContainer' + _expoID).offsetHeight;
    //            var containerWidth = document.getElementById('imagesContainer' + _expoID).offsetWidth;
    //            var oneSectionHeight = containerHeight / 5;
    //            var oneSectionWidth = containerWidth / 6;

    //            for (var j = 0; j < _data[i].floors[_floorId].Coordinates.length; j++) {
    //                var top = _data[i].floors[_floorId].Coordinates[j].Top * oneSectionHeight;
    //                var left = _data[i].floors[_floorId].Coordinates[j].Left * oneSectionWidth;
    //                var height = _data[i].floors[_floorId].Coordinates[j].Height * oneSectionHeight;
    //                var width = _data[i].floors[_floorId].Coordinates[j].Width * oneSectionWidth;

    //                var div = document.createElement('div');
    //                div.innerHTML = '<div class="wow flipInX" data-wow-duration="2s" style="background-image:url(' + _data[i].floors[_floorId].Coordinates[j].Img + ');position:absolute;top:' + top + 'px;left:' + left + 'px;height:' + height + 'px;width:' + width + 'px;background-size: cover;background-repeat: no-repeat;">\
    //                                 <a href="/eg/Store/' + _data[i].floors[_floorId].Coordinates[j].StoreName + '/' + _data[i].floors[_floorId].Coordinates[j].Store + '"><div class="image-hover"><i class="icon-zoom-in-2"></i></div></a><div class="image-title">' + _data[i].floors[_floorId].Coordinates[j].StoreName + '</div>\
    //                                 </div>';
    //                document.getElementById('imagesContainer' + _expoID).appendChild(div);
    //            }
    //        }
    //    }


    //}


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
