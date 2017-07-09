egm.controller("itemsController", function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };

    $scope.preload = function () {
        if (localStorage.getItem('StoreId') == null || localStorage.getItem('StoreId') == '') {
            window.location.href = '/Home';
        }
    };

    $scope.preload();

    $scope.galleryId = localStorage.getItem('GalleryId');
    $scope.storeId = localStorage.getItem('StoreId');

    $scope.moveToItem = function (_itemId) {
        window.location.href = '/p/product/' + _itemId;
    };

    $scope.signOut = function () {
        window.location.href = '/Home';
        localStorage.clear();
    };

    $scope.addItem = function () {
        $scope.loading = true;
        var req = {
            method: 'post',
            url: '/Item/Add',
            data: {
                Name: $scope.item.Name,
                Description: $scope.item.Description,
                Pictures: [{
                    Title: $scope.item.Title,
                    URL: $('#imgItem').attr('src')
                }],
                Price: $scope.item.Price,
                Store: $scope.storeId,
                Gallery: $scope.galleryId
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                $scope.itemId = _res.data.data._id;
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