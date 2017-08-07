app.controller("inboxController", function ($scope, $rootScope, $timeout) {
    $scope.init = function (_isoCode, _activeUser, _currentMessageReceiver) {
        $rootScope.IsoCode = _isoCode;
        $scope.activeUserId = _activeUser;
        console.log(JSON.parse(_currentMessageReceiver));
        $scope.currentMessageReceiver = JSON.parse(_currentMessageReceiver);
        console.log(inboxObject);
        if (window.inboxObject.length > 0) {
            $scope.inboxMesagesList = JSON.parse(window.inboxObject);
            console.log($scope.inboxMesagesList);
        }
        else {
            $scope.inboxMesagesList = [];
        }

    }

    $scope.submitMessage = function () {
        // to $scope.currentMessageReceiver
        // from $rootScope.userObject
        if ($rootScope.userObject != '' && $rootScope.userObject != null) {
            var messageObj = { _id: "1", Name: "Ali", Message: $scope.txtMessage, "Img": "https://freeiconshop.com/wp-content/uploads/edd/person-flat.png" };
            $scope.inboxMesagesList.push(messageObj);
            $scope.txtMessage = "";
        } else {
            console.log('you have to login first');
        }

    }
});