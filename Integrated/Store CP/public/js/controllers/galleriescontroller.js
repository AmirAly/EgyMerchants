egm.controller("galleriesController", ['$scope', 'API', function ($scope, API) {
    
    //$scope.galleries = [{
    //    Title: "Completed Tasks",
    //    Img: "/img/cover.jpeg",
    //    Description: "Last Campaign Performance"
    //}, {
    //    Title: "Completed Tasks",
    //    Img: "/img/cover.jpeg",
    //    Descriptionription: "Last Campaign Performance"
    //}, {
    //    Title: "Completed Tasks",
    //    Img: "/img/cover.jpeg",
    //    Description: "Last Campaign Performance"
    //}, {
    //    Title: "Completed Tasks",
    //    Img: "/img/cover.jpeg",
    //    Description: "Last Campaign Performance"
    //}, {
    //    Title: "Completed Tasks",
    //    Img: "/img/cover.jpeg",
    //    Description: "Last Campaign Performance"
    //}, {
    //    Title: "Completed Tasks",
    //    Img: "/img/cover.jpeg",
    //    Description: "Last Campaign Performance"
    //}, {
    //    Title: "Completed Tasks",
    //    Img: "/img/cover.jpeg",
    //    Description: "Last Campaign Performance"
    //}, {
    //    Title: "Completed Tasks",
    //    Img: "/img/cover.jpeg",
    //    Description: "Last Campaign Performance"
    //}];
    $scope.addGallery = function () {
        var req = {
            method: 'post',
            url: '/Gallery/Add',
            data: {
                Title: $scope.gallery.Title,
                Description: $scope.gallery.Description,
                DisplayPicture: $scope.gallery.DisplayPicture,
                Badges: 'offer',
                Status: 'Active',
                Store: '59084a09734d1d3098a82cd6'
            }
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                //window.location.reload();
                console.log(_res);

                var galleryId = _res.data._id;
                console.log('id:', galleryId);
            }
        });
    };
    
}]);