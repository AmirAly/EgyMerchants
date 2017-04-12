﻿app.controller("galleriesController", function ($scope, $state, $rootScope, API) {
    $rootScope.pageHeader = '';

    //$scope.galleries = [{id:1, name: 'Ahmed Ali', img: 'images/user0.jpg' },
    //{ id: 2, name: 'Hany Ali', img: 'images/user1.jpg' },
    //{ id: 3, name: 'Mohamed Alaa', img: 'images/user2.jpg' },
    //{ id: 4, name: 'Tareq Mahdy', img: 'images/user3.jpg' },
    //{ id: 5, name: 'Maged Mosa', img: 'images/user4.jpg' },
    //{ id: 6, name: 'Saad Gad', img: 'images/user5.jpg' },
    //{ id: 7, name: 'Kamel Zahran', img: 'images/user6.jpg' }];

    var req = {
        method: 'get',
        url: '/Galleries',
        data: {}
    }
    $rootScope.loading = true;
    API.execute(req).then(function (_res) {
        console.log(_res);
        if (_res.data.code == 100) {
            console.log(_res.data.data);
            $rootScope.txtGalleryName = _res.data.data.Title;
            $rootScope.userImg = _res.data.data.DisplayPicture;
        }
    });

    $scope.showGalleryDetails = function (_galleryId) {
        $state.go('gallery', { galleryid: _galleryId });
    }
});


