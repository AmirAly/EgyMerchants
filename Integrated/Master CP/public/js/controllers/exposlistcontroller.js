egm.controller("exposListController", function ($scope, API) {


    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };

    $scope.addExpo = function () {
        var req = {
            method: 'post',
            url: '/Expo/Add',
            data: {
                Title: $scope.expo.Title,
                Category: $scope.expo.selectedCategory,
                Banner: $('#imgItem').attr('src'),
                Status: 'Active',
                Floors:['']
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                console.log(_res);
                window.location.reload();
            } else {
                console.log('something went wrong');
            }
        });
    };

    $scope.editExpo = function (_id) {
        localStorage.setItem('expoId', _id);
        window.location.href = '/eg/expo/' + _id;
    }

    $scope.removeExpo = function (_id) {
        var req = {
            method: 'put',
            url: '/Expo/Suspend',
            data: {
                _id: _id
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                console.log('deleted');
                window.location.reload();
            } else {
                console.log('Something went wrong');
            }
        });
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