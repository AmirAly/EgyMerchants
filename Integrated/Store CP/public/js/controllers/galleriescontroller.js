egm.controller("galleriesController", ['$scope', 'API', function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };

    $scope.preload = function () {
        if (localStorage.getItem('StoreId') == null || localStorage.getItem('StoreId') == '') {
            window.location.href = '/eg/Home';
        }
    };

    $scope.preload();

    console.log(localStorage.getItem('StoreId'));
    $scope.storeId = localStorage.getItem('StoreId');

    $scope.moveToGallery = function (_galleryOfGalleries) {
        window.location.href = '/eg/g/gallery/' + _galleryOfGalleries;
    };

    $scope.addGallery = function () {
        $scope.loading = true;
        var req = {
            method: 'post',
            url: '/Gallery/Add',
            data: {
                Title: $scope.gallery.Title,
                Description: $scope.gallery.Description,
                DisplayPicture: $('#imgItem').attr('src'),
                Badges: 'offer',
                Status: 'Active',
                Store: $scope.storeId   //'59084a09734d1d3098a82cd6'
            }
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                console.log(_res);
                $scope.galleryId = _res.data._id;
                console.log('id:', $scope.galleryId);
                window.location.reload();
            } else {
                $scope.loading = false;
            }
        });
    };

    $scope.signOut = function () {
        window.location.href = '/eg/Home';
        localStorage.clear();
    };

}]);
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