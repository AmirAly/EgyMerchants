egm.controller("storeController", function ($scope, API) {
    var checkboxesChecked = [];

    $scope.getCheckedBoxes = function (optionsCheckboxes) {
        var checkboxes = document.getElementsByName(optionsCheckboxes);
        // loop over them all
        for (var i = 0; i < checkboxes.length; i++) {
            // And stick the checked ones onto an array...
            console.log(checkboxes[i].checked)
            if (checkboxes[i].checked) {
                checkboxesChecked.push(checkboxes[i].value);
            }
        }
        console.log(checkboxesChecked);
        // Return the array if it is non-empty, or null
        return checkboxesChecked.length > 0 ? checkboxesChecked : null;
    };

































    //$scope.preload = function () {
    //    if (localStorage.getItem('StoreId') == null || localStorage.getItem('StoreId') == '') {
    //        window.location.href = '/eg/Home';
    //    }
    //};

    //$scope.preload();

    //$scope.store = {};
    //$scope.store._id = localStorage.getItem('StoreId');
    //$scope.store.Imgs = [];

    //console.log(localStorage.getItem('StoreId'));

    //$scope.signOut = function () {
    //    window.location.href = '/eg/Home';
    //    localStorage.clear();
    //};



    //$scope.save = function () {
    //    $scope.profileImg = {
    //        URL: $('#imgItem').attr('src')
    //    }
    //    $scope.store.Imgs.push($scope.profileImg);
    //    console.log($scope.store);
    //    $scope.loading = true;
    //    var req = {
    //        method: 'put',
    //        url: '/Store/EditProfile',
    //        data: $scope.store
    //    }
    //    console.log($scope.store);
    //    API.execute(req).then(function (res) {
    //        if (res.data.code == 100) {
    //            console.log(res);
    //            window.location.reload();
    //        } else {
    //            console.log(res.data.data);
    //            console.log('canot edit');
    //            $scope.loading = false;
    //        }
    //    });
    //};
});
