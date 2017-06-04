egm.controller("itemsController", function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };

    $scope.preload = function () {
        if (localStorage.getItem('StoreId') == null || localStorage.getItem('StoreId') == '') {
            window.location.href = '/eg/Home';
        }
    };

    $scope.preload();

    $scope.galleryId = localStorage.getItem('GalleryId');
    console.log(localStorage.getItem('GalleryId'));
    $scope.storeId = localStorage.getItem('StoreId');

    $scope.moveToItem = function (_itemId) {
        localStorage.setItem('ItemId', _itemId);
        window.location.href = '/eg/p/product/' + _itemId;
    };

    $scope.signOut = function () {
        window.location.href = '/eg/Home';
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
            console.log(_res);
            if (_res.data.code == 100) {
                $scope.itemId = _res.data.data._id;
                console.log('id:', $scope.itemId); //"591cd30b2b99d00af8affaa0"
                window.location.reload();
            } else {
                $scope.loading = false;
            }
        });
    };
});