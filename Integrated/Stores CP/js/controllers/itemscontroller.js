app.controller("itemsController", function ($scope, $state, $rootScope, $stateParams, API) {
    $rootScope.pageHeader = '';
    $scope.items = [];
    if ($stateParams.galleryid !='') {
        var req = {
            method: 'get',
            url: '/Items/' + $stateParams.galleryid,
            data: {}
        }
        $rootScope.loading = true;
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                $scope.items = _res.data.data;
            }
            else if(_res.data.code == 21) { 
                $scope.showMessage = true;
                $scope.messageTxt = _res.data.data;
                $scope.messageStatus = 'warning';
            }
        }, function (error) {
            $scope.showMessage = true;
            $scope.messageTxt = 'Something went wrong, Please try again later';
            $scope.messageStatus = 'warning';
        })
        .finally(function () {
            $rootScope.loading = false;
        });
    }
    
    $scope.addNewItem = function () {
        $rootScope.chosenItem = [];
        $state.go('item', { galleryid: $stateParams.galleryid, itemid:'' });
    }
    $scope.showItemDetails = function (_item) {
        $rootScope.chosenItem = _item;
        $state.go('item', { galleryid: $stateParams.galleryid, itemid: _item._id });
    }
});


