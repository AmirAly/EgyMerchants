app.controller("headerController", function ($scope, $rootScope, $timeout) {
    $scope.txtSearch = '';
    $scope.search = function () {
        if ($scope.txtSearch != '') {
            window.location.href = "/EG/Search/" + $scope.txtSearch;
        }
    }
});