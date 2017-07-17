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
<<<<<<< HEAD
                window.location.href = '/countrieslist'
=======
                window.location.href = '/eg/countrieslist'
>>>>>>> d8533afff7a9d35c04581998312cd97fadad366c

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
<<<<<<< HEAD
        window.location.href = '/Home';
=======
        window.location.href = '/eg/Home';
>>>>>>> d8533afff7a9d35c04581998312cd97fadad366c
        localStorage.clear();
    };

});
<<<<<<< HEAD
var _URL = window.URL || window.webkitURL;
function convertEditCountryImgToBase64URL(event) {
    var filesSelected = document.getElementById("uploadItemImage").files;
    var img = new Image();
=======

function convertImgToBase64URL(event) {
    var filesSelected = document.getElementById("uploadItemImage").files;
>>>>>>> d8533afff7a9d35c04581998312cd97fadad366c
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
<<<<<<< HEAD
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
=======
            BaseImg64 = fileLoadedEvent.target.result;
            UploadImage(BaseImg64);
        };
        fileReader.readAsDataURL(fileToLoad);
>>>>>>> d8533afff7a9d35c04581998312cd97fadad366c
    }
};

function UploadImage(_BaseImg64) {
    $('#imgItem').attr('src', _BaseImg64);
};