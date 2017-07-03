app.controller("expoController", function ($scope, $rootScope, $timeout) {
    $rootScope.loading = true;
    $scope.expos = [];
    $timeout(function () {
        $rootScope.loading = false;
    }, 2000);
    $scope.loadArray = function (_expoID, _dataex) {
        console.log('enter');
        console.log(_expoID);
        console.log(JSON.parse(_dataex));
        var _data = JSON.parse(_dataex);
        //console.log(_data);
        for (var i = 0; i < _data.length; i++) {
            if (_data[i]._id == _expoID) {
                //empty container dv
                document.getElementById('imagesContainer' + _expoID).innerHTML = "";

                // get window height & width
                var containerHeight = document.getElementById('imagesContainer' + _expoID).offsetHeight - 30;
                var containerWidth = document.getElementById('imagesContainer' + _expoID).offsetWidth;
                var oneSectionHeight = containerHeight / 5;
                var oneSectionWidth = containerWidth / 6;

                console.log(containerHeight);
                console.log(containerWidth);
                console.log(oneSectionHeight);
                console.log(oneSectionWidth);

                //$scope.floors[_expoID] = _data[i].Floors;

                console.log(_data[i].Floors[0].Coordinates);

                for (var j = 0; j < _data[i].Floors[0].Coordinates.length; j++) {
                    var top = _data[i].Floors[0].Coordinates[j].Top * oneSectionHeight;
                    var left = _data[i].Floors[0].Coordinates[j].Left * oneSectionWidth;
                    var height = _data[i].Floors[0].Coordinates[j].Height * oneSectionHeight;
                    var width = _data[i].Floors[0].Coordinates[j].Width * oneSectionWidth;

                    console.log(_data[i].Floors[0].Coordinates[j].Store._id);
                    var div = document.createElement('div');
                    div.innerHTML = '<div class="wow flipInX repeated-item" data-wow-duration="2s" style="background-image:url(' + _data[i].Floors[0].Coordinates[j].Img + ');position:absolute;top:' + top + 'px;left:' + left + 'px;height:' + height + 'px;width:' + width + 'px;background-size: cover;background-repeat: no-repeat;">\
                                     <a href="/eg/Store/' + _data[i].Floors[0].Coordinates[j].StoreName + '/' + _data[i].Floors[0].Coordinates[j].Store._id + '"><div class="image-hover"><i class="icon-zoom-in-2"></i></div></a><div class="image-title">' + _data[i].Floors[0].Coordinates[j].StoreName + '</div>\
                                     </div>';
                    document.getElementById('imagesContainer' + _expoID).appendChild(div);

                }
                for (var x = 0; x < _data[i].Floors.length; x++) {
                    //floors counter
                    var num = x + 1;
                    $('#pagingContainer' + _expoID).append('<li onclick="selectPage(' + _expoID + ',' + num + ')" class="btnChangePage page' + num + '"><a>' + num + '</a></li>');
                    // set first li active
                    //..
                }

            }
        }
        $rootScope.loading = false;
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

    //            for (var j = 0; j < _data[i].Floors[_floorId].Coordinates.length; j++) {
    //                var top = _data[i].Floors[_floorId].Coordinates[j].Top * oneSectionHeight;
    //                var left = _data[i].Floors[_floorId].Coordinates[j].Left * oneSectionWidth;
    //                var height = _data[i].Floors[_floorId].Coordinates[j].Height * oneSectionHeight;
    //                var width = _data[i].Floors[_floorId].Coordinates[j].Width * oneSectionWidth;

    //                var div = document.createElement('div');
    //                div.innerHTML = '<div class="wow flipInX" data-wow-duration="2s" style="background-image:url(' + _data[i].Floors[_floorId].Coordinates[j].Img + ');position:absolute;top:' + top + 'px;left:' + left + 'px;height:' + height + 'px;width:' + width + 'px;background-size: cover;background-repeat: no-repeat;">\
    //                                 <a href="/eg/Store/' + _data[i].Floors[_floorId].Coordinates[j].StoreName + '/' + _data[i].Floors[_floorId].Coordinates[j].Store + '"><div class="image-hover"><i class="icon-zoom-in-2"></i></div></a><div class="image-title">' + _data[i].Floors[_floorId].Coordinates[j].StoreName + '</div>\
    //                                 </div>';
    //                document.getElementById('imagesContainer' + _expoID).appendChild(div);
    //            }
    //        }
    //    }


    //}


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

    $scope.selectPage = function (_expoId, _pageNo) {
        //$scope['activePageNumber' + _expoId] = _pageNo;
        console.log(_pageNo);
        //$('.btnChangePage').removeClass('active');
        $('.page' + _pageNo).addClass('active');
       // $('#expo' + _id + ' .repeated-item').fadeOut('50', 'linear').fadeIn('50', 'linear').animate({ opacity: '1' }, "50");
    }

    $scope.initfirstPage = function (_expoId) {
        $scope['activePageNumber' + _expoId] = 1;
        console.log($scope['activePageNumber' + _expoId]);
    }
});

//function toggle(_id) {
//    if ($('.expoPagingController' + _id).hasClass('hide')) {
//        //hide paging
//        $('.expoPagingController' + _id).removeClass('hide');
//        $('.expoPagingControllerRemoval' + _id).addClass('hide');
//    }
//    else {
//        //show paging
//        $('.expoPagingController' + _id).addClass('hide');
//        $('.expoPagingControllerRemoval' + _id).removeClass('hide');
//    }
//    $('.whiteLayerContainer' + _id).toggleClass('clicked');
//}
function selectPage(_id, _floor) {
    console.log('hi');
    console.log(_floor);
    $('.btnChangePage').removeClass('active');
    $('.page' + _floor).addClass('active');
    $('#expo' + _id + ' .repeated-item').fadeOut('50', 'linear').fadeIn('50', 'linear').animate({ opacity: '1' }, "50");
}