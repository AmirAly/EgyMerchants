egm.controller("categoriesListController", function ($scope, API) {
    $scope.editCategory = function () {
        window.location.href = '/eg/category';
    }
});