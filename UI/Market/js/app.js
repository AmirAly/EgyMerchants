var app = angular.module("app", ['ui.router', 'ngAnimate', 'angularLazyImg']);

app.run(function ($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
    
});
