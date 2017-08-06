app.controller("inboxController", function ($scope, $rootScope, $timeout) {
    $scope.init = function (_isoCode) {
        $rootScope.IsoCode = _isoCode;
        $scope.inboxMesagesList = JSON.parse(window.inboxObject);
    }
    $scope.activeUser = "2";
    $scope.submitMessage = function () {
        var messageObj = { _id: "1", Name: "Ali", Message: $scope.txtMessage, "Img": "https://freeiconshop.com/wp-content/uploads/edd/person-flat.png" };
        $scope.inboxMesagesList.push(messageObj);
        $scope.txtMessage = "";
    }
});