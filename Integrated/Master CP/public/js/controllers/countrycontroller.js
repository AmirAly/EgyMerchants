egm.controller("countryController", function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };
    //console.log(localStorage.getItem('CheckedCategories'));
    //console.log(localStorage.getItem('countryId'));
    $scope.countryId = localStorage.getItem('countryId');
    $scope.CheckedCategoriesId = localStorage.getItem('CheckedCategories');

    $scope.init = function (_categorieslst) {
        $scope.categories = JSON.parse(_categorieslst);
        //console.log('entered');
        for (var i = 0; i < $scope.categories.length; i++) {
            console.log($scope.categories[i]._id);
            for (var j = 0; j < $scope.CheckedCategoriesId.length; j++) {
                //console.log('entered');
                console.log($scope.CheckedCategoriesId[j]);
                if ($scope.categories[i]._id == $scope.CheckedCategoriesId[j]) {
                    console.log($scope.categories[i]._id);
                    console.log($scope.CheckedCategoriesId[j]);
                    $scope.category[i].checked = true;
                }
            }
        }
    };
    
    


    $scope.updateCountry = function () {
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Country/Edit',
            data: {
                _id: $scope.countryId,
                Name: $scope.country.Name,
                IsoCode: $scope.country.IsoCode,
                Flag: $('#imgItem').attr('src'),
                WelcomeMsg: $scope.country.WelcomeMsg,
                Status: "Active"
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