egm.controller("itemsController", function ($scope, API) {
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
                PriceBeforeSale: '',
                Rate: '',
                Sold: '',       ////////
                Tags: '',
                Badges: '',
                Store: '59084a09734d1d3098a82cd6',
                Gallery: '591cd0612b99d00af8affa9f'
            }
        }
        API.execute(req).then(function (res) {
            var itemId = res.data._id;
            console.log(res);
            console.log(itemId);  //"591cd30b2b99d00af8affaa0"
        });
    }
});