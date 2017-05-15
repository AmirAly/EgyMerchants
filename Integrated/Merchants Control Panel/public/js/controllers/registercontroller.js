app.controller("registerController", function ($scope, $state, $rootScope, API, $stateParams, $location) {
    $scope.selsectedTab = 'about';
    $scope.categories = [
        { id:'1', name: 'cat1', img: '' },
        { id:'2', name: 'cat2', img: '' },
        { id:'3', name: 'cat3', img: '' },
        { id:'4', name: 'cat4', img: '' },
        { id:'5', name: 'cat5', img: '' },
        { id:'6', name: 'cat6', img: '' },
        { id:'7', name: 'cat7', img: '' },
        { id:'8', name: 'cat8', img: '' }
    ];
    $scope.selsectedCat = 1;
    $scope.selectCat = function (_id) {
        $scope.selsectedCat = _id;
        console.log($scope.selsectedCat);
    }
    $scope.nextTab = function () {
        $scope.selsectedTab = 'address';
    }
    $scope.nextFinish = function () {
        $scope.selsectedTab = 'type';
    }
});