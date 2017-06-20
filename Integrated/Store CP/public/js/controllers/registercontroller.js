egm.controller("registerController", function ($scope, API, $rootScope) {
    $scope.categories = [];
    $scope.register = {};


    $scope.chooseCategory = function (_id) {
        console.log(_id);
        _id = '590726b2f36d286835cb21a3';
        $scope.categoryId = _id;

        
    };
    $scope.selectedCity = '59067579734d1d32590f51dd';
    $scope.next = function () {
        $scope.frmRegister.txtCity.$validate();
        $scope.frmRegister.txtAddress.$validate();
        $scope.frmRegister.txtDescription.$validate();
    }

    $scope.signOut = function () {
        window.location.href = '/eg/Home';
        localStorage.clear();
    };

    $scope.registerStore = function () {
        console.log($scope.selectedCity);
        $scope.register.CountryISOCode = $scope.selectedCity;
        $scope.register.Category = $scope.categoryId;

        $scope.register.ProfilePicture = $('#imgItem').attr('src');
        
        $scope.loading = true;
        var req = {
            method: 'post',
            url: '/Store/Register',
            data:$scope.register
        }
        API.execute(req).then(function (res) {
            if (res.data.code == 100) {
                console.log(res.data.data);
                window.location.href = '/eg/Home';
            } else {
                $scope.errMsg = true;
                $scope.errdiv = true;
                console.log(res.data);
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