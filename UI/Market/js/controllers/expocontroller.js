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
                  { Id: 1, Store: '1', Img: '/images/expo/a1.jpg' },
                  { Id: 2, Store: '2', Img: '/images/expo/a2.jpg' },
                  { Id: 3, Store: '3', Img: '/images/expo/advertise.png' },
                  { Id: 4, Store: '4', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 5, Store: '5', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 6, Store: '6', Img: '/images/expo/a3.jpg' },
                  { Id: 7, Store: '7', Img: '/images/expo/a4.jpg' },
                  { Id: 8, Store: '8', Img: '/images/expo/advertise.png' },
                  { Id: 9, Store: '9', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 10, Store: '10', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 11, Store: '11', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 12, Store: '12', Img: '/images/expo/gallery_img-12.jpg' },
                  { Id: 13, Store: '13', Img: '/images/expo/advertise.png' },
                  { Id: 14, Store: '14', Img: '/images/expo/gallery_img-02.jpg' },
                  { Id: 15, Store: '15', Img: '/images/expo/gallery_img-03.jpg' },
                  { Id: 16, Store: '16', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 17, Store: '17', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 18, Store: '18', Img: '/images/expo/advertise.png' },
                  { Id: 19, Store: '19', Img: '/images/expo/gallery_img-07.jpg' },
                  { Id: 20, Store: '20', Img: '/images/expo/gallery_img-08.jpg' },
                  { Id: 21, Store: '21', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 22, Store: '22', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 23, Store: '23', Img: '/images/expo/advertise.png' },
                  { Id: 24, Store: '24', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 25, Store: '25', Img: '/images/expo/gallery_img-12.jpg' },
                ]
            },
            {
                Id: 2,
                Title: 'Le Marché II',
                Banner: 'http://www.brockmetal.com/wp-content/uploads/2014/01/parallax-section-background-03.jpg',
                Sections: [
                  { Id: 1, Store: '1', Img: '/images/expo/a1.jpg' },
                  { Id: 2, Store: '2', Img: '/images/expo/a2.jpg' },
                  { Id: 3, Store: '3', Img: '/images/expo/advertise.png' },
                  { Id: 4, Store: '4', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 5, Store: '5', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 6, Store: '6', Img: '/images/expo/a3.jpg' },
                  { Id: 7, Store: '7', Img: '/images/expo/a4.jpg' },
                  { Id: 8, Store: '8', Img: '/images/expo/advertise.png' },
                  { Id: 9, Store: '9', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 10, Store: '10', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 11, Store: '11', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 12, Store: '12', Img: '/images/expo/gallery_img-12.jpg' },
                  { Id: 13, Store: '13', Img: '/images/expo/advertise.png' },
                  { Id: 14, Store: '14', Img: '/images/expo/gallery_img-02.jpg' },
                  { Id: 15, Store: '15', Img: '/images/expo/gallery_img-03.jpg' },
                  { Id: 16, Store: '16', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 17, Store: '17', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 18, Store: '18', Img: '/images/expo/advertise.png' },
                  { Id: 19, Store: '19', Img: '/images/expo/gallery_img-07.jpg' },
                  { Id: 20, Store: '20', Img: '/images/expo/gallery_img-08.jpg' },
                  { Id: 21, Store: '21', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 22, Store: '22', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 23, Store: '23', Img: '/images/expo/advertise.png' },
                  { Id: 24, Store: '24', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 25, Store: '25', Img: '/images/expo/gallery_img-12.jpg' },
                ]
            },
            {
                Id: 3,
                Title: 'Le Marché III',
                Banner: 'http://maddam-x.com/wp-content/uploads/2015/04/orig_15953.jpg',
                Sections: [
                  { Id: 1, Store: '1', Img: '/images/expo/a1.jpg' },
                  { Id: 2, Store: '2', Img: '/images/expo/a2.jpg' },
                  { Id: 3, Store: '3', Img: '/images/expo/advertise.png' },
                  { Id: 4, Store: '4', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 5, Store: '5', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 6, Store: '6', Img: '/images/expo/a3.jpg' },
                  { Id: 7, Store: '7', Img: '/images/expo/a4.jpg' },
                  { Id: 8, Store: '8', Img: '/images/expo/advertise.png' },
                  { Id: 9, Store: '9', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 10, Store: '10', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 11, Store: '11', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 12, Store: '12', Img: '/images/expo/gallery_img-12.jpg' },
                  { Id: 13, Store: '13', Img: '/images/expo/advertise.png' },
                  { Id: 14, Store: '14', Img: '/images/expo/gallery_img-02.jpg' },
                  { Id: 15, Store: '15', Img: '/images/expo/gallery_img-03.jpg' },
                  { Id: 16, Store: '16', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 17, Store: '17', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 18, Store: '18', Img: '/images/expo/advertise.png' },
                  { Id: 19, Store: '19', Img: '/images/expo/gallery_img-07.jpg' },
                  { Id: 20, Store: '20', Img: '/images/expo/gallery_img-08.jpg' },
                  { Id: 21, Store: '21', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 22, Store: '22', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 23, Store: '23', Img: '/images/expo/advertise.png' },
                  { Id: 24, Store: '24', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 25, Store: '25', Img: '/images/expo/gallery_img-12.jpg' },
                ]
            },
            {
                Id: 4,
                Title: 'Le Marché IIII',
                Banner: 'http://www.machakosgovernment.com/Machawood/images/parallax-bg1.jpg',
                Sections: [
                  { Id: 1, Store: '1', Img: '/images/expo/a1.jpg' },
                  { Id: 2, Store: '2', Img: '/images/expo/a2.jpg' },
                  { Id: 3, Store: '3', Img: '/images/expo/advertise.png' },
                  { Id: 4, Store: '4', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 5, Store: '5', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 6, Store: '6', Img: '/images/expo/a3.jpg' },
                  { Id: 7, Store: '7', Img: '/images/expo/a4.jpg' },
                  { Id: 8, Store: '8', Img: '/images/expo/advertise.png' },
                  { Id: 9, Store: '9', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 10, Store: '10', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 11, Store: '11', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 12, Store: '12', Img: '/images/expo/gallery_img-12.jpg' },
                  { Id: 13, Store: '13', Img: '/images/expo/advertise.png' },
                  { Id: 14, Store: '14', Img: '/images/expo/gallery_img-02.jpg' },
                  { Id: 15, Store: '15', Img: '/images/expo/gallery_img-03.jpg' },
                  { Id: 16, Store: '16', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 17, Store: '17', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 18, Store: '18', Img: '/images/expo/advertise.png' },
                  { Id: 19, Store: '19', Img: '/images/expo/gallery_img-07.jpg' },
                  { Id: 20, Store: '20', Img: '/images/expo/gallery_img-08.jpg' },
                  { Id: 21, Store: '21', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 22, Store: '22', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 23, Store: '23', Img: '/images/expo/advertise.png' },
                  { Id: 24, Store: '24', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 25, Store: '25', Img: '/images/expo/gallery_img-12.jpg' },
                ]
            },
            {
                Id: 5,
                Title: 'Le Marché V',
                Banner: 'http://social-lions.ro/wp-content/uploads/revslider/home2/img-33.jpg',
                Sections: [
                  { Id: 1, Store: '1', Img: '/images/expo/a1.jpg' },
                  { Id: 2, Store: '2', Img: '/images/expo/a2.jpg' },
                  { Id: 3, Store: '3', Img: '/images/expo/advertise.png' },
                  { Id: 4, Store: '4', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 5, Store: '5', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 6, Store: '6', Img: '/images/expo/a3.jpg' },
                  { Id: 7, Store: '7', Img: '/images/expo/a4.jpg' },
                  { Id: 8, Store: '8', Img: '/images/expo/advertise.png' },
                  { Id: 9, Store: '9', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 10, Store: '10', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 11, Store: '11', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 12, Store: '12', Img: '/images/expo/gallery_img-12.jpg' },
                  { Id: 13, Store: '13', Img: '/images/expo/advertise.png' },
                  { Id: 14, Store: '14', Img: '/images/expo/gallery_img-02.jpg' },
                  { Id: 15, Store: '15', Img: '/images/expo/gallery_img-03.jpg' },
                  { Id: 16, Store: '16', Img: '/images/expo/gallery_img-04.jpg' },
                  { Id: 17, Store: '17', Img: '/images/expo/gallery_img-05.jpg' },
                  { Id: 18, Store: '18', Img: '/images/expo/advertise.png' },
                  { Id: 19, Store: '19', Img: '/images/expo/gallery_img-07.jpg' },
                  { Id: 20, Store: '20', Img: '/images/expo/gallery_img-08.jpg' },
                  { Id: 21, Store: '21', Img: '/images/expo/gallery_img-09.jpg' },
                  { Id: 22, Store: '22', Img: '/images/expo/gallery_img-10.jpg' },
                  { Id: 23, Store: '23', Img: '/images/expo/advertise.png' },
                  { Id: 24, Store: '24', Img: '/images/expo/gallery_img-11.jpg' },
                  { Id: 25, Store: '25', Img: '/images/expo/gallery_img-12.jpg' },
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
