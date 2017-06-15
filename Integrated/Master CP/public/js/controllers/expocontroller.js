egm.controller("expoController", function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click();
    };

    $scope.floors = function (_id) {
        window.location.href = '/eg/floors/'+_id;
    }
    
    $scope.updateExpo = function (_id) {
        var req = {
            method: 'put',
            url: '/Expo/Edit',
            data: {
                _id: _id,
                Title: $scope.expo.Title,
                Category: $scope.expo.selectedCategory,
                Floors: '',
                Banner: $('#imgItem').attr('src')
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                console.log(_res);
                window.location.reload();
                window.location.href = '/eg/exposlist'
            } else {
                console.log('Something went error');
            }
        });
    };

    $scope.signOut = function () {
        window.location.href = '/eg/Home';
        localStorage.clear();
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