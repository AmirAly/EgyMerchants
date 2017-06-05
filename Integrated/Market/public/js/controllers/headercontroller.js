app.controller("headerController", function ($scope, $rootScope, $timeout) {
    $scope.txtSearch = '';
    $scope.search = function () {
        window.location.href = "/EG/Search/" + $scope.txtSearch;
    }
});