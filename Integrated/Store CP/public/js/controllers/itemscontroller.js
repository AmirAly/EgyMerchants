egm.controller("itemsController", function ($scope, API, $window) {
    $scope.items = [{
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
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Description: "Last Campaign Performance"
    }, {
        Title: "Completed Tasks",
        Img: "/img/cover.jpeg",
        Description: "Last Campaign Performance"
    }];

    $scope.addItem = function () {
        var req = {
            method: 'post',
            url: '/Item/Add',
            data: {
                Name: $scope.item.Title,
                Description: $scope.item.Description,
                Pictures: [{
                    Title: '',
                    URL: ''
                }],
                Price: '',
                Store: '59084a09734d1d3098a82cd6',
                Gallery: '59088e74734d1d3098a8563e'
            }
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                window.location.reload();
                var itemId = res.data._id;
                console.log('id:', itemId); //"591cd30b2b99d00af8affaa0"
            }
        });
    };
});