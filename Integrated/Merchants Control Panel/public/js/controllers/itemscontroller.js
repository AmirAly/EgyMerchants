app.controller("itemsController", function ($scope, $state, $rootScope, API, $stateParams, $location, Theme) {
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
    $scope.gallery = [{
        DisplayPicture: "img/cover.jpeg",
        Title: "Completed Tasks",
        Description: "Last Campaign Performance"
    }, {
        DisplayPicture: "img/cover.jpeg",
        Title: "Completed Tasks",
        Description: "Last Campaign Performance"
    }, {
        DisplayPicture: "img/cover.jpeg",
        Title: "Completed Tasks",
        Description: "Last Campaign Performance"
    }
    ];

    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    }

    //var req = {
    //    method: 'get',
    //    url: '/items',
    //    data: {}
    //}
    //API.execute(req).then(function (_res) {
    //    if (_res.data.code == 100) {
    //        console.log(_res.data.data);
    //        $scope.item.Title =_res.data.data.Title,
    //        $scope.item.Description=_res.data.data.Description,
    //        $('#imgGallery').attr('src') = _res.data.data.DisplayPicture
    //    }
    //});

    //$scope.saveObj = function () {
    //    var req = {
    //        method: 'post',
    //        url: '/items',
    //        data: {
    //            Title : $scope.item.Title,
    //            Description : $scope.item.Description,
    //            DisplayPicture: $('#imgGallery').attr('src')
    //        }
    //    }
    //    API.execute(req).then(function (_res) {
    //        if (_res.data.code == 100) {
    //            console.log(_res.data.data);
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
