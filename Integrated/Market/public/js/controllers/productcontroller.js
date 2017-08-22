﻿app.controller("productController", function ($scope, $rootScope, $timeout, API) {
    //$scope.x = { "name": "ali", "password": "123456" };
    $scope.init = function (_isoCode, _itemId) {
        $rootScope.IsoCode = _isoCode;

        console.log(window.commentObject);
        $scope.commentsList = JSON.parse(window.commentObject);
        console.log($scope.commentsList);

        $scope.itemId = _itemId;
        $scope.favList = JSON.parse(localStorage.getItem('userObject')).FavouriteItems;
        console.log($scope.favList);
        if ($scope.favList.indexOf(_itemId) !== -1) {
            $scope.message = 'artNr already exists!';
            $scope.IsFav = true;
        }
        else {
            $scope.message = 'artNr Not exists!';
            $scope.IsFav = false;
        }
        console.log($scope.message);

        $scope.userType = JSON.parse(localStorage.getItem('userObject')).Type;
        console.log($scope.userType);
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

    $scope.fbshareCurrentPage = function (_itemName) {
        window.open("https://www.facebook.com/sharer/sharer.php?u=" + escape(window.location.href) + "&quote=" + encodeURIComponent(_itemName) + "&title=" + document.title, '',
    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
        return false;
    }


    $scope.addToFavorites = function (_itemId) {
        $rootScope.loading = true;
        $scope.favData = {};
        $scope.favData._userid = $rootScope.userId;
        $scope.favData._itemid = _itemId;

        var req = {
            method: 'put',
            url: '/User/AddToFavourites',
            data: $scope.favData
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                $rootScope.loading = false;
                $scope.IsFav = true;
                console.log('is fav');
                localStorage.setItem('userObject', JSON.stringify(_res.data.data));

            } else {
                $rootScope.loading = false;
                $scope.IsFav = false;
                console.log('not fav');
            }

        });
    }

    $scope.submitComment = function () {
        $rootScope.loading = true;
        $scope.newComment = {
            User: $rootScope.userId,
            Item: $scope.itemId,
            Text: $scope.commentTxt
        }

        var req = {
            method: 'post',
            url: '/Comment/Add',
            data: $scope.newComment
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                $rootScope.loading = false;
                $scope.commentsList.unshift(_res.data.data);
                $scope.commentTxt = "";

            } else {
                $rootScope.loading = false;
                console.log('fail');
            }

        });
    }

    $scope.deleteComment = function (_commentId) {
        $rootScope.loading = true;
        $scope.newComment = {
            _userid: $rootScope.userId,
            _commentid: _commentId,
        }
        var req = {
            method: 'put',
            url: '/Comment/Remove',
            data: $scope.newComment
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                window.location.reload();

            } else {
                $rootScope.loading = false;
                console.log('fail');
            }

        });
    }

});