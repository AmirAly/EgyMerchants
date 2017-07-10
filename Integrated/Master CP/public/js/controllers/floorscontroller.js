egm.controller("floorsController", function ($scope, API, $filter) {
    
    $('.bs-example-modal-lg').on('hidden.bs.modal', function () {
        $scope.frmAddSection.$setPristine();
        $scope.selectedstore = '';
        $('#imgItem').attr('src', "data:image/gif;base64,R0lGODlh6ANYAsQAAOTk5N7e3ufn5+jo6Ozs7Obm5vPz89/f3/T09ODg4PHx8e/v7/Dw8PLy8uPj4+3t7eLi4u7u7urq6uHh4eXl5enp6evr693d3fX19QAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAADoA1gCAAX/ICaOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wADChxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhT/6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gw4odS7as2bNo06pdy7at27dw48qdS7eu3bt48+rdy7ev37+AAwseTLiw4cOIEytezLix48eQI0ueTLmy5cuYM2vezLmz58+gQ4seTbq06dOoU6tezbq169ewY8ueTbu27du4c+vezbu379/AgwsfTry48ePIkytfzry58+fQo0ufTr269evYs2vfzr279+/gw4sfT768+fPo06tfz769+/fw48ufT7++/fv48+vfz7+///8ABijggAQWaOCBCCao4P+CDDbo4IMQRijhhBRWaOGFGGao4YYcdujhhyCGKOKIJJZo4okopqjiiiy26OKLMMYo44w01mjjjTjmqOOOPPbo449ABinkkEQWaeSRSCap5JJMNunkk1BGKeWUVFZp5ZVYZqnlllx26eWXYIYp5phklmnmmWimqeaabLbp5ptwxinnnHTWaeedeOap55589unnn4AGKuighBZq6KGIJqrooow26uijkEYq6aSUVmrppZhmqummnHbq6aeghirqqKSWauqpqKaq6qqsturqq7DGKuurCDBgQQEOAKDrrrz26uuvwAYrLK8OFCDBAgjM+pIBFjiQQAAXRCvttNRWa+3/tdhm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");
        $scope.$apply();
    });


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