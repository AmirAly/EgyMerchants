egm.controller("categoriesListController", function ($scope, API, $filter) {

    $('.bs-example-modal-lg').on('hidden.bs.modal', function () {
        $scope.category = {};
        $scope.selectedCountry = $scope.countryData[0]._id;
        document.getElementById("frmAddCategory").reset();
        $scope.frmAddCategory.$setUntouched();
        $scope.frmAddCategory.$setPristine();
        $scope.isEmpty = true;
        $scope.errMsg = false;
        $scope.errdiv = false;
        $scope.$apply();
    });

    $scope.currentCategory = JSON.parse((window.categoryObject).replace(/&quot;/g, '"'));
    $scope.init = function (_country) {
        $scope.countryData = JSON.parse(_country);
        $scope.selectedCountry = $scope.countryData[0]._id;
    }

    $scope.addCategory = function () {
        $scope.loading = true;
        var req = {
            method: 'post',
            url: '/Category/Add',
            data: {
                Name: $scope.category.Name,
                Status: "Active",
                Country: $scope.selectedCountry
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

    $scope.editCategory = function (_categoryId) {
        $scope.categoryLst = [];
        $scope.categoryId = _categoryId;
        $scope.categoryLst = $filter('filter')($scope.currentCategory, { _id: $scope.categoryId })[0];
        $scope.selectedCountryEdite = $scope.categoryLst.Country._id;
        $scope.countryName = $scope.categoryLst.Name;
    };

    $scope.updateCategory = function () {
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Category/Edit',
            data: {
                _id: $scope.categoryId,
                Name: $scope.countryName,
                Country: $scope.selectedCountryEdite
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
            url: '/Category/Remove',
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