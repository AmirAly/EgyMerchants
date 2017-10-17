﻿egm.controller("itemController", function ($scope, $timeout, API) {

    $scope.preload = function () {
        if (localStorage.getItem('StoreId') == null || localStorage.getItem('StoreId') == '') {
            window.location.href = '/Home';
        }
    };

    $scope.currentItem = JSON.parse((window.itemObject).replace(/&quot;/g, '"'));

    $scope.preload();

    $('.modal').on('hidden.bs.modal', function () {
        document.getElementById("frmAddPic").reset();
        $scope.frmAddPic.$setUntouched();
        $scope.frmAddPic.$setPristine();
        $scope.isEmpty = true;
        $scope.picAddModalTitle = '';
        $scope.picEditModal.Title = $scope.picEditModal.Title;
        document.getElementById("errImgDiv").style.display = 'none';
        document.getElementById("errImgDivEdit").style.display = 'none';
        $('#imgAddItem').attr('src', "data:image/gif;base64,R0lGODlh6ANYAsQAAOTk5N7e3ufn5+jo6Ozs7Obm5vPz89/f3/T09ODg4PHx8e/v7/Dw8PLy8uPj4+3t7eLi4u7u7urq6uHh4eXl5enp6evr693d3fX19QAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAADoA1gCAAX/ICaOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wADChxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhT/6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gw4odS7as2bNo06pdy7at27dw48qdS7eu3bt48+rdy7ev37+AAwseTLiw4cOIEytezLix48eQI0ueTLmy5cuYM2vezLmz58+gQ4seTbq06dOoU6tezbq169ewY8ueTbu27du4c+vezbu379/AgwsfTry48ePIkytfzry58+fQo0ufTr269evYs2vfzr279+/gw4sfT768+fPo06tfz769+/fw48ufT7++/fv48+vfz7+///8ABijggAQWaOCBCCao4P+CDDbo4IMQRijhhBRWaOGFGGao4YYcdujhhyCGKOKIJJZo4okopqjiiiy26OKLMMYo44w01mjjjTjmqOOOPPbo449ABinkkEQWaeSRSCap5JJMNunkk1BGKeWUVFZp5ZVYZqnlllx26eWXYIYp5phklmnmmWimqeaabLbp5ptwxinnnHTWaeedeOap55589unnn4AGKuighBZq6KGIJqrooow26uijkEYq6aSUVmrppZhmqummnHbq6aeghirqqKSWauqpqKaq6qqsturqq7DGKuurCDBgQQEOAKDrrrz26uuvwAYrLK8OFCDBAgjM+pIBFjiQQAAXRCvttNRWa+3/tdhm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");
        $('#imgItem').attr('src', $scope.picEditModal.URL);
        $scope.$apply();
    });


    $scope.storeId = localStorage.getItem('StoreId');
    $scope.galleryId = localStorage.getItem('GalleryId');
    
    $scope.setItem = function (_id, _obj) {
        $scope.selectedItem = _id;
        $scope.imgObj = _obj;
    }

    $scope.delete = function () {
        if (typeof $scope.selectedItem == 'undefined') {
            // delete $scope.imgObj
            $scope.currentItem.Pictures.splice($scope.currentItem.Pictures.indexOf($scope.imgObj), 1);
            angular.element('.deleteModal').modal('hide');
        } else {        
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Item/RemoveImage',
            data: { _imageid: $scope.selectedItem, _itemid:$scope.currentItem._id }
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                window.location.reload();
            } else {
                $scope.loading = false;
                $scope.galleryerrMsg = true;
                $scope.galleryerrdiv = true;
                $scope.galleryerrorMsg = _res.data.data;
            }
        });
        }
    }


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
        $('#imgAddItem').attr('src', 'data:image/gif;base64,R0lGODlh6ANYAsQAAOTk5N7e3ufn5+jo6Ozs7Obm5vPz89/f3/T09ODg4PHx8e/v7/Dw8PLy8uPj4+3t7eLi4u7u7urq6uHh4eXl5enp6evr693d3fX19QAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAADoA1gCAAX/ICaOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wADChxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhT/6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gw4odS7as2bNo06pdy7at27dw48qdS7eu3bt48+rdy7ev37+AAwseTLiw4cOIEytezLix48eQI0ueTLmy5cuYM2vezLmz58+gQ4seTbq06dOoU6tezbq169ewY8ueTbu27du4c+vezbu379/AgwsfTry48ePIkytfzry58+fQo0ufTr269evYs2vfzr279+/gw4sfT768+fPo06tfz769+/fw48ufT7++/fv48+vfz7+///8ABijggAQWaOCBCCao4P+CDDbo4IMQRijhhBRWaOGFGGao4YYcdujhhyCGKOKIJJZo4okopqjiiiy26OKLMMYo44w01mjjjTjmqOOOPPbo449ABinkkEQWaeSRSCap5JJMNunkk1BGKeWUVFZp5ZVYZqnlllx26eWXYIYp5phklmnmmWimqeaabLbp5ptwxinnnHTWaeedeOap55589unnn4AGKuighBZq6KGIJqrooow26uijkEYq6aSUVmrppZhmqummnHbq6aeghirqqKSWauqpqKaq6qqsturqq7DGKuurCDBgQQEOAKDrrrz26uuvwAYrLK8OFCDBAgjM+pIBFjiQQAAXRCvttNRWa+3/tdhm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');
        $scope.dismiss2();
    };

    //edit pic
    $scope.picEditModal = {};
    $scope.editItemPic = function (_item) {
        //open modal edit
        $scope.picEditModal.Title = _item.Title;
        $scope.picEditModal._id = _item._id;
        $scope.picEditModal.URL = _item.URL;
    };

    $scope.alertWarningEdite = true;
    $scope.editePic = function () {
        //save modal edit
        $scope.picEditModal.URL = $('#imgItem').attr('src');

        for (var i = 0; i < $scope.currentItem.Pictures.length; i++) {
            if ($scope.currentItem.Pictures[i]._id == $scope.picEditModal._id) {
                $scope.currentItem.Pictures[i].Title = $scope.picEditModal.Title;
                $scope.currentItem.Pictures[i].URL = $scope.picEditModal.URL;
                $scope.dismiss();
            }
        }

    };
    
    var tagVal = $("#TagsInput").val();
    var badgesVal = $("#BadgesInput").val();
    
    if (tagVal == "undefined") {
        $('#TagsInput').tagsinput('removeAll');
    }
    if (badgesVal == "undefined") {
        $('#BadgesInput').tagsinput('removeAll');
    }
   
    $scope.signOut = function () {
        window.location.href = '/Home';
        localStorage.clear();
    };

    $scope.updateItem = function () {
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Item/Edit',
            data: {
                _id: $scope.currentItem._id,
                Name: $scope.currentItem.Name,
                Description: $scope.currentItem.Description,
                Price: $scope.currentItem.Price,
                Imgs: $scope.currentItem.Pictures,
                Tags: $scope.currentItem.Tags,
                Badges: $scope.currentItem.Badges,
                PriceBeforeSale: $scope.currentItem.PriceBeforeSale
            }
        }
        console.log(req);
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                window.location.reload();
            } else {
                $scope.loading = false;
                if (_res.data.code == 21) {
                    $scope.errMsg = true;
                    $scope.errdiv = true;
                    $scope.errorMsg = _res.data.data;
                } else {
                    $scope.loading = false;
                    $scope.errMsg = true;
                    $scope.errdiv = true;
                    $scope.errorMsg = _res.data.data;
                }
            }
        });
    };

});

