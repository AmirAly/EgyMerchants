app.controller("galleriesController", function ($scope, $state, $rootScope, API, $stateParams, $location, Theme) {
    Theme.init();
    $("navbar-toggle").click(function () {
        $("html").toggleClass("nav-open");
    });

    $scope.galleries = [{
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
    //var img = document.getElementById("imgClient");
    //BaseImg64 = img.src;

    //img uploader


    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    }

    //$scope.saveObject = function () {
    //    // new img from modal 
    //    var itemImg = $('#imgItem').attr('src');
    //    var obj = {};
    //    obj.img = itemImg;
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
}

function UploadImage(_BaseImg64) {
    $('#imgItem').attr('src', _BaseImg64);
}
