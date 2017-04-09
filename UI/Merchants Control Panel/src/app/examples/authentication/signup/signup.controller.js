(function () {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($scope, $state, $mdToast, $http, $filter, triSettings) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.signupClick = signupClick;
        vm.user = {
            name: '',
            email: '',
            password: '',
            confirm: '',
            category: '',
            fullName: ''
        };

        ////////////////

        function signupClick() {
            var country = $.get("https://ipinfo.io", function (response) {
                $.ajax({
                    type: "post",
                    url: "http://localhost:8007/Stores/Register",
                    data: {
                        "Email": vm.user.email,
                        "Password": vm.user.password,
                        "StoreName": vm.user.name,
                        "CountryISOCode": response.country,                        ///ISOCODE
                        "Category": vm.user.category,
                        "Fullname": vm.user.fullName,
                        "Status": 'Active',
                        "FeaturedPhoto": "img.png"         //////LOGO
                    },
                    success: function (res) {
                        if (res.code == 100) {
                            console.log(res);
                            $state.go('triangular.gallerymanagement');
                        } else {
                            console.log('This email/store name is already registered with us');
                        }

                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            }, "jsonp");
        }
    }
})();

