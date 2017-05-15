app.controller("itemController", function ($scope, $state, $rootScope, API, $stateParams, $location,Theme) {
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
    $scope.item = [{
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


    //$scope.updateObj = function () {
    //    var req = {
    //        method: 'put',
    //        url: '/item',
    //        data: {}
    //    }
    //    API.execute(req).then(function (_res) {
    //        if (_res.data.code == 100) {
    //            console.log(_res.data.data);
    //            $scope.item.Title = _res.data.Title;
    //            $scope.item.Description = _res.data.Description;
    //            $scope.item.DisplayPicture = _res.data.DisplayPicture;
    //        }
    //    });
    //};

    //$scope.saveObj = function () {
    //    var req = {
    //        method: 'post',
    //        url: '/item',
    //        data: {
    //            Title : $scope.item.Title,
    //            Description : $scope.item.Description,
    //            DisplayPicture : $scope.item.DisplayPicture
    //        }
    //    }
    //    API.execute(req).then(function (_res) {
    //        if (_res.data.code == 100) {
    //            console.log(_res.data.data);
    //        }
    //    });
    //};

    //$scope.editeObj = function () {
    //    var req = {
    //        method: 'put',
    //        url: '/picture',
    //        data: {}
    //    }
    //    API.execute(req).then(function (_res) {
    //        if (_res.data.code == 100) {
    //            console.log(_res.data.data);
    //            $scope.picture.Title = _res.data.Title;
    //            $scope.picture.Description = _res.data.Description;
    //            $scope.picture.DisplayPicture = _res.data.DisplayPicture;
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
