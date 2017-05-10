app.controller("itemsController", function ($scope, $state, $rootScope, API, $stateParams, $location, Theme) {
    Theme.init();
    $scope.gallery = [{
        DisplayPicture: "img/cover.jpeg",
        Title: "Completed Tasks",
        Description: "Last Campaign Performance"
    }, {
        DisplayPicture: "img/cover.jpeg",
        Title: "Completed Tasks",
        Description: "Last Campaign Performance"
    }, {
        DisplayPicture: "img/cover.jpeg",
        Title: "Completed Tasks",
        Description: "Last Campaign Performance"
    }
    ];
});