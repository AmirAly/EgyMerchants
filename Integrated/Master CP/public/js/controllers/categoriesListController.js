egm.controller("categoriesListController", function ($scope, API) {

    $scope.addCategory = function () {
        var req = {
            method: 'post',
            url: '/Category/Add',
            data: {
                Name: $scope.category.Name,
                Status: "Active"
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                console.log(_res);
                window.location.reload();
            }
        })
    };

    $scope.editCategory = function (_categoryId, _categoryName) {
        console.log(_categoryId, _categoryName);
        $scope.categoryId = _categoryId;
        $scope.categoryName = _categoryName;
    };

    $scope.updateCategory = function () {
        var req = {
            method: 'put',
            url: '/Category/Edit',
            data: {
                _id:$scope.categoryId,
                Name: $scope.categoryName,
                Status: "Active"
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                console.log(_res);
                console.log('updated');
            } else {
                console.log('err');
            }
        })
    };


});