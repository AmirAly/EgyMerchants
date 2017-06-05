﻿egm.controller("itemController", function ($scope, $timeout, API) {
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

    $scope.preload = function () {
        if (localStorage.getItem('StoreId') == null || localStorage.getItem('StoreId') == '') {
            window.location.href = '/eg/Home';
        }
    };

    $scope.preload();


    $scope.storeId = localStorage.getItem('StoreId');
    $scope.galleryId = localStorage.getItem('GalleryId');
    console.log(localStorage.getItem('ItemId'));
    $scope.itemId = localStorage.getItem('ItemId');
    $scope.init = function (_s) {
        $scope.currentItem = JSON.parse(_s);
    };

    //$scope.item.PriceBeforeSale = 000;

    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click();
    };
    $scope.ShowFileSelectorAdd = function () {
        document.getElementById('uploadNewItemImage').click();
    };
    $scope.picAddModal = {};

    //add pic
    $scope.alertWarning = true;

    $scope.addPic = function (_frmAddPic) {
        $scope.picAddModal.Title = $scope.picAddModalTitle;
        $scope.picAddModal.URL = $('#imgAddItem').attr('src');
        $scope.currentItem.Pictures.push($scope.picAddModal);
        $scope.picAddModal = {};
        _frmAddPic.$setPristine();
        _frmAddPic.$setUntouched();
        $scope.picAddModalTitle = '';
        $('#imgAddItem').attr('src', '/img/add.gif');
        $scope.dismiss2();
    };

    //edit pic
    $scope.picEditModal = {};
    $scope.editItemPic = function (_item) {
        //open modal edit
        console.log(_item);
        $scope.picEditModal.Title = _item.Title;
        $scope.picEditModal._id = _item._id;
        $scope.picEditModal.URL = _item.URL;



        //$('#imgItem').attr('src', _item.URL);
    };
    $scope.alertWarningEdite = true;
    $scope.editePic = function () {
        //save modal edit
        $scope.picEditModal.URL = $('#imgItem').attr('src');

        for (var i = 0; i < $scope.currentItem.Pictures.length; i++) {
            if ($scope.currentItem.Pictures[i]._id == $scope.picEditModal._id) {
                console.log($scope.picEditModal);
                console.log($scope.currentItem.Pictures[i]);
                $scope.currentItem.Pictures[i].Title = $scope.picEditModal.Title;
                $scope.currentItem.Pictures[i].URL = $scope.picEditModal.URL;
                $scope.dismiss();
            }
        }

    };
    
    var tagVal = $("#TagsInput").val();
    var badgesVal = $("#BadgesInput").val();
    console.log(badgesVal);
    console.log(tagVal);
    if (tagVal == "undefined") {
        console.log('true');
        $('#TagsInput').tagsinput('removeAll');
    }
    if (badgesVal == "undefined") {
        console.log('true');
        $('#BadgesInput').tagsinput('removeAll');
    }
   
    $scope.signOut = function () {
        window.location.href = '/eg/Home';
        localStorage.clear();
    };

    $scope.updateItem = function () {
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Item/Edit',
            data: {
                _id: $scope.itemId,//'59089186734d1d3098a85879'
                Name: $scope.item.Name,
                Description: $scope.item.Description,
                Price: $scope.item.Price,
                Imgs: $scope.currentItem.Pictures,
                Tags: $scope.item.Tags,
                Badges: $scope.item.Badges,
                PriceBeforeSale: $scope.item.PriceBeforeSale
            }
        }
        API.execute(req).then(function (res) {
            if (res.data.code == 100) {
                console.log(res.data.data);
                window.location.reload();
            } else {
                console.log('err');
                $scope.loading = false;
            }
        });
    };
});

//////add new pic
function convertImgToBase64URLInAdd(event) {
    var filesSelected = document.getElementById("uploadNewItemImage").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            BaseImg64 = fileLoadedEvent.target.result;
            UploadImageAdd(BaseImg64);
        };
        fileReader.readAsDataURL(fileToLoad);
    }
};

function UploadImageAdd(_BaseImg64) {
    $('#imgAddItem').attr('src', _BaseImg64);
};

///////edit pic
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