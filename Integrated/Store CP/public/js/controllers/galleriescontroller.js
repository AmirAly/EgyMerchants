egm.controller("galleriesController", ['$scope', 'API', function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };

    $scope.preload = function () {
        if (localStorage.getItem('StoreId') == null || localStorage.getItem('StoreId') == '') {
            window.location.href = '/Home';
        }
    };

    $('.modal').on('hidden.bs.modal', function () {
        console.log('enter');

        $("#myForm").trigger("reset");
        //document.getElementById("myForm").reset();

        //$(this).closest('form').find("input[type=text], textarea").val("");

        $scope.errMsg = false;
        $scope.errdiv = false;
        console.log($scope.errMsg);
        console.log($scope.errdiv);

        //console.log($scope.gallery.Title);
    });

    $scope.preload();

    $scope.storeId = localStorage.getItem('StoreId');

    $scope.moveToGallery = function (_galleryOfGalleries) {
        window.location.href = '/g/gallery/' + _galleryOfGalleries;
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
                Store: $scope.storeId   
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                $scope.galleryId = _res.data._id;
                window.location.reload();
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