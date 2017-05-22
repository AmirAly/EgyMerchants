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

    setTimeout(function () {
        $('.loaderContainer').addClass('hide');
        $('.loader').addClass('hide');
    }, 2000);
});



function toggle(_id) {
    if ($('.expoPagingController' + _id).hasClass('hide')) {
        //hide paging
        $('.expoPagingController' + _id).removeClass('hide');
        $('.expoPagingControllerRemoval' + _id).addClass('hide');
        //$('.dvPageNumbers' + _id).addClass('hide');
        //$('.dvPageNumbers' + _id).animate({ opacity: '0' }, "fast");
    }
    else {
        //show paging
        $('.expoPagingController' + _id).addClass('hide');
        $('.expoPagingControllerRemoval' + _id).removeClass('hide');
        //$('.dvPageNumbers' + _id).removeClass('hide');
        //$('.dvPageNumbers' + _id).animate({ opacity: '1' }, "slow");
    }
    //$('.box img').on('click', function () {
    //$('.pagination-main').toggleClass('clicked');
    $('.whiteLayerContainer' + _id).toggleClass('clicked');
    //});
}
function selectPage (_id,_floor) {
    $('.btnChangePage').removeClass('active');
    $('.page' + _floor).addClass('active');
    $('#expo' + _id + ' .repeated-item').slideUp().animate({ opacity: '1' }, "fast").slideDown();
}