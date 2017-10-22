var app = angular.module("app", ['ngAnimate', 'angular-tour', 'ngCookies']);

app.run(function ($rootScope, $timeout, socket) {
    

    // Socket listeners
    // ================
    function addUser() {
        if ($rootScope.userObject) {
            socket.emit('adduser', $rootScope.userObject._id);
        }
    }
    $timeout(function () {
        addUser();
    }, 5000);

    socket.on('newmsg', function (_data) {

        $rootScope.newMsgReceived = true;
        $timeout(function () {
            $rootScope.newMsgReceived = false;
        }, 3000);

        $rootScope.getUnreadMessages();
    });

    socket.on('ping', function (data) {
        if (data && $rootScope.loggedUser) {
            socket.emit('pong', "pong");
            socket.emit('adduser', $rootScope.userObject._id);
        }
        
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });


    $rootScope.loggedUser = false;
    // get user object from local storage
    $rootScope.userObject = JSON.parse(localStorage.getItem('userObject'));
    if ($rootScope.userObject != '' && $rootScope.userObject != null) {
        $rootScope.userName = $rootScope.userObject.Name;
        $rootScope.userId = $rootScope.userObject._id;
        $rootScope.ProfilePicture = $rootScope.userObject.ProfilePicture;
        $rootScope.loggedUser = true;
        $rootScope.$apply();
    }
    else {
        $rootScope.userName = '';
        $rootScope.userId = '';
        $rootScope.loggedUser = false;
    }
});
