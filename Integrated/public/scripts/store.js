jQuery(document).ready(function () {
    setTimeout(function () {
        $('.loaderContainer').addClass('hide');
        $('.loader').addClass('hide');
    }, 500);


});	//ready

     function next() {
        $('#myCarousel').carousel('next');
    }

     
     function pre() {
        $('#myCarousel').carousel('prev');
    }