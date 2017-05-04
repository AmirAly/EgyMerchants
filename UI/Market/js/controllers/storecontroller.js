app.controller("storeController", function ($scope, $state, $rootScope, $timeout) {
    $scope.categories = [];
    $timeout(function () {
        $scope.categories = [
                { Title: 'Furniture', Img: 'http://review.topmaxtech.net/content/uploads/%D8%A3%D8%AD%D8%AF%D8%AB-%D8%BA%D8%B1%D9%81-%D9%86%D9%88%D9%85-%D9%85%D9%88%D8%AF%D8%B1%D9%86-2016modern-bedroom-furniture-2016-modern-bedroom-2016-modern-bedroom-%D9%85%D8%B9%D8%B1%D8%B6%D8%A7%D9%84%D9%86%D8%AC%D8%A7%D8%B1-%D8%AF%D9%8A%D8%B2%D8%A7%D9%8A%D9%86-%D9%84%D9%84%D9%85%D9%88%D8%A8%D9%8A%D9%84%D9%8A%D8%A7-%D9%88%D8%A7%D9%84%D8%A7%D8%AB%D8%A7%D8%AB-%D8%A7%D9%84%D9%85%D9%86%D8%B2%D9%84%D9%89-1.jpg' },
                { Title: 'Fashion', Img: 'http://wallpaperscraft.com/image/fashion_week_spring_2014_milan_street_style_97093_2560x1704.jpg' },
                { Title: 'Glasses', Img: 'http://wallpaperscraft.com/image/glasses_diopters_lenses_book_114886_4366x2911.jpg' },
                { Title: 'Watches', Img: 'http://wallpaperscraft.com/image/omega_watches_dial_style_108980_2880x1800.jpg' },
                { Title: 'Sports', Img: 'http://wallpaperscraft.com/image/dumbbells_sports_gym_106546_602x339.jpg' },
                { Title: 'Foods', Img: 'http://wallpaperscraft.com/image/food_pastries_bread_cheese_meat_86723_602x339.jpg' },
                { Title: 'Shoses', Img: 'http://wallpaperscraft.com/image/adidas_forum_mid_mnr_3_sneakers_95139_602x339.jpg' },
                { Title: 'perfume', Img: 'http://wallpaperscraft.com/image/chanel_coco_mademoiselle_perfume_audrey_hepburn_101735_602x339.jpg' },
                { Title: 'Cars', Img: 'http://wallpaperscraft.com/image/supercars_carbon_fiber_koenigsegg_supercar_street_90589_602x339.jpg' },
                { Title: 'Mobiles', Img: 'http://wallpaperscraft.com/image/nokia_windows_phone_concept_novelty_mobile_phone_smartphone_92936_602x339.jpg' },
                { Title: 'Makeup', Img: 'http://wallpaperscraft.com/image/lancome_makeup_eye_shadow_lipstick_42632_602x339.jpg' },
                { Title: 'Bikes', Img: 'http://wallpaperscraft.com/image/yamaha_yzf_r1_yamaha_sport_bike_95773_602x339.jpg' }
        ];
    }, 2000);


    $scope.next = function () {
        $('#myCarousel').carousel('next');
    }


    $scope.pre = function () {
        $('#myCarousel').carousel('prev');
    }
});