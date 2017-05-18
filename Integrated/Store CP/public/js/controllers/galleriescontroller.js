egm.controller("galleriesController", ['$scope', 'API', function ($scope, API) {
    $scope.galleries = [{
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Description: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Descriptionription: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Description: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Description: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Description: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Description: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Description: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Description: "Last Campaign Performance"
    }];
    $scope.addGallery = function () {
        var req = {
            method: 'post',
            url: '/Gallery/Add',
            data: {
                Title: $scope.gallery.Title,
                Description: $scope.gallery.Description,
                DisplayPicture: $scope.gallery.Img,
                Badges: 'offer',
                Status: 'Active',
                Store: '59084a09734d1d3098a82cd6'
            }
        }
        API.execute(req).then(function (res) {
            console.log(res);
            var galleryId = res.data._id;
            console.log('id:', galleryId);
            
        });
    };

    //egm.get('/Gallery/GetByStore/galleryId', function (req, res) {
    //    var _scope = {};
    //    galleries.getByStore('59084a09734d1d3098a82cd6').then(function (_store) {
    //        _scope.galleries = _store;
    //        res.render('/eg/g/galleries', _scope);
    //    }).catch(function (_err) { console.log(_err) });
    //    console.log(_scope.galleries);
    //});

}]);