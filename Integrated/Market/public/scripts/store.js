jQuery(document).ready(function () {
    setTimeout(function () {
        $('.loaderContainer').addClass('hide');
        $('.loader').addClass('hide');


        console.log($('#StoreName').text()); 
        localStorage.setItem('StoreId', JSON.stringify($('#StoreId').text()));
        localStorage.setItem('StoreName', JSON.stringify($('#StoreName').text()));
    }, 500);


});	//ready


