$(document).ready(function () {
    swinch.init(null, {
        onBeforeSnap: function (current, next, direction) {
            console.log('onBeforeSnap', current, next, direction);
        },
        onSnapped: function (current, previous, direction) {
            console.log('onSnapped', current, previous, direction);
        }
    });
    //smoothScroll.init();

    //setTimeout(function () {
        $('.loaderContainer').addClass('hide');
        $('.loader').addClass('hide');
    //}, 2000);
});



function toggle(_id) {
    if ($('.expoPagingController' + _id).hasClass('hide')) {
        //hide paging
        $('.expoPagingController' + _id).removeClass('hide');
        $('.expoPagingControllerRemoval' + _id).addClass('hide');
    }
    else {
        //show paging
        $('.expoPagingController' + _id).addClass('hide');
        $('.expoPagingControllerRemoval' + _id).removeClass('hide');
    }
    $('.whiteLayerContainer' + _id).toggleClass('clicked');
}
function selectPage (_id,_floor) {
    $('.btnChangePage').removeClass('active');
    $('.page' + _floor).addClass('active');
    $('#expo' + _id + ' .repeated-item').fadeOut('50', 'linear').fadeIn('50', 'linear').animate({ opacity: '1' }, "50");
}

//jQuery(function ($) {
//    $("#brands-slider-demo-8").owlCarousel({
//        lazyLoad: true,
//        itemsCustom: [[0, 1], [320, 1], [480, 2], [640, 3], [768, 4], [992, 5], [1200, 5]],
//        responsiveRefreshRate: 50,
//        slideSpeed: 200,
//        paginationSpeed: 500,
//        scrollPerPage: false,
//        stopOnHover: true,
//        rewindNav: true,
//        rewindSpeed: 600,
//        pagination: false,
//        navigation: true,
//        autoPlay: true,
//        navigationText: ["<i class='icon-left-open'></i>", "<i class='icon-right-open'></i>"]
//    });
//});