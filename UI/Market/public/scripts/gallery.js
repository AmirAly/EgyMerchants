jQuery(document).ready(function () {
    setTimeout(function () {
        $('.loaderContainer').addClass('hide');
        $('.loader').addClass('hide');

        var StoreId = JSON.parse(localStorage.getItem('StoreId'));
        var StoreName = JSON.parse(localStorage.getItem('StoreName'));
        $('#StoreName').html(StoreName);
        localStorage.setItem('galleryName', JSON.stringify($('#galleryName').html()));
        localStorage.setItem('galleryId', JSON.stringify($('#galleryId').html()));

        $("#StoreNameLink").attr("href", "/Eg/Store/" + StoreName + "/" + StoreId + "");

    }, 500);
    
});	//ready