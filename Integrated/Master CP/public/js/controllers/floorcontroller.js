egm.controller("floorController", function ($scope, API, $filter) {
    

    $scope.signOut = function () {
        window.location.href = '/eg/Home';
        localStorage.clear();
    };

    $scope.floor = JSON.parse(localStorage.getItem('EditedFloor'));
    $scope.expo = JSON.parse(localStorage.getItem('EditedExpo'));
    console.log($scope.floor);

    $scope.addSection = function () {
        $scope.getSelected();
        $('#modal').modal('toggle');
        // clear modal 
        //..
    }
   
    $scope.getSelected = function () {
        $scope.oneStoreCoordinates = {};
        // filter array by isBusy status to get selected Sections
        $scope.selectedSections = $filter('filter')($scope.floor.Sections, { isBusy: true });
        console.log($scope.selectedSections);
        // get lowest & highest values
        // width
        function findMinCoordinateYcoulmn() {
            var result = null;
            for (var i = 0; i < $scope.selectedSections.length; i++) {
                var account = $scope.selectedSections[i];
                if (result == null || account.sectionCoordinateYcoulmn < result.sectionCoordinateYcoulmn) {
                    result = account;
                }
            }
            return result;
        }
        var minW = findMinCoordinateYcoulmn().sectionCoordinateYcoulmn;
        function findMaxCoordinateYcoulmn() {
            var result = null;
            for (var i = 0; i < $scope.selectedSections.length; i++) {
                var account = $scope.selectedSections[i];
                if (result == null || account.sectionCoordinateYcoulmn > result.sectionCoordinateYcoulmn) {
                    result = account;
                }
            }
            return result;
        }
        var maxW = findMaxCoordinateYcoulmn().sectionCoordinateYcoulmn;
        sectionWidth = (maxW - minW) + 1;
        console.log("sectionWidth : " + sectionWidth);
        // height
        function findMinCoordinateXrow() {
            var result = null;
            for (var i = 0; i < $scope.selectedSections.length; i++) {
                var account = $scope.selectedSections[i];
                if (result == null || account.sectionCoordinateXrow < result.sectionCoordinateXrow) {
                    result = account;
                }
            }
            return result;
        }
        var minH = findMinCoordinateXrow().sectionCoordinateXrow;
        function findMaxCoordinateXrow() {
            var result = null;
            for (var i = 0; i < $scope.selectedSections.length; i++) {
                var account = $scope.selectedSections[i];
                if (result == null || account.sectionCoordinateXrow > result.sectionCoordinateXrow) {
                    result = account;
                }
            }
            return result;
        }
        var maxH = findMaxCoordinateXrow().sectionCoordinateXrow;
        sectionHeight = (maxH - minH) + 1;
        console.log("sectionHeight : " + sectionHeight);
        console.log("Top : " + (minH - 1) + " Left : " + (minW - 1));
        // add data to coordinates array
        console.log($scope.selectedstore);
        $scope.oneStoreCoordinates = {
            Top: (minH - 1),
            Left: (minW - 1),
            Width: sectionWidth,
            Height: sectionHeight,
            Img: $('#imgItem').attr('src'),
            Store: $scope.selectedstore._id,
            StoreName: $scope.selectedstore.Name
        };
        $scope.floor.Coordinates.push($scope.oneStoreCoordinates);
        $scope.imgLink = '';
        //add class busy
        $('.active').addClass('busy').removeClass('active');
        // clear array from active , isBusy status
        for (var i = 0; i < $scope.floor.Sections.length; i++) {
            if ($scope.floor.Sections[i].isBusy != false) {
                $scope.floor.Sections[i].isBusy = false;
                $scope.floor.Sections[i].data = '';
            }
        }
    }
    //load from coordinates array
    $scope.loadArray = function () {
        //empty container dv
        document.getElementById('imagesContainer').innerHTML = "";
        // get window height & width
        var containerHeight = document.getElementById('imagesContainer').offsetHeight;
        var containerWidth = document.getElementById('imagesContainer').offsetWidth;
        var oneSectionHeight = containerHeight / 5;
        var oneSectionWidth = containerWidth / 6;
        for (var i = 0; i < $scope.floor.Coordinates.length; i++) {
            var top = $scope.floor.Coordinates[i].Top * oneSectionHeight;
            var left = $scope.floor.Coordinates[i].Left * oneSectionWidth;
            var height = $scope.floor.Coordinates[i].Height * oneSectionHeight;
            var width = $scope.floor.Coordinates[i].Width * oneSectionWidth;
            var div = document.createElement('div');
            div.innerHTML = '<div style="background-image:url(' + $scope.floor.Coordinates[i].Img + ');position:absolute;top:' + top + ';left:' + left + ';height:' + height + ';width:' + width + ';background-size: cover;background-repeat: no-repeat;"></div>';
            document.getElementById('imagesContainer').appendChild(div);
        }
    }
    $scope.loadArray();

    //$scope.selectSection = function (_section) {
    //    console.log(_section);
    //    if (_section.data != "") {
    //        _section.isBusy = !_section.isBusy;
    //        $scope['active' + _section.sectionId] = !$scope['active' + _section.sectionId];
    //        console.log($scope['active' + _section.sectionId]);
    //    }
    //}

    var pathArray = window.location.pathname.split('/');

    $scope.saveFloor = function () {
       
        console.log($scope.floor);

        for (var i = 0; i < $scope.expo.Floors.length; i++) {
            if ($scope.expo.Floors[i]._id == $scope.floor._id) {
                $scope.expo.Floors[i] = $scope.floor;
            }
        }

        $scope.loading = true;
        var req = {
            method: 'put',
            url: '/Expo/Edit',
            data: {
                _id: $scope.expo._id,
                Title: $scope.expo.Title,
                Category: $scope.expo.Category,
                Floors: $scope.expo.Floors,
                Banner: $scope.expo.Banner
            }
        }
        API.execute(req).then(function (_res) {
            console.log(_res);
            if (_res.data.code == 100) {
                window.location.reload();
                window.location.href = '/eg/expo/' + $scope.expo._id;
            } else {
                console.log('Something went error');
                $scope.loading = false;
            }
        });
    }

    $scope.ShowFileSelector = function () {
        document.getElementById('uploadItemImage').click()
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