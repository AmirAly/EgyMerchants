app.controller("landingController", function ($scope, $state, $rootScope, $timeout) {
    $rootScope.loading = true;
    $scope.categories = [];
    $timeout(function () {
        $rootScope.loading = false;
    }, 2000);

});


