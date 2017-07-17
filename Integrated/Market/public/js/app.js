var app = angular.module("app", ['ngAnimate']);

app.run(function ($rootScope) {
<<<<<<< HEAD
    $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  
    $rootScope.loggedUser = false;
    // get user object from local storage
    $rootScope.userObject = JSON.parse(localStorage.getItem('userObject'));
    if ($rootScope.userObject != '' && $rootScope.userObject != null) {
        $rootScope.userName = $rootScope.userObject.Name;
=======
    //$rootScope.$on('$stateChangeSuccess', function () {
    //    document.body.scrollTop = document.documentElement.scrollTop = 0;
    //});
  
    $rootScope.loggedUser = false;
    // get user object from local storage
    var userObject = JSON.parse(localStorage.getItem('userObject'));
    if (userObject != '' && userObject != null) {
        $rootScope.userName = userObject.Name;
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
        $rootScope.loggedUser = true;
    }
    else {
        $rootScope.userName = '';
        $rootScope.loggedUser = false;
    }
});