//////add new pic
var _URL = window.URL || window.webkitURL;
function convertAddItemPicToBase64URLInAdd(event) {
    var filesSelected = document.getElementById("uploadNewItemImage").files;
    var img = new Image();
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            img.onload = function () {
                if ((this.height / this.width) < 1.5 && fileToLoad.size <= 2000000) {
                    document.getElementById("errImgDiv").style.display = 'none';
                    BaseImg64 = fileLoadedEvent.target.result;
                    UploadImageAdd(BaseImg64);
                } else {
                    document.getElementById("errImgDiv").style.display = 'block';
                    $('#imgAddItem').attr('src', "data:image/gif;base64,R0lGODlh6ANYAsQAAOTk5N7e3ufn5+jo6Ozs7Obm5vPz89/f3/T09ODg4PHx8e/v7/Dw8PLy8uPj4+3t7eLi4u7u7urq6uHh4eXl5enp6evr693d3fX19QAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAADoA1gCAAX/ICaOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8Lh8Tq/b7/i8fs/v+/+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wADChxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhT/6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gw4odS7as2bNo06pdy7at27dw48qdS7eu3bt48+rdy7ev37+AAwseTLiw4cOIEytezLix48eQI0ueTLmy5cuYM2vezLmz58+gQ4seTbq06dOoU6tezbq169ewY8ueTbu27du4c+vezbu379/AgwsfTry48ePIkytfzry58+fQo0ufTr269evYs2vfzr279+/gw4sfT768+fPo06tfz769+/fw48ufT7++/fv48+vfz7+///8ABijggAQWaOCBCCao4P+CDDbo4IMQRijhhBRWaOGFGGao4YYcdujhhyCGKOKIJJZo4okopqjiiiy26OKLMMYo44w01mjjjTjmqOOOPPbo449ABinkkEQWaeSRSCap5JJMNunkk1BGKeWUVFZp5ZVYZqnlllx26eWXYIYp5phklmnmmWimqeaabLbp5ptwxinnnHTWaeedeOap55589unnn4AGKuighBZq6KGIJqrooow26uijkEYq6aSUVmrppZhmqummnHbq6aeghirqqKSWauqpqKaq6qqsturqq7DGKuurCDBgQQEOAKDrrrz26uuvwAYrLK8OFCDBAgjM+pIBFjiQQAAXRCvttNRWa+3/tdhm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");
                }
            };

        };
        fileReader.readAsDataURL(fileToLoad);
        img.src = _URL.createObjectURL(fileToLoad);
    }
};

function UploadImageAdd(_BaseImg64) {
    $('#imgAddItem').attr('src', _BaseImg64);
};

///////edit pic
var _URL = window.URL || window.webkitURL;
function convertEditItemPicToBase64URL(event) {
    var filesSelected = document.getElementById("uploadItemImage").files;
    var img = new Image();
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            img.onload = function () {
                if ((this.height / this.width) < 1.5 && fileToLoad.size <= 2000000) {
                    document.getElementById("errImgDivEdit").style.display = 'none';
                    BaseImg64 = fileLoadedEvent.target.result;
                    UploadImage(BaseImg64);
                } else {
                    document.getElementById("errImgDivEdit").style.display = 'block';
                }
            };

        };
        fileReader.readAsDataURL(fileToLoad);
        img.src = _URL.createObjectURL(fileToLoad);
    }
};

function UploadImage(_BaseImg64) {
    $('#imgItem').attr('src', _BaseImg64);
};