egm.controller("itemController", function ($scope, API) {
    $scope.itemPictures = [];
    setTimeout(function () {

        console.log($('#imgsArray').text(imgsArray));

        $scope.itemPictures.push($('#imgsArray').text());
    }, 500)
    
    //$scope.itemPictures = [{
    //    Title: "Completed Tasks",
    //    Img: "/img/cover.jpeg",
    //    Desc: "Last Campaign Performance"
    //}, {
    //    Title: "Completed Tasks",
    //    Img: "/img/cover.jpeg",
    //    Desc: "Last Campaign Performance"
    //}, {
    //    Title: "Completed Tasks",
    //    Img: "/img/cover.jpeg",
    //    Desc: "Last Campaign Performance"
    //}];
    //var arrPictures = [];

    
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };
$scope.picAddModal = {};
    $scope.addPic = function () {
        $scope.picAddModal.Title = $scope.picAddModalTitle;
        $scope.picAddModal.URL = $('#imgItem').attr('src');
        $scope.itemPictures.push($scope.picAddModal);
        $scope.dismiss();
    };
    

    $scope.updateItem = function () {
        var req = {
            method: 'put',
            url: '/Item/Edit',
            data: {
                _id: '59089186734d1d3098a85879',
                Name: $scope.item.Name,
                Description: $scope.item.Description,
                Imgs: $scope.itemPictures
            }
        }
        API.execute(req).then(function (res) {
            console.log('1');
            if (res.data.code == 100) {
                console.log(res);
                window.location.reload();
            } else {
                console.log('err');
            }
        });
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