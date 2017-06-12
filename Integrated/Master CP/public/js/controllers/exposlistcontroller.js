egm.controller("exposListController", function ($scope, API) {

    $scope.counter = 1;
    $scope.counter++;

    $scope.editExpo = function () {
        window.location.href = '/eg/expo';
    }
});