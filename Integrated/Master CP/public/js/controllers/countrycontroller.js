egm.controller("countryController", function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };

    //$scope.updateCountry = function () {
    //    var req = {
    //        method: 'put',
    //        url: '/Country/Edit',
    //        data: {
    //            Name: $scope.country.Name,
    //            IsoCode: $scope.country.IsoCode,
    //            Flag: $('#imgItem').attr('src'),
    //            WelcomeMsg: $scope.country.WelcomeMsg,
    //            Status: "Active"
    //        }
    //    }
    //    API.execute(req).then(function (_res) {
    //        console.log(_res);
    //    });
    //}

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