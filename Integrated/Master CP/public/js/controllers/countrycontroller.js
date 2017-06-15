﻿egm.controller("countryController", function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };

    $scope.countryId = localStorage.getItem('countryId');
    $scope.CheckedCategoriesId = JSON.parse(localStorage.getItem('CheckedCategories'));
    console.log($scope.CheckedCategoriesId);

    $scope.init = function (_categorieslst) {
        $scope.categories = JSON.parse(_categorieslst);
        for (var i = 0; i < $scope.categories.length; i++) {
            for (var j = 0; j < $scope.CheckedCategoriesId.length; j++) {
                
                if ($scope.categories[i]._id == $scope.CheckedCategoriesId[j]) {
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
        console.log(checkboxesChecked);
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
                console.log(_res);
                window.location.reload();
                window.location.href = '/eg/countrieslist'

            } else {
                $scope.loading = false;
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