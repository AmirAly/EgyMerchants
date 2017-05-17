egm.controller("galleriesController", ['$scope', 'API', function ($scope, API) {
    $scope.galleries = [{
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Desc: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Desc: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Desc: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Desc: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Desc: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Desc: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Desc: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Desc: "Last Campaign Performance"
    }];

    //console.log(API.name);
    var req = {
        method: 'get',
        url: '/',
        data: {}
    };
    API.execute(req).then(function (res) {
        console.log(res);
    });
}]);