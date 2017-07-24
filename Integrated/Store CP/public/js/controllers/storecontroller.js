egm.controller("storeController", function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };
    $scope.ShowFileSelectorCover = function () {
        document.getElementById('uploadItemImageCover').click()
    };

    $scope.preload = function () {
        if (localStorage.getItem('StoreId') == null || localStorage.getItem('StoreId') == '') {
            window.location.href = '/Home';
        }
    };

    $scope.currentStore = JSON.parse((window.storeObject).replace(/&quot;/g, '"'));

    $scope.preload();

    $scope.currentStore._id = localStorage.getItem('StoreId');

    $scope.signOut = function () {
        window.location.href = '/Home';
        localStorage.clear();
    };

    $scope.save = function () {
        $scope.currentStore.ProfilePicture = $('#imgItem').attr('src');
        $scope.currentStore.CoverPhoto = $('#imgItemCover').attr('src');
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Store/EditProfile',
            data: $scope.currentStore
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
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
});
function convertProfileStoreImgToBase64URL(event) {
    var filesSelected = document.getElementById("uploadItemImage").files;
    var img = new Image();
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            img.onload = function () {
                if ((this.height / this.width) < 1.5 && fileToLoad.size <= 2000000) {
                    document.getElementById("errImgDivEdit").style.display = 'none';
                    BaseImg64 = fileLoadedEvent.target.result;
                    UploadImage(BaseImg64);
                } else {
                    document.getElementById("errImgDivEdit").style.display = 'block';
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

function convertCoverStoreImgToBase64URLCover(event) {
    var filesSelected = document.getElementById("uploadItemImageCover").files;
    var img = new Image();
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            img.onload = function () {
                if ((this.height / this.width) < 1.5 && fileToLoad.size <= 2000000) {
                    document.getElementById("errImgDiv").style.display = 'none';
                    BaseImg64 = fileLoadedEvent.target.result;
                    UploadImageCover(BaseImg64);
                } else {
                    document.getElementById("errImgDiv").style.display = 'block';
                }
            };
            
        };
        fileReader.readAsDataURL(fileToLoad);
        img.src = _URL.createObjectURL(fileToLoad);
    }
};

function UploadImageCover(_BaseImg64) {
    $('#imgItemCover').attr('src', _BaseImg64);
};