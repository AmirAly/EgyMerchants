egm.controller("itemController", function ($scope, API) {
    //$scope.itemPictures = [];
    $scope.currentItem = {
        Name: 'Appout',
        Description: 'company',
        Pictures: [{
            Title: 'appout',
            URL: 'http/appout.co'
        }],
        Price: '20',
        PriceBeforeSale: '15',
        Rate: '5',
        Sold: '2',
        Tags: 'TopRated',
        Badges: 'onSale',
        Store: '123',
        Gallery: '123'
    };
    $scope.storeId = localStorage.getItem('StoreId');
    $scope.galleryId = localStorage.getItem('GalleryId');
    console.log(localStorage.getItem('ItemId'));
    $scope.itemId = localStorage.getItem('ItemId');
    $scope.init = function (_s) {
        $scope.currentItem = JSON.parse(_s);
    }


    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };
    $scope.picAddModal = {};

    $scope.addPic = function () {
        $scope.picAddModal.Title = $scope.picAddModalTitle;
        $scope.picAddModal.URL = $('#imgItem').attr('src');
        $scope.currentItem.Pictures.push($scope.picAddModal);
        $scope.dismiss();
    };

    $scope.picEditModal = {};
    $scope.editItemPic = function (_item) {
        //open modal edit
        console.log(_item);
        $scope.picEditModal.Title = _item.Title;
        $scope.picEditModal._id = _item._id;
        $scope.picEditModal.URL = $('#imgItem').attr('src');
    };

    $scope.editePic = function () {
        //sava modal edit
        for (var i = 0; i < $scope.currentItem.Pictures.length; i++) {
            if ($scope.currentItem.Pictures[i]._id == $scope.picEditModal._id) {
                $scope.currentItem.Pictures[i] = $scope.picEditModal;
            }
        }
        $scope.dismiss();
    };

    $scope.updateItem = function () {
        var req = {
            method: 'put',
            url: '/Item/Edit',
            data: {
                _id: $scope.itemId,//'59089186734d1d3098a85879'
                Name: $scope.item.Name,
                Description: $scope.item.Description,
                Imgs: $scope.currentItem.Pictures
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