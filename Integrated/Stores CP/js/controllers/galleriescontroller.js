app.controller("galleriesController", function ($scope, $state, $rootScope, API, $stateParams, $location) {
    if (typeof $rootScope.currentUser === 'undefined') {
        $location.path("/login");
    }
    $rootScope.pageHeader = '';
    $scope.galleries = [];
    var req = {
        method: 'get',
        url: '/StoreGalleries/' + $rootScope.currentUser._id,
        data: {}
    }
    $rootScope.loading = true;
    API.execute(req).then(function (_res) {
        if (_res.data.code == 100) {
            $scope.galleries = _res.data.data;
        }
    }).finally(function () {
        $rootScope.loading = false;
    });

    $scope.showGalleryDetails = function (_galleryID) {
        $state.go('gallery', { galleryid: _galleryID });
    }

});


