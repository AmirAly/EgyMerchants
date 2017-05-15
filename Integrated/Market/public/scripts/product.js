jQuery(document).ready(function () {
    setTimeout(function () {
        $('.loaderContainer').addClass('hide');
        $('.loader').addClass('hide');


        var StoreId = JSON.parse(localStorage.getItem('StoreId'));
        var StoreName = JSON.parse(localStorage.getItem('StoreName'));
        $('#StoreName').html(StoreName);

        var GalleyId = JSON.parse(localStorage.getItem('galleryId'));
        var GalleyName = JSON.parse(localStorage.getItem('galleryName'));
        $('#GalleyName').html(GalleyName);

        $("#StoreNameLink").attr("href", "/Eg/Store/" + StoreName + "/" + StoreId + "");
        $("#GalleyNameLink").attr("href", "/Eg/Store/" + GalleyName + "/" + GalleyId + "");

    }, 500);
    
});	//ready