egm.controller("categoriesListController", function ($scope, API) {

    $('.bs-example-modal-lg').on('hidden.bs.modal', function () {
        $scope.frmAddCategory.$setPristine();
        $scope.isEmpty = true;
        $scope.errMsg = false;
        $scope.errdiv = false;
        $scope.category = {};
        $scope.$apply();
    });


    $scope.addCategory = function () {
        $scope.loading = true;
        var req = {
            method: 'post',
            url: '/Category/Add',
            data: {
                Name: $scope.category.Name,
                Status: "Active"
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                window.location.reload();
            } else {
                $scope.loading = false;
                if (_res.data.code == 21) {
                    $scope.errMsg = true;
                    $scope.errdiv = true;
                    $scope.errorMsg = _res.data.data;
                } else {
                    $scope.loading = false;
                    $scope.errMsg = true;
                    $scope.errdiv = true;
                    $scope.errorMsg = _res.data.data;
                }
            }
        });
    };

    $scope.editCategory = function (_categoryId, _categoryName) {
        $scope.categoryId = _categoryId;
        $scope.categoryName = _categoryName;
    };

    $scope.updateCategory = function () {
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Category/Edit',
            data: {
                _id: $scope.categoryId,
                Name: $scope.categoryName,
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                window.location.reload();
            } else {
                $scope.loading = false;
                if (_res.data.code == 21) {
                    $scope.errMsg = true;
                    $scope.errdiv = true;
                    $scope.errorMsg = _res.data.data;
                    $('.bs-example-modal-lg2').on('hidden.bs.modal', function () {
                        $scope.errMsg = false;
                        $scope.errdiv = false;
                    });
                } else {
                    $scope.loading = false;
                    $scope.errMsg = true;
                    $scope.errdiv = true;
                    $scope.errorMsg = _res.data.data;
                    $('.bs-example-modal-lg2').on('hidden.bs.modal', function () {
                        $scope.errMsg = false;
                        $scope.errdiv = false;
                    });
                }
            }
        });
    };

    $scope.callDelModal = function (_categoryId) {
        $scope.categoryDelId = _categoryId;
    };

    $scope.removeCategory = function () {
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Category/Suspend',
            data: {
                _id: $scope.categoryDelId
            }
        }
        API.execute(req).then(function (_res) {
            if (_res.data.code == 100) {
                window.location.reload();
            } else {
                $scope.loading = false;
                if (_res.data.code == 21) {
                    $scope.errMsg = true;
                    $scope.errdiv = true;
                    $scope.errorMsg = _res.data.data;
                } else {
                    $scope.loading = false;
                    $scope.errMsg = true;
                    $scope.errdiv = true;
                    $scope.errorMsg = _res.data.data;
                }
            }
        });
    };

    $scope.signOut = function () {
        window.location.href = '/Home';
        localStorage.clear();
    };

});