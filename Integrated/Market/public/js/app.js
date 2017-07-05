var app = angular.module("app", ['ngAnimate']);

app.run(function ($rootScope) {
    //$rootScope.$on('$stateChangeSuccess', function () {
    //    document.body.scrollTop = document.documentElement.scrollTop = 0;
    //});
    console.log('here');
    $rootScope.loggedUser = false;
    // get user object from local storage
    var userObject = JSON.parse(localStorage.getItem('userObject'));
    console.log(userObject);
    if (userObject != '' && userObject != null) {
        console.log('if');
        $rootScope.userName = userObject.Name;
        $rootScope.loggedUser = true;
        console.log($rootScope.userName);
    }
    else {
        console.log('else');
        $rootScope.userName = '';
        $rootScope.loggedUser = false;
    }
});
