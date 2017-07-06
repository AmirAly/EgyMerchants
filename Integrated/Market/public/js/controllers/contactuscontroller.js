app.controller("contactusController", function ($scope, $state, $rootScope, $timeout) {
   
    $scope.submit = function () {
        $('#success').fadeIn();
        $('#contactform').each(function () { this.reset(); });
        //if (Error) {
        //    $('#contactform').fadeTo("slow", 0, function () {
        //        $('#error').fadeIn();
        //    });
        //}
    }

    // validate contact form
    //$(function () {
    //    $('#contactform').validate({
    //        rules: {
    //            name: {
    //                required: true,
    //                minlength: 2
    //            },
    //            phone: {
    //                required: true,
    //                minlength: 5
    //            },
    //            email: {
    //                required: true,
    //                email: true
    //            }

    //        },
    //        messages: {
    //            name: {
    //                required: "Please enter your name",
    //                minlength: "Your name must consist of at least 2 characters"
    //            },
    //            phone: {
    //                required: "Please enter your contact phone",
    //                minlength: "Your name must consist of at least 5 characters"
    //            },
    //            email: {
    //                required: "Please enter your email"
    //            }
    //        },
    //        submitHandler: function (form) {
    //            $(form).ajaxSubmit({
    //                type: "POST",
    //                data: $(form).serialize(),
    //                url: "process-contact.php",
    //                success: function () {
    //                    $('#success').fadeIn();
    //                    $('#contactform').each(function () { this.reset(); });
    //                },
    //                error: function () {
    //                    $('#contactform').fadeTo("slow", 0, function () {
    //                        $('#error').fadeIn();
    //                    });
    //                }
    //            });
    //        }
    //    });
    //});
});
