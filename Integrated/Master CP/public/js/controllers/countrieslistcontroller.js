egm.controller("countriesListController", function ($scope, API) {

    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click();
    };

    $scope.init = function (_categories , _countries) {
        $scope.categories = JSON.parse(_categories);
        $scope.countries = JSON.parse(_countries);
    };

    var checkboxesChecked = [];
    $scope.addCountry = function (optionsCheckboxes) {
        $scope.loading = true;
        for (var i = 0; i < $scope.categories.length; i++) {
            if ($scope.categories[i].checked) {
                JSON.parse(checkboxesChecked.push($scope.categories[i]._id));
            }
        }

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
            if (_res.data.code == 100) {
                 window.location.reload();
            } else {
                $scope.loading = false;
                if (_res.data.code == 21) {
                    console.log('Already Exist');
                    $scope.loading = false;
                } else {
                    $scope.loading = false;
                }
            }
        });
    };

    $scope.editCountry = function (_id , categories) {
       window.location.href = '/eg/country/' + _id;
    };

    $scope.callDelModal = function (_countryId) {
        console.log(_countryId);
        $scope.countryDelId = _countryId;
    };

    $scope.removeCountry = function (_id) {
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Country/Suspend',
            data: {
                _id: _id
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                window.location.reload();
            } else {
                $scope.loading = false;
                console.log(_res);
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