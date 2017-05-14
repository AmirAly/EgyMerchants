jQuery(document).ready(function () {
    setTimeout(function () {
        $('.loaderContainer').addClass('hide');
        $('.loader').addClass('hide');

        $('#myCarousel .carousel-inner div:first').addClass('active');

    }, 500);


});	//ready


