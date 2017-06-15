egm.controller("storeController", function ($scope, API) {

    $scope.editStore = function (_id, store, Featured, HasFactory, Verified) {
        console.log(_id, store);
        $scope.storeId = _id;
        $scope.storeName = store;
        if (Verified == 'true')
            $scope.verified = true;            
        else 
            $scope.verified = false;
        if (HasFactory == 'true')
            $scope.hasFactory = true;
        else
            $scope.hasFactory = false;

        if (Featured == 'true')
            $scope.featured = true;
        else
            $scope.featured = false;

        console.log(" Featured " + $scope.featured + ",HasFactory " + $scope.hasFactory + " , Verified " + $scope.verified);
    };

    $scope.getCheckedBoxes = function () {
        var req = {
            method: 'put',
            url: '/Store/EditBadges',
            data: {
                _id: $scope.storeId,
                Verified: $scope.verified,
                HasFactory: $scope.hasFactory,
                Featured: $scope.featured
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                console.log(_res);
                window.location.reload();
            } else {
                console.log(_res);
            }
        });
    };

    $scope.signOut = function () {
        window.location.href = '/eg/Home';
        localStorage.clear();
    };


});
