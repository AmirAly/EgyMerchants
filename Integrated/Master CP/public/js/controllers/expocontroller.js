egm.controller("expoController", function ($scope, API) {

    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click();
    };

    $scope.init = function (_floors, _expo) {
        $scope.lstfloors = JSON.parse(_floors);
        $scope.expoData = JSON.parse(_expo);
    };

    $scope.floors = function (_id) {
<<<<<<< HEAD
        window.location.href = '/floors/' + _id;
=======
        window.location.href = '/eg/floors/' + _id;
>>>>>>> d8533afff7a9d35c04581998312cd97fadad366c
    };
    
    $scope.updateExpo = function (_id) {
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Expo/Edit',
            data: {
                _id: _id,
                Title: $scope.expo.Title,
                Category: $scope.expo.selectedCategory,
                Floors: $scope.lstfloors,
                Banner: $('#imgItem').attr('src')
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                window.location.reload();
<<<<<<< HEAD
                window.location.href = '/exposlist'
=======
                window.location.href = '/eg/exposlist'
>>>>>>> d8533afff7a9d35c04581998312cd97fadad366c
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
<<<<<<< HEAD
        window.location.href = '/Home';
=======
        window.location.href = '/eg/Home';
>>>>>>> d8533afff7a9d35c04581998312cd97fadad366c
        localStorage.clear();
    };

    $scope.callDelModal = function (_floorId , _expoId) {
        $scope.floorDelId = _floorId;
        $scope.expoDelId = _expoId;
    };

    $scope.deleteFloor = function () {
        $scope.loading = true;
        for (var i = 0; i < $scope.lstfloors.length; i++) {
            if ($scope.lstfloors[i]._id == $scope.floorDelId) {
                $scope.lstfloors.splice(i, 1);
            }
        }

        var req = {
            method: 'put',
            url: '/Expo/Edit',
            data: {
                _id: $scope.expoDelId,
                Title: $scope.expo.Title,
                Category: $scope.expo.selectedCategory,
                Floors: $scope.lstfloors,
                Banner: $('#imgItem').attr('src')
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
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
<<<<<<< HEAD
        window.location.href = "/editfloor/" + _floorId + "/" + _expoId;
    };

});
var _URL = window.URL || window.webkitURL;
function convertEditExpoImgToBase64URL(event) {
    var filesSelected = document.getElementById("uploadItemImage").files;
    var img = new Image();
=======
        window.location.href = "/eg/editfloor/" + _floorId + "/" + _expoId;
    };

});

function convertImgToBase64URL(event) {
    var filesSelected = document.getElementById("uploadItemImage").files;
>>>>>>> d8533afff7a9d35c04581998312cd97fadad366c
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
<<<<<<< HEAD
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
=======
            BaseImg64 = fileLoadedEvent.target.result;
            UploadImage(BaseImg64);
        };
        fileReader.readAsDataURL(fileToLoad);
>>>>>>> d8533afff7a9d35c04581998312cd97fadad366c
    }
};

function UploadImage(_BaseImg64) {
    $('#imgItem').attr('src', _BaseImg64);
};