// Vallidation & Input Effect Direrctives
egm.directive('myModal', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.dismiss = function () {
                element.modal('hide');
            };
        }
    }
});
egm.directive('myModal2', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.dismiss2 = function () {
                element.modal('hide');
            };
        }
    }
});
egm.directive("compareTo", function ($timeout) {
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