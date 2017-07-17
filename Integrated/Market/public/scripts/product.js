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

<<<<<<< HEAD
        $("#StoreNameLink").attr("href", "/EG/Store/" + StoreName + "/" + StoreId + "");
        $("#GalleyNameLink").attr("href", "/EG/Store/" + GalleyName + "/" + GalleyId + "");
=======
        $("#StoreNameLink").attr("href", "/Eg/Store/" + StoreName + "/" + StoreId + "");
        $("#GalleyNameLink").attr("href", "/Eg/Store/" + GalleyName + "/" + GalleyId + "");
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813

    }, 500);
    
});	//ready