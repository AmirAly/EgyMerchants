var productWidget = $(".products-widget");
productWidget.each(function () {
    var jcarousetItemsNumber = $(this).find("ul li").size();
    var scrollItems = 3;
    var autoTime = 0;
    if (jcarousetItemsNumber > 3) {
        if ($(this).hasClass('autoscroll')) { scrollItems = 1; autoTime = 3; }
        $(this).jcarousel({
            vertical: true,
            items: 'ul.slides li',
            scroll: scrollItems,
            wrap: 'circular',
            auto: autoTime,
            animation: "slow",
            easing: "swing",
            buttonNextHTML: '<a></a>',
            buttonPrevHTML: '<a></a>'
        });
    }
})