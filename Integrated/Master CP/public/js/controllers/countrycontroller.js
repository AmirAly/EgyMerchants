egm.controller("countryController", function ($scope, API) {
    $scope.preload = function () {
        if (localStorage.getItem('admin') == null || localStorage.getItem('admin') == '') {
            window.location.href = '/Home';
        }
    };
    $scope.preload();

    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };
    $scope.currentCountry = JSON.parse((window.countryObject).replace(/&quot;/g, '"'));

    $scope.updateCountry = function () {
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Country/Edit',
            data: {
                _id: $scope.currentCountry._id,
                Name: $scope.currentCountry.Name,
                IsoCode: $scope.currentCountry.IsoCode,
                Flag: $('#imgItem').attr('src'),
                WelcomeMsg: $scope.currentCountry.WelcomeMsg,
                Status: "Active",
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                window.location.reload();
                window.location.href = '/countrieslist'

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

});
var _URL = window.URL || window.webkitURL;
function convertEditCountryImgToBase64URL(event) {
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