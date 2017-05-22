egm.controller("itemsController", function ($scope, API, $rootScope) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };
    $scope.addItem = function () {
        var req = {
            method: 'post',
            url: '/Item/Add',
            data: {
                Name: $scope.item.Title,
                Description: $scope.item.Description,
                Pictures: [{
                    Title: $scope.item.Title,
                    URL: $('#imgItem').attr('src')
                }],
                Price: '',
                Store: $rootScope.storeId,
                Gallery: $rootScope.gallerId
            }
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                window.location.reload();
                $rootScope.itemId = res.data._id;
                console.log('id:', itemId); //"591cd30b2b99d00af8affaa0"
            }
        });
    };
});