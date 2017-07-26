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
egm.directive('toolTip', function () {
    return function (scope, element, attrs) {

        element.tooltip({
            trigger: "hover",
            placement: "top"
        });

    };
});