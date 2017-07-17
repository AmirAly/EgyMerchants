var app = angular.module("app", ['ngAnimate']);

app.run(function ($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  
    $rootScope.loggedUser = false;
    // get user object from local storage
    $rootScope.userObject = JSON.parse(localStorage.getItem('userObject'));
    if ($rootScope.userObject != '' && $rootScope.userObject != null) {
        $rootScope.userName = $rootScope.userObject.Name;
        $rootScope.loggedUser = true;
    }
    else {
        $rootScope.userName = '';
        $rootScope.loggedUser = false;
    }
});
