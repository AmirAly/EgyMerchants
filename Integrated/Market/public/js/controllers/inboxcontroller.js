app.controller("inboxController", function ($scope, $rootScope, $timeout, API, $filter, socket) {

    $scope.moreMsgs = true;
    var page = 1;

    socket.on('newmsg', function (_data) {
        // check if from = opend inbox page  ------   push msg & emit or call msg is read

        if (_data.From._id == $scope.activeUserId) {
            $scope.inboxMesagesList.push(_data);
            var req = {
                method: 'put',
                url: '/Message/UpdateStatus',
                data: { _id: _data.msgId }
            }
            API.execute(req).then(function (_res) {
                console.log(_res);
                if (_res.data.code == 100) {
                    console.log('msg is read');

                } else {
                    console.log('msg un read');
                }

            });
        }
        else {
            var sender = ($filter('filter')($scope.usersList, { _id: _data.From._id }))[0];
            if (sender) {
                console.log('exist sender');
                ($filter('filter')($scope.usersList, { _id: _data.From._id }))[0].UnRead = true;
            }
            else {
                // add new sender
                console.log('new sender');
                $scope.usersList.push(_data.From);
                ($filter('filter')($scope.usersList, { _id: _data.From._id }))[0].UnRead = true;
            }
        }



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
        $scope.moreMsgs = true;
        page = 1;
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
        $timeout(function () {
            var objDiv = document.getElementById("dvMessagesBodyContainer");
            $('#' + 'dvMessagesBodyContainer').animate({
                scrollTop: objDiv.scrollHeight
            }, 1500);
            console.log('hhhhhhh');

        }, 2000);
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

    $scope.redirectToMsg = function (_me, _partener) {

        window.location = "/" + $rootScope.IsoCode + "/Inbox/" + _me + "/" + _partener;
        console.log('Change URL');
        $scope.$apply();

        $timeout(function () {
            console.log('timeout');
            window.location.reload();
        }, 2000);
    }



    $scope.getMore = function () {
        // Message/SeeMore/:_UserTo/:_UserFrom
        var req = {
            method: 'get',
            url: '/Message/SeeMore/' + $rootScope.userId +'/' + $scope.activeUserId + '/' + page,
            data: {}
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                console.log(_res.data.data);
                for (var i = 0; i < _res.data.data.length; i++) {
                    $scope.inboxMesagesList.unshift(_res.data.data[i]);
                }
                console.log($scope.inboxMesagesList);
                if (_res.data.data.length == 0) {
                    $scope.moreMsgs = false;
                }
                else {
                    page++;
                }
            }
            else {
                console.log(_res);
            }
        });
    }


});