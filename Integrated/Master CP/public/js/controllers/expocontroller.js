egm.controller("expoController", function ($scope, API) {
    $scope.preload = function () {
        if (localStorage.getItem('admin') == null || localStorage.getItem('admin') == '') {
            window.location.href = '/Home';
        }
    };
    $scope.preload();


    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click();
    };
    $scope.expoLst = JSON.parse((window.expoObject).replace(/&quot;/g, '"'));
    $scope.expoLst.FlipTime = $scope.expoLst.FlipTime;
    $scope.floorLst = JSON.parse((window.floorObject).replace(/&quot;/g, '"'));

    $scope.floors = function (_id) {
        window.location.href = '/floors/' + _id;
    };

    $scope.updateExpo = function (_id) {
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Expo/Edit',
            data: {
                _id: _id,
                Title: $scope.expoLst.Title,
                Category: $scope.expoLst.Category._id,
                Floors: $scope.floorLst,
                FlipTime: $scope.expoLst.FlipTime,
                Banner: $('#imgItem').attr('src')
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                window.location.reload();
                window.location.href = '/exposlist'
            } else {
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
    };

    $scope.signOut = function () {
        window.location.href = '/Home';
        localStorage.clear();
    };

    $scope.callDelModal = function (_floorId, _expoId) {
        $scope.floorDelId = _floorId;
        $scope.expoDelId = _expoId;
    };

    $scope.deleteFloor = function () {
        $scope.loading = true;
        for (var i = 0; i < $scope.floorLst.length; i++) {
            if ($scope.floorLst[i]._id == $scope.floorDelId) {
                $scope.floorLst.splice(i, 1);
            }
        }
        var req = {
            method: 'put',
            url: '/Expo/RemoveFloor',
            data: {
                _id: $scope.expoDelId,
                FloorID: $scope.floorDelId
            }
        }

        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                window.location.href = '/expo/' + $scope.expoDelId
            } else {
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
    };

    $scope.editFloor = function (_floorId, _expoId) {
        for (var index = 0; index < $scope.expoLst.MobileFloors.length; index++) {
            if ($scope.expoLst.MobileFloors[index].FloorID == _floorId) {
                $scope.mobilefloor = $scope.expoLst.MobileFloors[index];
              window.location.href = "/editfloor/" + _floorId + "/" + $scope.mobilefloor._id + "/" + _expoId;

            }
        }

    };

});
var _URL = window.URL || window.webkitURL;
function convertEditExpoImgToBase64URL(event) {
    var filesSelected = document.getElementById("uploadItemImage").files;
    var img = new Image();
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            img.onload = function () {
                if ((this.height / this.width) < 1.5 && fileToLoad.size <= 2000000) {
                    document.getElementById("errImgDiv").style.display = 'none';
                    BaseImg64 = fileLoadedEvent.target.result;
                    UploadImage(BaseImg64);
                } else {
                    document.getElementById("errImgDiv").style.display = 'block';
                }
            };

        };
        fileReader.readAsDataURL(fileToLoad);
        img.src = _URL.createObjectURL(fileToLoad);
    }
};

function UploadImage(_BaseImg64) {
    $('#imgItem').attr('src', _BaseImg64);
};