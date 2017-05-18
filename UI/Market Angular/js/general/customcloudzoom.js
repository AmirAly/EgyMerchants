CloudZoom.quickStart();
jQuery(function ($) {
    "use strict";
    var $mainContainer = $(".container"),
        $section = $(".products-list"),
        $links = $(".quick-view:not(.fancybox)"),
        $view = $(".product-view-ajax"),
        $container = $(".product-view-container", $view),
        $loader = $(".ajax-loader", $view),
        $layar = $(".layar", $view),
        $slider;
    var initProductView = function ($productView) {
        var $slider = $(".flexslider-large", $productView),
            $nav = $(".flexslider-thumb", $productView),
            $navvertical = $(".flexslider-thumb-vertical", $productView),
            $close = $(".close-view", $productView);
        if ($productView && $productView.length) $.initSelect($productView.find(".btn-select"));
        $navvertical.each(function () {
            var jcarousetItemsNumber = $(this).find("ul li").size();
            if (jcarousetItemsNumber > 3) {
                $(this).flexVSlider({
                    animation: "slide",
                    direction: "vertical",
                    move: 3,
                    keyboard: false,
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    prevText: "",
                    nextText: ""
                })
            }
        })
        $nav.each(function () {
            var jcarousetItemsNumber = $(this).find("ul li").size();
            if (jcarousetItemsNumber > 3) {
                $(this).flexslider({
                    animation: "slide",
                    keyboard: false,
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    prevText: "",
                    nextText: "",
                    itemWidth: 76,
                    itemMargin: 7
                })
            }
        })
        $slider.flexslider({
            animation: "slide",
            keyboard: false,
            controlNav: true,
            directionNav: true,
            animationLoop: false,
            slideshow: false,
            prevText: "",
            nextText: ""
        });
        $close.click(function (e) {
            e.preventDefault();
            $container.slideUp(500, function () {
                $container.empty();
                $view.hide();
                $container.show()
            })
        })
    };
    $links.click(function (e) {
        if ($(".hidden-xs").is(":visible")) {
            e.preventDefault();
            var $this = $(this),
                url = $this.attr("href");
            if ($this.closest(".product-carousel").length > 0) $this.closest(".row").find(".product-view-ajax-container").first().append($view);
            else $this.parent().parent().nextAll(".product-view-ajax-container").first().append($view);
            $view.show();
            $layar.show();
            $loader.show();
            $.ajax({
                url: url,
                cache: false,
                success: function (data) {
                    var $data = $(data);
                    initProductView($data);
                    $loader.hide();
                    $layar.hide();
                    if (!$container.text()) {
                        $data.hide();
                        $container.empty().append($data);
                        $data.slideDown(500)
                    } else $container.empty().append($data)
                },
                complete: function () {
                    if ($(".various").length > 0) $(".various").fancybox({
                        maxWidth: 800,
                        maxHeight: 600,
                        fitToView: false,
                        width: "70%",
                        height: "70%",
                        autoSize: false,
                        closeClick: false,
                        openEffect: "none",
                        closeEffect: "none"
                    });
                    console.log("ajax complete");
                    CloudZoom.quickStart()
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $loader.hide();
                    $container.html(textStatus)
                }
            })
        }
    });
    initProductView();
    var productCarousel = $(".product-carousel"),
        container = $(".container");
    if (productCarousel.length > 0) productCarousel.each(function () {
        var items = 4,
            itemsDesktop = 4,
            itemsDesktopSmall = 3,
            itemsTablet = 2,
            itemsMobile = 1;

        if ($("body").hasClass("noresponsive")) {

            var items = 4,
                itemsDesktop = 4,
                itemsDesktopSmall = 4,
                itemsTablet = 4,
                itemsMobile = 4;
            if ($(this).closest("section.col-md-8.col-lg-9").length > 0) var items = 3,
                itemsDesktop = 3,
                itemsDesktopSmall = 3,
                itemsTablet = 3,
                itemsMobile = 3;
            else if ($(this).closest("section.col-lg-9").length > 0) var items = 3,
                itemsDesktop = 3,
                itemsDesktopSmall = 3,
                itemsTablet = 3,
                itemsMobile = 3;
            else if ($(this).closest("section.col-sm-12.col-lg-6").length > 0) var items = 2,
                itemsDesktop = 2,
                itemsDesktopSmall = 2,
                itemsTablet = 2,
                itemsMobile = 2;
            else if ($(this).closest("section.col-lg-6").length > 0) var items = 2,
                itemsDesktop = 2,
                itemsDesktopSmall = 2,
                itemsTablet = 2,
                itemsMobile = 12;
            else if ($(this).closest("section.col-sm-12.col-lg-3").length > 0) var items = 1,
                itemsDesktop = 1,
                itemsDesktopSmall = 1,
                itemsTablet = 1,
                itemsMobile = 1;
            else if ($(this).closest("section.col-lg-3").length > 0) var items = 1,
                itemsDesktop = 1,
                itemsDesktopSmall = 1,
                itemsTablet = 1,
                itemsMobile = 1;

        } else if ($(this).closest("section.col-md-8.col-lg-9").length > 0) var items = 3,
            itemsDesktop = 3,
            itemsDesktopSmall = 2,
            itemsTablet = 2,
            itemsMobile = 1;
        else if ($(this).closest("section.col-lg-9").length > 0) {
            var items = 3,
                itemsDesktop = 3,
                itemsDesktopSmall = 2,
                itemsTablet = 2,
                itemsMobile = 1;
        }
        else if ($(this).closest("section.col-sm-12.col-lg-6").length > 0) var items = 2,
            itemsDesktop = 2,
            itemsDesktopSmall = 3,
            itemsTablet = 2,
            itemsMobile = 1;
        else if ($(this).closest("section.col-lg-6").length > 0) var items = 2,
            itemsDesktop = 2,
            itemsDesktopSmall = 2,
            itemsTablet = 2,
            itemsMobile = 1;
        else if ($(this).closest("section.col-sm-12.col-lg-3").length > 0) var items = 1,
            itemsDesktop = 1,
            itemsDesktopSmall = 3,
            itemsTablet = 2,
            itemsMobile = 1;
        else if ($(this).closest("section.col-lg-3").length > 0) var items = 1,
            itemsDesktop = 1,
            itemsDesktopSmall = 2,
            itemsTablet = 2,
            itemsMobile = 1;
        $(this).owlCarousel({
            items: items,
            itemsDesktop: [1199, itemsDesktop],
            itemsDesktopSmall: [980, itemsDesktopSmall],
            itemsTablet: [768, itemsTablet],
            itemsTabletSmall: false,
            itemsMobile: [360, itemsMobile],
            navigation: true,
            pagination: false,
            rewindNav: false,
            navigationText: ["", ""],
            scrollPerPage: true,
            slideSpeed: 500,
            beforeInit: function rtlSwapItems(el) {
                if ($("body").hasClass("rtl")) el.children().each(function (i, e) {
                    $(e).parent().prepend($(e))
                })
            },
            afterInit: function afterInit(el) {
                if ($("body").hasClass("rtl")) this.jumpTo(1000)
            }
        })
    });
    var productsListSmall = $(".products-list-small .slides");
    if (productsListSmall.length > 0) {
        var items = 12,
            itemsDesktop = 12,
            itemsDesktopSmall = 8,
            itemsTablet = 6,
            itemsMobile = 3;
        if ($("body").hasClass("noresponsive")) var items = 12,
            itemsDesktop = 12,
            itemsDesktopSmall = 12,
            itemsTablet = 12,
            itemsMobile = 12;
        productsListSmall.owlCarousel({
            items: items,
            itemsDesktop: [1199, itemsDesktop],
            itemsDesktopSmall: [980, itemsDesktopSmall],
            itemsTablet: [768, itemsTablet],
            itemsTabletSmall: false,
            itemsMobile: [360, itemsMobile],
            navigation: true,
            pagination: false,
            rewindNav: false,
            navigationText: ["", ""],
            scrollPerPage: true,
            slideSpeed: 500,
            beforeInit: function rtlSwapItems(el) {
                if ($("body").hasClass("rtl")) el.children().each(function (i, e) {
                    $(e).parent().prepend($(e))
                })
            },
            afterInit: function afterInit(el) {
                if ($("body").hasClass("rtl")) this.jumpTo(1000)
            }
        })
    }

    var brandsCarousel = $(".brands-carousel ul");
    var brandsCarouselMax = 6;
    if ($(".content-center .brands-carousel ul").length > 0) { brandsCarouselMax = 4 }

    if (brandsCarousel.length > 0) {
        brandsCarousel.carouFredSel({
            responsive: true,
            width: '100%',
            scroll: 1,
            prev: '#brands-carousel-prev',
            next: '#brands-carousel-next',
            items: {
                width: 170,
                height: '30%',	//	optionally resize item-height
                visible: {
                    min: 1,
                    max: brandsCarouselMax
                }
            }
        });

    }
    var productWidgets = $(".product-widgets");
    if (productWidgets.length > 0) productWidgets.owlCarousel({
        items: 1,
        navigation: true,
        pagination: false,
        rewindNav: false,
        navigationText: ["", ""],
        scrollPerPage: true,
        slideSpeed: 300
    });
    var $contentcenter = $(".content-center"),
        $contentaside = $(".content-aside");
    if ($(".visible-xs").is(":visible")) $contentcenter.insertBefore($contentaside);
    $(window).resize(function () {
        var $contentcenter = $(".content-center"),
            $contentaside = $(".content-aside");
        if ($(".visible-xs").is(":visible")) $contentcenter.insertBefore($contentaside);
        else $contentaside.insertBefore($contentcenter)
    })
});