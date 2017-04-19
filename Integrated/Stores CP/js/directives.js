// Vallidation & Input Effect Direrctives
app.directive('ngInputEffectClass', function ($timeout) {
    return ({
        restrict: 'A',
        link: function (scope, element, attr) {
            $timeout(function () {
                if (element.val()) {
                    element.addClass('used');
                }
                else {
                    element.removeClass('used');
                }
            }, 100);
            element.on('blur', function () {
                if (element.val()) {
                    element.addClass('used');
                }
                else {
                    $(this).removeClass('used');
                }
            });
        }
    });
});

app.directive('ngSelectEffectClass', function () {
    return ({
        restrict: 'A',
        link: function (scope, element, attr) {
            element.on('change', function () {
                if (element.val() != '0') {
                    element.addClass('used');
                }
                else {
                    $(this).removeClass('used');
                }
            });
        }
    });
});

app.directive('isRequired', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value) {
                    mCtrl.$setValidity('charE', true);
                } else {
                    mCtrl.$setValidity('charE', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});

app.directive('isRequiredSelect', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            //function myValidation(value) {
            //    if (value != '0') {
            //        mCtrl.$setValidity('charE', true);
            //    } else {
            //        mCtrl.$setValidity('charE', false);
            //    }
            //    return value;
            //}
            //mCtrl.$parsers.push(myValidation);
        }
    };
});

app.directive('stringToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return '' + value;
            });
            ngModel.$formatters.push(function (value) {
                return parseFloat(value, 10);
            });
        }
    };
});

app.directive("compareTo", function ($timeout) {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
});

app.directive('fallbacksrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function () {
                angular.element(this).attr("src", 'images/down.png');
                angular.element(this).attr("style", 'background-color:#fff');
            });
        }
    }
    return fallbackSrc;
});