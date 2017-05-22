egm.controller("itemController", function ($scope, API) {
    $scope.itemPictures = [{
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
    
    $scope.updateItem = function () {
        var req = {
            method: 'put',
            url: '/Item/Edit',
            data: {
                _id: '59089186734d1d3098a85879',
                Name: $scope.item.Name,
                Description:$scope.item.Description
            }
        }
        API.execute(req).then(function (res) {
            console.log('1');
            console.log(res);
            if (res.data.code == 100) {
                res.data.Name = $scope.gallery.Name;
                res.data.Description = $scope.gallery.Description;
                window.location.reload();
            } else {
                console.log('err');
            }
        });
    };

});