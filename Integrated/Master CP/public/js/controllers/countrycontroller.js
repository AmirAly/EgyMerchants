egm.controller("countryController", function ($scope, API) {

    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };

    $scope.CheckedCategoriesId = JSON.parse(localStorage.getItem('CheckedCategories'));

    $scope.init = function (_categorieslst, _country) {
        $scope.categories = JSON.parse(_categorieslst);
        $scope.countryObj = JSON.parse(_country);
        $scope.countryId = $scope.countryObj._id;
        $scope.checkedCategories = $scope.countryObj.Categories;
        for (var i = 0; i < $scope.categories.length; i++) {
            for (var j = 0; j < $scope.checkedCategories.length; j++) {
                
                if ($scope.categories[i]._id == $scope.checkedCategories[j]._id) {
                    $scope.categories[i].checked = true;
                }
            }
        }
    };
    
    var checkboxesChecked = [];
    $scope.updateCountry = function () {
        $scope.loading = true;
        for (var i = 0; i < $scope.categories.length; i++) {
            if ($scope.categories[i].checked) {
                JSON.parse(checkboxesChecked.push($scope.categories[i]._id));
            }
        }
        var req = {
            method: 'put',
            url: '/Country/Edit',
            data: {
                _id: $scope.countryId,
                Name: $scope.country.Name,
                IsoCode: $scope.country.IsoCode,
                Flag: $('#imgItem').attr('src'),
                WelcomeMsg: $scope.country.WelcomeMsg,
                Status: "Active",
                Categories: checkboxesChecked
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