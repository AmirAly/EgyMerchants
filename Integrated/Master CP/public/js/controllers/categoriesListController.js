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

    $scope.editCategory = function () {
        window.location.href = '/eg/category';
    }
});