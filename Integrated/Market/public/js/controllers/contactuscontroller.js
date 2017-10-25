app.controller("contactusController", function ($scope, $rootScope, $timeout, API) {

    $scope.contactObj = {};

    $scope.init = function (_isoCode) {
        $rootScope.IsoCode = _isoCode;
        localStorage.setItem('IsoCode', _isoCode);
    }

    $scope.submit = function (form) {
        if (form.$valid) {
            // call loader , login , hide modal & add user name
            $scope.dataLoading = true;
            var req = {
                method: 'post',
                url: '/User/ContactUS',
                data: {
                    _name: $scope.contactObj.Name,
                    _phone: $scope.contactObj.Phone,
                    _mail: $scope.contactObj.Email,
                    _comment: $scope.contactObj.Message
                }
            }
            API.execute(req).then(function (_res) {
                $scope.dataLoading = false;
                if (_res.data.code == 100) {
                    $('#contactform').fadeTo("slow", 0, function () {
                        $('#success').fadeIn();
                    });
                }
                else {
                    $('#contactform').fadeTo("slow", 0, function () {
                        $('#error').fadeIn();
                    });
                }
            });
        }
    }

});
