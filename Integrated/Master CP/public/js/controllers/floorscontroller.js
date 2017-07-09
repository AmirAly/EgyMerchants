egm.controller("floorsController", function ($scope, API, $filter) {
    

    $scope.signOut = function () {
        window.location.href = '/Home';
        localStorage.clear();
    };


    $scope.floor = {
        "Sections": [
                        { sectionId: 1, sectionCoordinateXrow: "1", sectionCoordinateYcoulmn: "1", data: '1x1', isBusy: false },
                        { sectionId: 2, sectionCoordinateXrow: "1", sectionCoordinateYcoulmn: "2", data: '1x2', isBusy: false },
                        { sectionId: 3, sectionCoordinateXrow: "1", sectionCoordinateYcoulmn: "3", data: '1x3', isBusy: false },
                        { sectionId: 4, sectionCoordinateXrow: "1", sectionCoordinateYcoulmn: "4", data: '1x4', isBusy: false },
                        { sectionId: 5, sectionCoordinateXrow: "1", sectionCoordinateYcoulmn: "5", data: '1x5', isBusy: false },
                        { sectionId: 6, sectionCoordinateXrow: "1", sectionCoordinateYcoulmn: "6", data: '1x6', isBusy: false },
                        { sectionId: 7, sectionCoordinateXrow: "2", sectionCoordinateYcoulmn: "1", data: '2x1', isBusy: false },
                        { sectionId: 8, sectionCoordinateXrow: "2", sectionCoordinateYcoulmn: "2", data: '2x2', isBusy: false },
                        { sectionId: 9, sectionCoordinateXrow: "2", sectionCoordinateYcoulmn: "3", data: '2x3', isBusy: false },
                        { sectionId: 10, sectionCoordinateXrow: "2", sectionCoordinateYcoulmn: "4", data: '2x4', isBusy: false },
                        { sectionId: 11, sectionCoordinateXrow: "2", sectionCoordinateYcoulmn: "5", data: '2x5', isBusy: false },
                        { sectionId: 12, sectionCoordinateXrow: "2", sectionCoordinateYcoulmn: "6", data: '2x6', isBusy: false },
                        { sectionId: 13, sectionCoordinateXrow: "3", sectionCoordinateYcoulmn: "1", data: '3x1', isBusy: false },
                        { sectionId: 14, sectionCoordinateXrow: "3", sectionCoordinateYcoulmn: "2", data: '3x2', isBusy: false },
                        { sectionId: 15, sectionCoordinateXrow: "3", sectionCoordinateYcoulmn: "3", data: '3x3', isBusy: false },
                        { sectionId: 16, sectionCoordinateXrow: "3", sectionCoordinateYcoulmn: "4", data: '3x4', isBusy: false },
                        { sectionId: 17, sectionCoordinateXrow: "3", sectionCoordinateYcoulmn: "5", data: '3x5', isBusy: false },
                        { sectionId: 18, sectionCoordinateXrow: "3", sectionCoordinateYcoulmn: "6", data: '3x6', isBusy: false },
                        { sectionId: 19, sectionCoordinateXrow: "4", sectionCoordinateYcoulmn: "1", data: '4x1', isBusy: false },
                        { sectionId: 20, sectionCoordinateXrow: "4", sectionCoordinateYcoulmn: "2", data: '4x2', isBusy: false },
                        { sectionId: 21, sectionCoordinateXrow: "4", sectionCoordinateYcoulmn: "3", data: '4x3', isBusy: false },
                        { sectionId: 22, sectionCoordinateXrow: "4", sectionCoordinateYcoulmn: "4", data: '4x4', isBusy: false },
                        { sectionId: 23, sectionCoordinateXrow: "4", sectionCoordinateYcoulmn: "5", data: '4x5', isBusy: false },
                        { sectionId: 24, sectionCoordinateXrow: "4", sectionCoordinateYcoulmn: "6", data: '4x6', isBusy: false },
                        { sectionId: 25, sectionCoordinateXrow: "5", sectionCoordinateYcoulmn: "1", data: '5x1', isBusy: false },
                        { sectionId: 26, sectionCoordinateXrow: "5", sectionCoordinateYcoulmn: "2", data: '5x2', isBusy: false },
                        { sectionId: 27, sectionCoordinateXrow: "5", sectionCoordinateYcoulmn: "3", data: '5x3', isBusy: false },
                        { sectionId: 28, sectionCoordinateXrow: "5", sectionCoordinateYcoulmn: "4", data: '5x4', isBusy: false },
                        { sectionId: 29, sectionCoordinateXrow: "5", sectionCoordinateYcoulmn: "5", data: '5x5', isBusy: false },
                        { sectionId: 30, sectionCoordinateXrow: "5", sectionCoordinateYcoulmn: "6", data: '5x6', isBusy: false },
        ],
        "Coordinates": [{}],
        "Name": ""
    }
    $scope.coordinates = [];

    $scope.addSection = function () {
        $scope.getSelected();
        $('#modal').modal('toggle');
        // clear modal 
        $('#imgItem').attr('src', '/img/add.gif');
    }
   
    $scope.getSelected = function () {
        $scope.oneStoreCoordinates = {};
        // filter array by isBusy status to get selected Sections
        $scope.selectedSections = $filter('filter')($scope.floor.Sections, { isBusy: true });
        //console.log($scope.selectedSections);
        // get lowest & highest values
        // width
        function findMinCoordinateYcoulmn() {
            var result = null;
            for (var i = 0; i < $scope.selectedSections.length; i++) {
                var account = $scope.selectedSections[i];
                if (result == null || account.sectionCoordinateYcoulmn < result.sectionCoordinateYcoulmn) {
                    result = account;
                }
            }
            return result;
        }
        var minW = findMinCoordinateYcoulmn().sectionCoordinateYcoulmn;
        function findMaxCoordinateYcoulmn() {
            var result = null;
            for (var i = 0; i < $scope.selectedSections.length; i++) {
                var account = $scope.selectedSections[i];
                if (result == null || account.sectionCoordinateYcoulmn > result.sectionCoordinateYcoulmn) {
                    result = account;
                }
            }
            return result;
        }
        var maxW = findMaxCoordinateYcoulmn().sectionCoordinateYcoulmn;
        sectionWidth = (maxW - minW) + 1;
        //console.log("sectionWidth : " + sectionWidth);
        // height
        function findMinCoordinateXrow() {
            var result = null;
            for (var i = 0; i < $scope.selectedSections.length; i++) {
                var account = $scope.selectedSections[i];
                if (result == null || account.sectionCoordinateXrow < result.sectionCoordinateXrow) {
                    result = account;
                }
            }
            return result;
        }
        var minH = findMinCoordinateXrow().sectionCoordinateXrow;
        function findMaxCoordinateXrow() {
            var result = null;
            for (var i = 0; i < $scope.selectedSections.length; i++) {
                var account = $scope.selectedSections[i];
                if (result == null || account.sectionCoordinateXrow > result.sectionCoordinateXrow) {
                    result = account;
                }
            }
            return result;
        }
        var maxH = findMaxCoordinateXrow().sectionCoordinateXrow;
        sectionHeight = (maxH - minH) + 1;
        //console.log("sectionHeight : " + sectionHeight);
        //console.log("Top : " + (minH - 1) + " Left : " + (minW - 1));
        // add data to coordinates array
        //console.log($scope.selectedstore);

        var e = document.getElementById("selectStore");
        var strUser = e.options[e.selectedIndex].text;

        $scope.oneStoreCoordinates = {
            Top: (minH - 1),
            Left: (minW - 1),
            Width: sectionWidth,
            Height: sectionHeight,
            Img: $('#imgItem').attr('src'),
            Store: $scope.selectedstore,
            StoreName: strUser
        };

        $scope.coordinates.push($scope.oneStoreCoordinates);
        $scope.imgLink = '';
        //add class busy
        $('.active').addClass('busy').removeClass('active');
        // clear array from active , isBusy status
        for (var i = 0; i < $scope.floor.Sections.length; i++) {
            if ($scope.floor.Sections[i].isBusy != false) {
                $scope.floor.Sections[i].isBusy = false;
                $scope.floor.Sections[i].data = '';
            }
        }
    }
    //load from coordinates array
    $scope.loadArray = function () {
        //empty container dv
        document.getElementById('imagesContainer').innerHTML = "";
        // get window height & width
        var containerHeight = document.getElementById('imagesContainer').offsetHeight;
        var containerWidth = document.getElementById('imagesContainer').offsetWidth;
        var oneSectionHeight = containerHeight / 5;
        var oneSectionWidth = containerWidth / 6;
        for (var i = 0; i < $scope.coordinates.length; i++) {
            var top = $scope.coordinates[i].Top * oneSectionHeight;
            var left = $scope.coordinates[i].Left * oneSectionWidth;
            var height = $scope.coordinates[i].Height * oneSectionHeight;
            var width = $scope.coordinates[i].Width * oneSectionWidth;
            var div = document.createElement('div');
            div.innerHTML = '<div style="background-image:url(' + $scope.coordinates[i].Img + ');position:absolute;top:' + top + ';left:' + left + ';height:' + height + ';width:' + width + ';background-size: cover;background-repeat: no-repeat;"></div>';
            document.getElementById('imagesContainer').appendChild(div);
        }
    }
    //$scope.selectSection = function (_section) {
    //    console.log(_section);
    //    if (_section.data != "") {
    //        _section.isBusy = !_section.isBusy;
    //        $scope['active' + _section.sectionId] = !$scope['active' + _section.sectionId];
    //        console.log($scope['active' + _section.sectionId]);
    //    }
    //}

    var pathArray = window.location.pathname.split('/');

    $scope.saveFloor = function () {
        $scope.floor.Coordinates = $scope.coordinates;
        $scope.floor.Name = $scope.floorName;
        //console.log($scope.floor);
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Expo/SetFloor',
            data: {
                _id: pathArray[pathArray.length - 1], //get last segmant of url
                Floor: $scope.floor
            }
        }
        API.execute(req).then(function (res) {
            if (res.data.code == 100) {
                //console.log(res);
                window.location.href = '/expo/' + pathArray[pathArray.length - 1];
                //localStorage.setItem('storeId', res.data._id);
            } else {
                //$scope.errMsg = res.data;
                //$scope.errdiv = true;
                $scope.loading = false;
                if (_res.data.code == 21) {
                    $scope.errMsg = true;
                    $scope.errdiv = true;
                    $scope.errorMsg = _res.data.data;
                } else {
                    $scope.loading = false;
                    $scope.errMsg = true;
                    $scope.errdiv = true;
                    $scope.errorMsg = _res.data.data;
                }
            }

        });
    }

    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };

});
function convertImgToBase64URL(event) {
    var filesSelected = document.getElementById("uploadItemImage").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            BaseImg64 = fileLoadedEvent.target.result;
            UploadImage(BaseImg64);
        };
        fileReader.readAsDataURL(fileToLoad);
    }
};

function UploadImage(_BaseImg64) {
    $('#imgItem').attr('src', _BaseImg64);
};