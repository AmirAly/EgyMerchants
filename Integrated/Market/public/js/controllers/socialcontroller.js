app.controller("socialController", function ($scope, $rootScope, $timeout, API) {
    
    $rootScope.Contacts = [{ Label: 'Address', Value: 'End of Al-ashraf st., El Imam tower, Tanta, Egypt.' },
    { Label: 'Phone', Value: '+2 (012) 111 11111' },
    { Label: 'Mobile', Value: '+2 (012) 222 22222' },
    { Label: 'Fax', Value: '+2 (012) 333 33333' }
    ]

    jQuery(function ($) {
        "use strict";

        $rootScope.TwitterLink = "https://twitter.com/TwitterLive";
        $rootScope.FacebookLink = "https://www.facebook.com/AppoutLLC";

        $('.twitter-timeline').attr('href', $rootScope.TwitterLink);
        $('.fb-like-box').attr('data-href', $rootScope.FacebookLink);

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_EN/all.js#xfbml=1&appId=469510423153590";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));



        var socialItems = $('.social-widgets .items .item');
        var counter = 0;
        socialItems.each(function () {
            counter++;
            var itemclass = "item-0" + counter;
            $(this).addClass(itemclass)
        });


        var loadmap = $(".social-widgets .item a");
        loadmap.click(function (e) {
            e.preventDefault()
        });
        loadmap.hover(function (e) {
            if (!$(this).parent().hasClass("load")) {
                var loadcontainer = $(this).parent().find(".loading");
                $.ajax({
                    url: $(this).attr("href"),
                    cache: false,
                    success: function (data) {
                        setTimeout(function () {
                            //loadcontainer.html(data)
                        }, 1000)
                    }
                });
                $(this).parent().addClass("load")
            }
        });
        

        $(".social-widgets .item").each(function () {
            var $this = $(this),
            timer;
            $this.on("mouseenter", function () {
                var $this = $(this);
                if (timer) clearTimeout(timer);
                timer = setTimeout(function () {
                    $this.addClass("active")
                }, 200)
            }).on("mouseleave", function () {
                var $this = $(this);
                if (timer) clearTimeout(timer);
                timer = setTimeout(function () {
                    $this.removeClass("active")
                }, 100)
            }).on("click", function (e) {
                e.preventDefault()
            })
        });


    });

});
