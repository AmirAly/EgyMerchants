app.controller("galleriesController", function ($scope, $state, $rootScope, API, $stateParams, $location, Theme) {
    Theme.init();
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
    //var img = document.getElementById("imgClient");
    //BaseImg64 = img.src;

    //img uploader

    $scope.ShowFileSelector = function () {

        var fileuploader = angular.element("#uploadClientImage");
        fileuploader.trigger('click');

    }

});

function convertImgToBase64URL(event) {
    var filesSelected = document.getElementById("uploadClientImage").files;
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
    $('#imgClient').attr('src', _BaseImg64);
    var img = document.getElementById("imgClient");
    //console.log(img.src);
    var newImg = imageToDataUri(img, 150, 150);
    $('#imgClient').attr('src', newImg);
    BaseImg64 = img.src;
    //console.log(BaseImg64);
}

function imageToDataUri(img, width, height) {
    // create an off-screen canvas
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    // set its dimension to target size
    canvas.width = width;
    canvas.height = height;

    // draw source image into the off-screen canvas:
    ctx.drawImage(img, 0, 0, width, height);

    // encode image to data-uri with base64 version of compressed image
    return canvas.toDataURL();
}

function uploadPhoto(data) {
    if (data.indexOf('base64') < 0) {
        $('#imgClient').attr('src', 'data:image/jpeg;base64,' + data);
    }
    else {
        $('#imgClient').attr('src', data);
    }
    BaseImg64 = data;
}
