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
    }, 500);
});



//var currentExpo = 0;
//var scrolling = false;
//function scrollToNext(e)
//{
//    //var expoId = Expos[currentExpo];
//    e.preventDefault();
//    if (scrolling == true || currentExpo > 5)
//        return;
//    currentExpo++;
//    scrolling = true;
//    document.getElementById('expo' + currentExpo).scrollIntoView();
    
//    setTimeout(function () {
//        scrolling = false
//    }, 1000);
    
//    return false;

//}
//function scrollToPrev(e) {
//    //var expoId = Expos[currentExpo];
//    e.preventDefault();
//    if (scrolling == true || currentExpo == 1)
//        return;
//    currentExpo--;
//    scrolling = true;
//    document.getElementById('expo' + currentExpo).scrollIntoView();
//    setTimeout(function () {
//        scrolling = false
//    }, 1000);
    
//    return false;

//}
//document.onscroll =  scrollToNext;
//document.onkeydown = checkKey;

//function checkKey(e) {

//    e = e || window.event;
//    if (e.keyCode == '40') {
//        scrollToNext(e);
//    }
//    else if (e.keyCode == '38') {
//        scrollToPrev(e);
//    }

//}



function toggle(_id) {
    if ($('.expoPagingController' + _id).hasClass('hide')) {
        $('.expoPagingController' + _id).removeClass('hide');
        $('.expoPagingControllerRemoval' + _id).addClass('hide');
        $('.dvPageNumbers' + _id).addClass('hide');
        $('.dvPageNumbers' + _id).animate({ opacity: '0' }, "fast");
    }
    else {
        $('.expoPagingController' + _id).addClass('hide');
        $('.expoPagingControllerRemoval' + _id).removeClass('hide');
        $('.dvPageNumbers' + _id).removeClass('hide');
        $('.dvPageNumbers' + _id).animate({ opacity: '1' }, "slow");
    }
}
function selectPage (_id,_floor) {
    $('.btnChangePage').removeClass('active');
    $('.page'+_floor).addClass('active');
}