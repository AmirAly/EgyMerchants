egm.controller("galleryController", function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };
    console.log(localStorage.getItem('StoreId'));
    $scope.storeId = localStorage.getItem('StoreId');

    $scope.moveToItems = function (_galleryId) {
        window.location.href = '/eg/p/products/' + _galleryId
        localStorage.setItem('GalleryId', _galleryId);
        
    };


    $scope.galleryId = localStorage.getItem('GalleryOfGalleries');
    console.log(localStorage.getItem('GalleryOfGalleries'));

    $scope.updateGallery = function () {
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Gallery/Edit',
            data: {
                _id: $scope.galleryId,//'59099416734d1d274bfd08d4'
                Title: $scope.gallery.Title,
                Description: $scope.gallery.Description,
                Imgs: $('#imgItem').attr('src')
            }
        }
        API.execute(req).then(function (res) {
            console.log('1');
            if (res.data.code == 100) {
                console.log(res);
                window.location.reload();
            } else {
                console.log('err');
            }
        }).finally(function () {
            $scope.loading = false;
        });
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