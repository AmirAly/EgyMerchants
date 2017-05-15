app.controller("galleryController", function ($scope, $state, $rootScope, API, $stateParams, $location, Theme) {
    Theme.init();
    $("navbar-toggle").click(function () {
        $("html").toggleClass("nav-open");
    });

    $('.form-control').on("focus", function () {
        $(this).parent().addClass("input-group-focus");
        $(this).parent().removeClass("is-empty");
    }).on("blur", function () {
        $(this).parent().removeClass("input-group-focus");
        // no data
        if ($(this)[0].value == "" || $(this)[0].value == null || typeof $(this)[0].value === 'undefined') {
            $(this).parent().addClass("is-empty");
            console.log($(this)[0].value);
        } else {
            $(this).parent().removeClass("is-empty");
            console.log($(this)[0].value);
        }
    });

    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    }

    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    }


    //$scope.updateObj = function () {
    //    var req = {
    //        method: 'put',
    //        url: '/gallery',
    //        data: {}
    //    }
    //    API.execute(req).then(function (_res) {
    //        if (_res.data.code == 100) {
    //            console.log(_res.data.data);
    //            $scope.gallery.Title = _res.data.Title;
    //            $scope.gallery.Description = _res.data.Description;
    //            $scope.gallery.DisplayPicture = _res.data.DisplayPicture;
    //        }
    //    });
    //};

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
}

function UploadImage(_BaseImg64) {
    $('#imgItem').attr('src', _BaseImg64);
}
