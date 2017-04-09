var app = angular.module("app", ['ui.router']);

app.run(function ($rootScope, $state) {
})
.run(function ($templateCache, $http) {

    $http.get('views/landing.html', { cache: $templateCache });
    $http.get('views/store.html', { cache: $templateCache });
    $http.get('views/gallery.html', { cache: $templateCache });


})

;
