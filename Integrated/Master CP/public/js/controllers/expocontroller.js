egm.controller("expoController", function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click();
    };

    $scope.init = function (_floors, _expo) {
        $scope.lstfloors = JSON.parse(_floors);
        $scope.expoData = JSON.parse(_expo);
        console.log($scope.lstfloors);
        console.log($scope.expoData);
    }

    $scope.floors = function (_id) {
        window.location.href = '/eg/floors/'+_id;
    }
    
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
            console.log(_res);
            if (_res.data.code == 100) {
                window.location.reload();
                window.location.href = '/eg/exposlist'
            } else {
                console.log('Something went error');
                $scope.loading = false;
            }
        });
    };

    $scope.signOut = function () {
        window.location.href = '/eg/Home';
        localStorage.clear();
    };

    $scope.deleteFloor = function (_floorId, _expoId) {
        $scope.loading = true;
        for (var i = 0; i < $scope.lstfloors.length; i++) {
            if ($scope.lstfloors[i]._id == _floorId) {
                $scope.lstfloors.splice(i, 1);
            }
        }
        console.log($scope.lstfloors);
        var req = {
            method: 'put',
            url: '/Expo/Edit',
            data: {
                _id: _expoId,
                Title: $scope.expo.Title,
                Category: $scope.expo.selectedCategory,
                Floors: $scope.lstfloors,
                Banner: $('#imgItem').attr('src')
            }
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                console.log('deleted');
            } else {
                console.log('Something went error');
            }
            $scope.loading = false;
        });
    }

    $scope.editFloor = function (_floorId, _expoId) {
        window.location.href = "/eg/editfloor/" + _floorId + "/" + _expoId;
    }


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