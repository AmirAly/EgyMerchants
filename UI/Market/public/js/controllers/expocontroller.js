app.controller("expoController", function ($scope, $state, $rootScope, $timeout) {
    $rootScope.loading = true;
    $scope.expos = [];
    $timeout(function () {
        $scope.expos = [
            {
                Id: 1,
                Title: 'Le Marché I',
                Banner: 'http://file.mrbool.com/mrbool/articles/RicardoArrigoni/Parallax/Parallax1.jpg',
                Sections: [
                  { Id: 1, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a1.jpg' },
                  { Id: 2, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a2.jpg' },
                  { Id: 3, StoreName: 'almaksoud', StoreId: '3', Img: '/images/expo/advertise.png' },
                  { Id: 4, StoreName: 'almaksoud', StoreId: '4', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 5, StoreName: 'almaksoud', StoreId: '5', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 6, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a3.jpg' },
                  { Id: 7, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a4.jpg' },
                  { Id: 8, StoreName: 'almaksoud', StoreId: '8', Img: '/images/expo/advertise.png' },
                  { Id: 9, StoreName: 'almaksoud', StoreId: '9', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 10, StoreName: 'almaksoud', StoreId: '10', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 11, StoreName: 'almaksoud', StoreId: '11', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 12, StoreName: 'almaksoud', StoreId: '12', Img: '/images/expo/gallery_img-12.jpg' },
                  { Id: 13, StoreName: 'almaksoud', StoreId: '13', Img: '/images/expo/advertise.png' },
                  { Id: 14, StoreName: 'almaksoud', StoreId: '14', Img: '/images/expo/gallery_img-02.jpg' },
                  { Id: 15, StoreName: 'almaksoud', StoreId: '15', Img: '/images/expo/gallery_img-03.jpg' },
                  { Id: 16, StoreName: 'almaksoud', StoreId: '16', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 17, StoreName: 'almaksoud', StoreId: '17', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 18, StoreName: 'almaksoud', StoreId: '18', Img: '/images/expo/advertise.png' },
                  { Id: 19, StoreName: 'almaksoud', StoreId: '19', Img: '/images/expo/gallery_img-07.jpg' },
                  { Id: 20, StoreName: 'almaksoud', StoreId: '20', Img: '/images/expo/gallery_img-08.jpg' },
                  { Id: 21, StoreName: 'almaksoud', StoreId: '21', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 22, StoreName: 'almaksoud', StoreId: '22', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 23, StoreName: 'almaksoud', StoreId: '23', Img: '/images/expo/advertise.png' },
                  { Id: 24, StoreName: 'almaksoud', StoreId: '24', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 25, StoreName: 'almaksoud', StoreId: '25', Img: '/images/expo/gallery_img-12.jpg' },

                ]
            },
            {
                Id: 2,
                Title: 'Le Marché II',
                Banner: 'http://www.brockmetal.com/wp-content/uploads/2014/01/parallax-section-background-03.jpg',
                Sections: [

                  { Id: 1, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a1.jpg' },
                  { Id: 2, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a2.jpg' },
                  { Id: 3, StoreName: 'almaksoud', StoreId: '3', Img: '/images/expo/advertise.png' },
                  { Id: 4, StoreName: 'almaksoud', StoreId: '4', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 5, StoreName: 'almaksoud', StoreId: '5', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 6, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a3.jpg' },
                  { Id: 7, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a4.jpg' },
                  { Id: 8, StoreName: 'almaksoud', StoreId: '8', Img: '/images/expo/advertise.png' },
                  { Id: 9, StoreName: 'almaksoud', StoreId: '9', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 10, StoreName: 'almaksoud', StoreId: '10', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 11, StoreName: 'almaksoud', StoreId: '11', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 12, StoreName: 'almaksoud', StoreId: '12', Img: '/images/expo/gallery_img-12.jpg' },
                  { Id: 13, StoreName: 'almaksoud', StoreId: '13', Img: '/images/expo/advertise.png' },
                  { Id: 14, StoreName: 'almaksoud', StoreId: '14', Img: '/images/expo/gallery_img-02.jpg' },
                  { Id: 15, StoreName: 'almaksoud', StoreId: '15', Img: '/images/expo/gallery_img-03.jpg' },
                  { Id: 16, StoreName: 'almaksoud', StoreId: '16', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 17, StoreName: 'almaksoud', StoreId: '17', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 18, StoreName: 'almaksoud', StoreId: '18', Img: '/images/expo/advertise.png' },
                  { Id: 19, StoreName: 'almaksoud', StoreId: '19', Img: '/images/expo/gallery_img-07.jpg' },
                  { Id: 20, StoreName: 'almaksoud', StoreId: '20', Img: '/images/expo/gallery_img-08.jpg' },
                  { Id: 21, StoreName: 'almaksoud', StoreId: '21', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 22, StoreName: 'almaksoud', StoreId: '22', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 23, StoreName: 'almaksoud', StoreId: '23', Img: '/images/expo/advertise.png' },
                  { Id: 24, StoreName: 'almaksoud', StoreId: '24', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 25, StoreName: 'almaksoud', StoreId: '25', Img: '/images/expo/gallery_img-12.jpg' },

                ]
            },
            {
                Id: 3,
                Title: 'Le Marché III',
                Banner: 'http://maddam-x.com/wp-content/uploads/2015/04/orig_15953.jpg',
                Sections: [

                  { Id: 1, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a1.jpg' },
                  { Id: 2, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a2.jpg' },
                  { Id: 3, StoreName: 'almaksoud', StoreId: '3', Img: '/images/expo/advertise.png' },
                  { Id: 4, StoreName: 'almaksoud', StoreId: '4', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 5, StoreName: 'almaksoud', StoreId: '5', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 6, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a3.jpg' },
                  { Id: 7, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a4.jpg' },
                  { Id: 8, StoreName: 'almaksoud', StoreId: '8', Img: '/images/expo/advertise.png' },
                  { Id: 9, StoreName: 'almaksoud', StoreId: '9', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 10, StoreName: 'almaksoud', StoreId: '10', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 11, StoreName: 'almaksoud', StoreId: '11', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 12, StoreName: 'almaksoud', StoreId: '12', Img: '/images/expo/gallery_img-12.jpg' },
                  { Id: 13, StoreName: 'almaksoud', StoreId: '13', Img: '/images/expo/advertise.png' },
                  { Id: 14, StoreName: 'almaksoud', StoreId: '14', Img: '/images/expo/gallery_img-02.jpg' },
                  { Id: 15, StoreName: 'almaksoud', StoreId: '15', Img: '/images/expo/gallery_img-03.jpg' },
                  { Id: 16, StoreName: 'almaksoud', StoreId: '16', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 17, StoreName: 'almaksoud', StoreId: '17', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 18, StoreName: 'almaksoud', StoreId: '18', Img: '/images/expo/advertise.png' },
                  { Id: 19, StoreName: 'almaksoud', StoreId: '19', Img: '/images/expo/gallery_img-07.jpg' },
                  { Id: 20, StoreName: 'almaksoud', StoreId: '20', Img: '/images/expo/gallery_img-08.jpg' },
                  { Id: 21, StoreName: 'almaksoud', StoreId: '21', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 22, StoreName: 'almaksoud', StoreId: '22', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 23, StoreName: 'almaksoud', StoreId: '23', Img: '/images/expo/advertise.png' },
                  { Id: 24, StoreName: 'almaksoud', StoreId: '24', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 25, StoreName: 'almaksoud', StoreId: '25', Img: '/images/expo/gallery_img-12.jpg' },

                ]
            },
            {
                Id: 4,
                Title: 'Le Marché IIII',
                Banner: 'http://www.machakosgovernment.com/Machawood/images/parallax-bg1.jpg',
                Sections: [
                  { Id: 1, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a1.jpg' },
                  { Id: 2, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a2.jpg' },
                  { Id: 3, StoreName: 'almaksoud', StoreId: '3', Img: '/images/expo/advertise.png' },
                  { Id: 4, StoreName: 'almaksoud', StoreId: '4', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 5, StoreName: 'almaksoud', StoreId: '5', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 6, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a3.jpg' },
                  { Id: 7, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a4.jpg' },
                  { Id: 8, StoreName: 'almaksoud', StoreId: '8', Img: '/images/expo/advertise.png' },
                  { Id: 9, StoreName: 'almaksoud', StoreId: '9', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 10, StoreName: 'almaksoud', StoreId: '10', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 11, StoreName: 'almaksoud', StoreId: '11', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 12, StoreName: 'almaksoud', StoreId: '12', Img: '/images/expo/gallery_img-12.jpg' },
                  { Id: 13, StoreName: 'almaksoud', StoreId: '13', Img: '/images/expo/advertise.png' },
                  { Id: 14, StoreName: 'almaksoud', StoreId: '14', Img: '/images/expo/gallery_img-02.jpg' },
                  { Id: 15, StoreName: 'almaksoud', StoreId: '15', Img: '/images/expo/gallery_img-03.jpg' },
                  { Id: 16, StoreName: 'almaksoud', StoreId: '16', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 17, StoreName: 'almaksoud', StoreId: '17', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 18, StoreName: 'almaksoud', StoreId: '18', Img: '/images/expo/advertise.png' },
                  { Id: 19, StoreName: 'almaksoud', StoreId: '19', Img: '/images/expo/gallery_img-07.jpg' },
                  { Id: 20, StoreName: 'almaksoud', StoreId: '20', Img: '/images/expo/gallery_img-08.jpg' },
                  { Id: 21, StoreName: 'almaksoud', StoreId: '21', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 22, StoreName: 'almaksoud', StoreId: '22', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 23, StoreName: 'almaksoud', StoreId: '23', Img: '/images/expo/advertise.png' },
                  { Id: 24, StoreName: 'almaksoud', StoreId: '24', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 25, StoreName: 'almaksoud', StoreId: '25', Img: '/images/expo/gallery_img-12.jpg' },
                ]
            },
            {
                Id: 5,
                Title: 'Le Marché V',
                Banner: 'http://social-lions.ro/wp-content/uploads/revslider/home2/img-33.jpg',
                Sections: [

                  { Id: 1, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a1.jpg' },
                  { Id: 2, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a2.jpg' },
                  { Id: 3, StoreName: 'almaksoud', StoreId: '3', Img: '/images/expo/advertise.png' },
                  { Id: 4, StoreName: 'almaksoud', StoreId: '4', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 5, StoreName: 'almaksoud', StoreId: '5', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 6, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a3.jpg' },
                  { Id: 7, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a4.jpg' },
                  { Id: 8, StoreName: 'almaksoud', StoreId: '8', Img: '/images/expo/advertise.png' },
                  { Id: 9, StoreName: 'almaksoud', StoreId: '9', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 10, StoreName: 'almaksoud', StoreId: '10', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 11, StoreName: 'almaksoud', StoreId: '11', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 12, StoreName: 'almaksoud', StoreId: '12', Img: '/images/expo/gallery_img-12.jpg' },
                  { Id: 13, StoreName: 'almaksoud', StoreId: '13', Img: '/images/expo/advertise.png' },
                  { Id: 14, StoreName: 'almaksoud', StoreId: '14', Img: '/images/expo/gallery_img-02.jpg' },
                  { Id: 15, StoreName: 'almaksoud', StoreId: '15', Img: '/images/expo/gallery_img-03.jpg' },
                  { Id: 16, StoreName: 'almaksoud', StoreId: '16', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 17, StoreName: 'almaksoud', StoreId: '17', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 18, StoreName: 'almaksoud', StoreId: '18', Img: '/images/expo/advertise.png' },
                  { Id: 19, StoreName: 'almaksoud', StoreId: '19', Img: '/images/expo/gallery_img-07.jpg' },
                  { Id: 20, StoreName: 'almaksoud', StoreId: '20', Img: '/images/expo/gallery_img-08.jpg' },
                  { Id: 21, StoreName: 'almaksoud', StoreId: '21', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 22, StoreName: 'almaksoud', StoreId: '22', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 23, StoreName: 'almaksoud', StoreId: '23', Img: '/images/expo/advertise.png' },
                  { Id: 24, StoreName: 'almaksoud', StoreId: '24', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 25, StoreName: 'almaksoud', StoreId: '25', Img: '/images/expo/gallery_img-12.jpg' },

                ]
            },
        ];
        setTimeout(function () {
            swinch.init(null, {
                onBeforeSnap: function (current, next, direction) {
                    console.log('onBeforeSnap', current, next, direction);
                },
                onSnapped: function (current, previous, direction) {
                    console.log('onSnapped', current, previous, direction);
                },
                snapTo: 'top'
            });
        }, 1000);
        $rootScope.loading = false;
    }, 2000);

    $scope.toggle = function (_id) {
        $scope['hidePages' + _id] = !$scope['hidePages' + _id];
    }

    $scope.initHidePags = function (_id) {
        $scope['hidePages' + _id] = true;
    }

    $scope.selectPage = function (_expoId, _pageNo) {
        $scope['activePageNumber' + _expoId] = _pageNo;
    }

    $scope.initfirstPage = function (_expoId) {
        $scope['activePageNumber' + _expoId] = 1;
        console.log($scope['activePageNumber' + _expoId]);
    }
});
