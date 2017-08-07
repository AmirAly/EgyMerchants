app.controller("inboxController", function ($scope, $rootScope, $timeout, API) {
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
            $scope.messageObject = {};
            $scope.messageObject.From = $rootScope.userObject._id;
            $scope.messageObject.To = $scope.currentMessageReceiver._id;
            $scope.messageObject.Text = $scope.txtMessage;

            var req = {
                method: 'post',
                url: '/Message/Send',
                data: $scope.messageObject
            }
            console.log(req);
            API.execute(req).then(function (_res) {
                if (_res.data.code == 100) {
                    //$scope.dataLoading = false;

                    console.log($rootScope.userObject);
                    $scope.From = {};
                    $scope.From.Name = $rootScope.userObject.Name;
                    $scope.From.ProfilePicture = $rootScope.userObject.ProfilePicture;
                    $scope.From._id = $rootScope.userObject._id;
                    var messageObj = { _id: $rootScope.userObject._id, From: $scope.From, Text: $scope.txtMessage };
                    console.log(messageObj);
                    $scope.inboxMesagesList.push(messageObj);
                    $scope.txtMessage = "";

                } else {
                    //$scope.dataLoading = false;

                }

            });

        } else {
            console.log('you have to login first');
        }

    }
});