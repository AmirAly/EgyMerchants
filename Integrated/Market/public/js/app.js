var app = angular.module("app", ['ngAnimate']);

app.run(function ($rootScope, socket) {
    
    socket.on('newmsg', function (_data) {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");

        // Add the "show" class to DIV
        x.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

        //$scope.$apply();

    });

    $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    //$rootScope.addUserToSockets = function () {
    //    console.log('enter');
    //    //if (typeof socket !== 'undefined') {
    //        socket.emit('adduser', $rootScope.userObject._id);
    //    //}
    //}

    $rootScope.loggedUser = false;
    // get user object from local storage
    $rootScope.userObject = JSON.parse(localStorage.getItem('userObject'));
    if ($rootScope.userObject != '' && $rootScope.userObject != null) {
        $rootScope.userName = $rootScope.userObject.Name;
        $rootScope.userId = $rootScope.userObject._id;
        $rootScope.loggedUser = true;

        //$rootScope.addUserToSockets();
    }
    else {
        $rootScope.userName = '';
        $rootScope.userId = '';
        $rootScope.loggedUser = false;
    }
});
