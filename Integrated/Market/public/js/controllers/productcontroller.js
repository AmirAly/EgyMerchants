app.controller("productController", function ($scope, $rootScope, $timeout) {
    //$scope.x = { "name": "ali", "password": "123456" };
    $scope.init = function (_isoCode) {
        $rootScope.IsoCode = _isoCode;

 console.log(window.commentObject);
        $scope.commentsList = JSON.parse(window.commentObject);
        console.log($scope.commentsList);
       

        window.twttr = (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
              t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function (f) {
                t._e.push(f);
            };

            return t;
        }(document, "script", "twitter-wjs"));

    }

    $scope.submitComment = function () {
        var newComment = {
            _id: 10,
            userName: "asmaa mohammed Gamal",
            comment: $scope.commentTxt,
            date :"Aug-3-2017"
        }
        $scope.commentsList.push(newComment);
        $scope.commentTxt = "";
    }

    $scope.fbshareCurrentPage = function (_itemName) {
        window.open("https://www.facebook.com/sharer/sharer.php?u=" + escape(window.location.href) + "&quote="+encodeURIComponent(_itemName) + "&title=" + document.title, '',
    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
        return false;
    }
});