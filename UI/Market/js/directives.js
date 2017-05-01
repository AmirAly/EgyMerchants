app.directive('fallbacksrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function () {
                angular.element(this).attr("src", 'images/down.png');
                angular.element(this).attr("style", 'background-color:#fff;border-radius: 50%;');
            });
        }
    }
    return fallbackSrc;
});
