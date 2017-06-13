egm.controller("countriesListController", function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };

    //var checkboxesChecked = [];
    //function getCheckedBoxes(optionsCheckboxes) {
    //    var checkboxes = document.getElementsByName(optionsCheckboxes);
    //    // loop over them all
    //    for (var i = 0; i < checkboxes.length; i++) {
    //        // And stick the checked ones onto an array...
    //        console.log(checkboxes[i].checked)
    //        if (checkboxes[i].checked) {
    //            checkboxesChecked.push(checkboxes[i].value);
    //        }
    //    }
    //    console.log(checkboxesChecked);
    //    // Return the array if it is non-empty, or null
    //    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
    //};
    //var checkedBoxes = getCheckedBoxes("optionsCheckboxes");
    //console.log(checkedBoxes);

    
    $scope.addCountry = function () {
        //$scope.loading = true;
        console.log('entered');
        var req = {
            method: 'post',
            url: '/Country/Add',
            data: {
                Name: $scope.country.Name,
                IsoCode: $scope.country.IsoCode,
                Flag: $('#imgItem').attr('src'),
                WelcomeMsg: $scope.country.WelcomeMsg,
                Status: "Active"
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                //getCheckedBoxes
                console.log($scope.checkedCategory);
                //var checkedBoxes = getCheckedBoxes("optionsCheckboxes");
                console.log(checkedBoxes);
                //window.location.reload();
            } else {
                if (_res.data.code == 21) {
                    console.log('Already Exist');
                    $scope.loading = false;
                } else {
                    $scope.loading = false;
                }
            }
        });
    };

    $scope.editCountry = function (_id) {
        window.location.href = '/eg/country/' + _id;
        console.log(_id);
        localStorage.setItem('countryId', _id);
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
    }
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