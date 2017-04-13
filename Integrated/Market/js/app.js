var app = angular.module("app", ['ui.router']);

app.run(function ($templateCache, $http) {

    $http.get('views/landing.html', { cache: $templateCache });
    $http.get('views/store.html', { cache: $templateCache });
    //$http.get('views/gallery.html', { cache: $templateCache });


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

