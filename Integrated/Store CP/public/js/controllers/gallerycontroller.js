egm.controller("galleryController", function ($scope, API) {
    $scope.updateGallery = function () {
        var req = {
            method: 'put',
            url: '/Gallery/Edit',
            data: {
                _id: '590994c3734d1d274bfd0969',
                Title: $scope.gallery.Title,
                Description:$scope.gallery.Description
            }
        }
        API.execute(req).then(function (res) {
            console.log('1');
            console.log(res);
            if (res.data.code == 100) {
                res.data.Title = $scope.gallery.Title;
                res.data.Description = $scope.gallery.Description;
                window.location.reload();
            } else {
                console.log('err');
            }
        });
    };
});