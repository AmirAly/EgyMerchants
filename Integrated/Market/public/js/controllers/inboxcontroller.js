app.controller("inboxController", function ($scope, $rootScope, $timeout, API, $filter, socket) {

    

    socket.on('newmsg', function (_data) {
        $scope.inboxMesagesList.push(_data);

        //// Get the snackbar DIV
        //var x = document.getElementById("snackbar");

        //// Add the "show" class to DIV
        //x.className = "show";

        //// After 3 seconds, remove the show class from DIV
        //setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);


        //$scope.$apply();

    });

    socket.on('messagesuccess', function (_data) {
        for (var i = 0; i < $scope.inboxMesagesList.length; i++) {
            if ($scope.inboxMesagesList[i].showMe == false) {
                $scope.inboxMesagesList[i].showMe = true;
                //$scope.$apply();
            }
        }
        
    });

    $scope.init = function (_isoCode, _activeUser, _currentMessageReceiver) {
        $rootScope.IsoCode = _isoCode;
        $scope.activeUserId = _activeUser;
        if (_currentMessageReceiver != '') {
            $scope.currentMessageReceiver = JSON.parse(_currentMessageReceiver);
        }
        else {
            $scope.currentMessageReceiver = '0';
        }
        if (window.inboxObject.length > 0) {
            $scope.inboxMesagesList = JSON.parse(window.inboxObject);
        }
        else {
            $scope.inboxMesagesList = [];
        }
        console.log(JSON.parse(window.usersListObject));
        if (JSON.parse(window.usersListObject).length > 0) {
            $scope.usersList = JSON.parse(window.usersListObject);
            console.log($scope.usersList);
            console.log('if');
        }
        else {
            $scope.usersList = [];
            console.log('else');

        }
        console.log($scope.usersList);

    }

    $scope.submitMessage = function () {
        if ($rootScope.userObject != '' && $rootScope.userObject != null) {
            $scope.messageObject = {};
            $scope.messageObject.From = { _id: $rootScope.userObject._id, Name: $rootScope.userObject.Name, ProfilePicture: $rootScope.userObject.ProfilePicture };
            $scope.messageObject.To = { _id: $scope.currentMessageReceiver._id, Name: $scope.currentMessageReceiver.Name, ProfilePicture: $scope.currentMessageReceiver.ProfilePicture };
            $scope.messageObject.Text = $scope.txtMessage;

            socket.emit('msg', $scope.messageObject);
            $scope.messageObject.showMe = false;
            $scope.messageObject.MessageDate = new Date();
            $scope.inboxMesagesList.push($scope.messageObject);

            console.log($scope.messageObject);

            $scope.txtMessage = "";

            if (angular.isUndefined($filter('filter')($scope.usersList, { _id: $scope.currentMessageReceiver._id })[0])) {
                $scope.usersList.push($scope.currentMessageReceiver);
                $scope.activeUserId = $scope.currentMessageReceiver._id;
            }


        } else {
            console.log('you have to login first');
        }

    }
});