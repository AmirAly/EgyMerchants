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
});
