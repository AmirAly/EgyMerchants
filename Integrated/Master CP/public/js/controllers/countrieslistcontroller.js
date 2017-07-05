﻿egm.controller("countriesListController", function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click();
    };

    $scope.init = function (_categories , _countries) {
        $scope.categories = JSON.parse(_categories);
        $scope.countries = JSON.parse(_countries);
        console.log($scope.countries);
    };

    var checkboxesChecked = [];
    $scope.addCountry = function (optionsCheckboxes) {
        $scope.loading = true;
        console.log('entered');
        for (var i = 0; i < $scope.categories.length; i++) {
            if ($scope.categories[i].checked) {
                JSON.parse(checkboxesChecked.push($scope.categories[i]._id));
            }
        }
        console.log(checkboxesChecked);

        var req = {
            method: 'post',
            url: '/Country/Add',
            data: {
                Name: $scope.country.Name,
                IsoCode: $scope.country.IsoCode,
                Flag: $('#imgItem').attr('src'),
                WelcomeMsg: $scope.country.WelcomeMsg,
                Status: "Active",
                Categories: checkboxesChecked
            }
        }
        API.execute(req).then(function (_res) {
            console.log(_res);

            if (_res.data.code == 100) {
                 window.location.reload();
            } else {
                if (_res.data.code == 21) {
                    console.log('Already Exist');
                    $scope.loading = false;
                } else {
                    $scope.loading = false;
                }
            }
        });
        console.log(checkboxesChecked);
    };

    $scope.editCountry = function (_id , categories) {
       window.location.href = '/eg/country/' + _id;
        console.log(_id);
        console.log(categories);
       
    };

    $scope.removeCountry = function (_id) {
        var req = {
            method: 'put',
            url: '/Country/Suspend',
            data: {
                _id: _id
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                console.log('deleted');
                window.location.reload();
            } else {
                console.log('err');
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