egm.controller("storeController", function ($scope, API) {
    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
    };

    $scope.preload = function () {
        if (localStorage.getItem('StoreId') == null || localStorage.getItem('StoreId') == '') {
            window.location.href = '/eg/Home';
        }
    };

    $scope.preload();

    $scope.store = {};
    $scope.store._id = localStorage.getItem('StoreId');
    //$scope.store.Imgs = [];

    console.log(localStorage.getItem('StoreId'));

    $scope.signOut = function () {
        window.location.href = '/eg/Home';
        localStorage.clear();
    };

    
    $scope.store.ProfilePicture = $('#imgItem').attr('src');

    $scope.save = function () {
        
        $scope.store.ProfilePicture = $('#imgItem').attr('src');
        console.log($scope.store);
        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Store/EditProfile',
            data: $scope.store
        }
        console.log($scope.store);
        API.execute(req).then(function (res) {
            if (res.data.code == 100) {
                console.log(res);
                window.location.reload();
            } else {
                console.log(res.data.data);
                console.log('canot edit');
                $scope.loading = false;
            }
        });
    };
});
function convertImgToBase64URL(event) {
    var filesSelected = document.getElementById("uploadItemImage").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            BaseImg64 = fileLoadedEvent.target.result;
            UploadImage(BaseImg64);
        };
        fileReader.readAsDataURL(fileToLoad);
    }
};

function UploadImage(_BaseImg64) {
    $('#imgItem').attr('src', _BaseImg64);
};