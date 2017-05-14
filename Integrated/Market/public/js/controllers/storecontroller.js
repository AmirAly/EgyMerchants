app.controller("storeController", function ($scope, $state, $rootScope, $timeout) {
    $scope.store = [];
    $scope.bestSeller = [];
    $scope.Galleries = [];
    $timeout(function () {
        $scope.store = [
                {
                    StoreName: 'Al Maksoud',
                    Imgs: [
                    {
                        URL: 'https://s-media-cache-ak0.pinimg.com/originals/e2/5e/90/e25e90d723ba723c282068816c139f9a.jpg'
                    },
                    {
                        URL: 'http://www.dwellingdecor.com/wp-content/uploads/2015/12/interior-living-room.jpg'
                    },
                    {
                        URL: 'http://metalip.com/wp-content/uploads/2016/03/modern-scandinavian-loft-living-room-design-with-upholstered-foamy-black-sofa-added-with-colorful-cushions.jpg'
                    }
                    ]
                }
        ];

        $scope.bestSeller = [
            { Id: 1, Name: 'Raglan Sleeve Tee Maison Scotch', Price: '$44.95', Img: 'https://s-media-cache-ak0.pinimg.com/736x/69/44/a2/6944a2f143049e4d8be4ade167dbdb85.jpg' },
            { Id: 2, Name: 'Raglan Sleeve Tee Maison Scotch', Price: '$44.95', Img: 'https://s-media-cache-ak0.pinimg.com/736x/96/de/b1/96deb1dae3fde9de7a05e7334a6b31f9.jpg' },
            { Id: 3, Name: 'V Front Peplum Dress Club L', Price: '$22.95', Img: 'http://hative.com/wp-content/uploads/2016/10/behind-couch/1-space-behind-couch.jpg' },
            { Id: 4, Name: 'Raglan Sleeve Tee Maison Scotch', Price: '$44.95', Img: 'https://s-media-cache-ak0.pinimg.com/736x/69/44/a2/6944a2f143049e4d8be4ade167dbdb85.jpg' },
            { Id: 5, Name: 'Raglan Sleeve Tee Maison Scotch', Price: '$44.95', Img: 'https://s-media-cache-ak0.pinimg.com/736x/96/de/b1/96deb1dae3fde9de7a05e7334a6b31f9.jpg' },
            { Id: 6, Name: 'V Front Peplum Dress Club L', Price: '$22.95', Img: 'http://hative.com/wp-content/uploads/2016/10/behind-couch/1-space-behind-couch.jpg' }
        ];

        $scope.Galleries = [
            { Id: 1, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/96/de/b1/96deb1dae3fde9de7a05e7334a6b31f9.jpg' },
            { Id: 2, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg' },
            { Id: 3, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/69/44/a2/6944a2f143049e4d8be4ade167dbdb85.jpg' },
            { Id: 4, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/bb/52/a4/bb52a4eca27d512bf9f0d9dca0e8cfaf.jpg' },
            { Id: 5, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/a7/c3/da/a7c3da858c7a67841ab92b849c4f88a7.jpg' },
            { Id: 6, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/96/de/b1/96deb1dae3fde9de7a05e7334a6b31f9.jpg' },
            { Id: 7, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/96/de/b1/96deb1dae3fde9de7a05e7334a6b31f9.jpg' },
            { Id: 8, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg' },
            { Id: 9, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/69/44/a2/6944a2f143049e4d8be4ade167dbdb85.jpg' },
            { Id: 10, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/bb/52/a4/bb52a4eca27d512bf9f0d9dca0e8cfaf.jpg' },
            { Id: 11, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/a7/c3/da/a7c3da858c7a67841ab92b849c4f88a7.jpg' },

        ];

    }, 2000);



    $scope.next = function () {
        $('#myCarousel').carousel('next');
    }


    $scope.pre = function () {
        $('#myCarousel').carousel('prev');
    }
});