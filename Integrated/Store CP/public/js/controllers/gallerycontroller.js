﻿egm.controller("galleryController", function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };

    $scope.preload = function () {
        if (localStorage.getItem('StoreId') == null || localStorage.getItem('StoreId') == '') {
            window.location.href = '/eg/Home';
        }
    };

    $scope.preload();

    $scope.storeId = localStorage.getItem('StoreId');

    $scope.moveToItems = function (_galleryId) {
        window.location.href = '/eg/p/products/' + _galleryId
        localStorage.setItem('GalleryId', _galleryId);
    };

    $scope.signOut = function () {
        window.location.href = '/eg/Home';
        localStorage.clear();
    };

    $scope.updateGallery = function () {
        
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Gallery/Edit',
            data: {
                _id: $scope.galleryId,
                Title: $scope.gallery.Title,
                Description: $scope.gallery.Description,
                Imgs: $('#imgItem').attr('src')
            }
        }
        API.execute(req).then(function (res) {
            if (res.data.code == 100) {
                window.location.reload();
            } else {
                console.log(res);
                $scope.loading = false;
            }
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