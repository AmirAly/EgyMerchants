var store = require('./models/stores');
var product = require('./models/products');
var gallery = require('./models/galleries');
var expo = require('./models/expoes');
var category = require('./models/categories');
module.exports = function (app) {
    // use res.render to load up an ejs view file
    // index page 

    app.get('/', function (req, res) {
        return res.redirect('/eg/Home');
    });

    // index page welcome + categories
    app.get('/Eg/Home', function (req, res) {
       
        //var categories = [
        //        { Title: 'Furniture', Img: 'http://review.topmaxtech.net/content/uploads/%D8%A3%D8%AD%D8%AF%D8%AB-%D8%BA%D8%B1%D9%81-%D9%86%D9%88%D9%85-%D9%85%D9%88%D8%AF%D8%B1%D9%86-2016modern-bedroom-furniture-2016-modern-bedroom-2016-modern-bedroom-%D9%85%D8%B9%D8%B1%D8%B6%D8%A7%D9%84%D9%86%D8%AC%D8%A7%D8%B1-%D8%AF%D9%8A%D8%B2%D8%A7%D9%8A%D9%86-%D9%84%D9%84%D9%85%D9%88%D8%A8%D9%8A%D9%84%D9%8A%D8%A7-%D9%88%D8%A7%D9%84%D8%A7%D8%AB%D8%A7%D8%AB-%D8%A7%D9%84%D9%85%D9%86%D8%B2%D9%84%D9%89-1.jpg' },
        //        { Title: 'Fashion', Img: 'http://wallpaperscraft.com/image/fashion_week_spring_2014_milan_street_style_97093_2560x1704.jpg' },
        //        { Title: 'Glasses', Img: 'http://wallpaperscraft.com/image/glasses_diopters_lenses_book_114886_4366x2911.jpg' },
        //        { Title: 'Watches', Img: 'http://wallpaperscraft.com/image/omega_watches_dial_style_108980_2880x1800.jpg' },
        //        { Title: 'Sports', Img: 'http://wallpaperscraft.com/image/dumbbells_sports_gym_106546_602x339.jpg' },
        //        { Title: 'Foods', Img: 'http://wallpaperscraft.com/image/food_pastries_bread_cheese_meat_86723_602x339.jpg' },
        //        { Title: 'Shoses', Img: 'http://wallpaperscraft.com/image/adidas_forum_mid_mnr_3_sneakers_95139_602x339.jpg' },
        //        { Title: 'perfume', Img: 'http://wallpaperscraft.com/image/chanel_coco_mademoiselle_perfume_audrey_hepburn_101735_602x339.jpg' },
        //        { Title: 'Cars', Img: 'http://wallpaperscraft.com/image/supercars_carbon_fiber_koenigsegg_supercar_street_90589_602x339.jpg' },
        //        { Title: 'Mobiles', Img: 'http://wallpaperscraft.com/image/nokia_windows_phone_concept_novelty_mobile_phone_smartphone_92936_602x339.jpg' },
        //        { Title: 'Makeup', Img: 'http://wallpaperscraft.com/image/lancome_makeup_eye_shadow_lipstick_42632_602x339.jpg' },
        //        { Title: 'Bikes', Img: 'http://wallpaperscraft.com/image/yamaha_yzf_r1_yamaha_sport_bike_95773_602x339.jpg' }
        //];
        //res.render('pages/landing', {
        //    categories: categories
        //});

        var _scope = {};
        category.getByCountry('591877219456be199851e654').then(function (_data) {
            console.log(_data);
            _scope.categories = _data;
            res.render('pages/landing', { categories: _data });
        }).catch(function (_err) { console.log(_err) });

    });

    // expo page expos
    app.get('/Eg/Expos/:catId', function (req, res) {

        //var expos = [
        //    {
        //        Id: 1,
        //        Title: 'Le Marché I',
        //        Banner: 'http://file.mrbool.com/mrbool/articles/RicardoArrigoni/Parallax/Parallax1.jpg',
        //        Sections: [
        //          { Id: 1, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a1.jpg' },
        //          { Id: 2, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a2.jpg' },
        //          { Id: 3, StoreName: 'almaksoud', StoreId: '3', Img: '/images/expo/advertise.png' },
        //          { Id: 4, StoreName: 'almaksoud', StoreId: '4', Img: '/images/expo/gallery_img-04.jpg' },
        //          { Id: 5, StoreName: 'almaksoud', StoreId: '5', Img: '/images/expo/gallery_img-05.jpg' },
        //          { Id: 6, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a3.jpg' },
        //          { Id: 7, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a4.jpg' },
        //          { Id: 8, StoreName: 'almaksoud', StoreId: '8', Img: '/images/expo/advertise.png' },
        //          { Id: 9, StoreName: 'almaksoud', StoreId: '9', Img: '/images/expo/gallery_img-09.jpg' },
        //          { Id: 10, StoreName: 'almaksoud', StoreId: '10', Img: '/images/expo/gallery_img-10.jpg' },
        //          { Id: 11, StoreName: 'almaksoud', StoreId: '11', Img: '/images/expo/gallery_img-11.jpg' },
        //          { Id: 12, StoreName: 'almaksoud', StoreId: '12', Img: '/images/expo/gallery_img-12.jpg' },
        //          { Id: 13, StoreName: 'almaksoud', StoreId: '13', Img: '/images/expo/advertise.png' },
        //          { Id: 14, StoreName: 'almaksoud', StoreId: '14', Img: '/images/expo/gallery_img-02.jpg' },
        //          { Id: 15, StoreName: 'almaksoud', StoreId: '15', Img: '/images/expo/gallery_img-03.jpg' },
        //          { Id: 16, StoreName: 'almaksoud', StoreId: '16', Img: '/images/expo/gallery_img-04.jpg' },
        //          { Id: 17, StoreName: 'almaksoud', StoreId: '17', Img: '/images/expo/gallery_img-05.jpg' },
        //          { Id: 18, StoreName: 'almaksoud', StoreId: '18', Img: '/images/expo/advertise.png' },
        //          { Id: 19, StoreName: 'almaksoud', StoreId: '19', Img: '/images/expo/gallery_img-07.jpg' },
        //          { Id: 20, StoreName: 'almaksoud', StoreId: '20', Img: '/images/expo/gallery_img-08.jpg' },
        //          { Id: 21, StoreName: 'almaksoud', StoreId: '21', Img: '/images/expo/gallery_img-09.jpg' },
        //          { Id: 22, StoreName: 'almaksoud', StoreId: '22', Img: '/images/expo/gallery_img-10.jpg' },
        //          { Id: 23, StoreName: 'almaksoud', StoreId: '23', Img: '/images/expo/advertise.png' },
        //          { Id: 24, StoreName: 'almaksoud', StoreId: '24', Img: '/images/expo/gallery_img-11.jpg' },
        //          { Id: 25, StoreName: 'almaksoud', StoreId: '25', Img: '/images/expo/gallery_img-12.jpg' },

        //        ]
        //    },
        //    {
        //        Id: 2,
        //        Title: 'Le Marché II',
        //        Banner: 'http://www.brockmetal.com/wp-content/uploads/2014/01/parallax-section-background-03.jpg',
        //        Sections: [

        //          { Id: 1, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a1.jpg' },
        //          { Id: 2, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a2.jpg' },
        //          { Id: 3, StoreName: 'almaksoud', StoreId: '3', Img: '/images/expo/advertise.png' },
        //          { Id: 4, StoreName: 'almaksoud', StoreId: '4', Img: '/images/expo/gallery_img-04.jpg' },
        //          { Id: 5, StoreName: 'almaksoud', StoreId: '5', Img: '/images/expo/gallery_img-05.jpg' },
        //          { Id: 6, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a3.jpg' },
        //          { Id: 7, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a4.jpg' },
        //          { Id: 8, StoreName: 'almaksoud', StoreId: '8', Img: '/images/expo/advertise.png' },
        //          { Id: 9, StoreName: 'almaksoud', StoreId: '9', Img: '/images/expo/gallery_img-09.jpg' },
        //          { Id: 10, StoreName: 'almaksoud', StoreId: '10', Img: '/images/expo/gallery_img-10.jpg' },
        //          { Id: 11, StoreName: 'almaksoud', StoreId: '11', Img: '/images/expo/gallery_img-11.jpg' },
        //          { Id: 12, StoreName: 'almaksoud', StoreId: '12', Img: '/images/expo/gallery_img-12.jpg' },
        //          { Id: 13, StoreName: 'almaksoud', StoreId: '13', Img: '/images/expo/advertise.png' },
        //          { Id: 14, StoreName: 'almaksoud', StoreId: '14', Img: '/images/expo/gallery_img-02.jpg' },
        //          { Id: 15, StoreName: 'almaksoud', StoreId: '15', Img: '/images/expo/gallery_img-03.jpg' },
        //          { Id: 16, StoreName: 'almaksoud', StoreId: '16', Img: '/images/expo/gallery_img-04.jpg' },
        //          { Id: 17, StoreName: 'almaksoud', StoreId: '17', Img: '/images/expo/gallery_img-05.jpg' },
        //          { Id: 18, StoreName: 'almaksoud', StoreId: '18', Img: '/images/expo/advertise.png' },
        //          { Id: 19, StoreName: 'almaksoud', StoreId: '19', Img: '/images/expo/gallery_img-07.jpg' },
        //          { Id: 20, StoreName: 'almaksoud', StoreId: '20', Img: '/images/expo/gallery_img-08.jpg' },
        //          { Id: 21, StoreName: 'almaksoud', StoreId: '21', Img: '/images/expo/gallery_img-09.jpg' },
        //          { Id: 22, StoreName: 'almaksoud', StoreId: '22', Img: '/images/expo/gallery_img-10.jpg' },
        //          { Id: 23, StoreName: 'almaksoud', StoreId: '23', Img: '/images/expo/advertise.png' },
        //          { Id: 24, StoreName: 'almaksoud', StoreId: '24', Img: '/images/expo/gallery_img-11.jpg' },
        //          { Id: 25, StoreName: 'almaksoud', StoreId: '25', Img: '/images/expo/gallery_img-12.jpg' },

        //        ]
        //    },
        //    {
        //        Id: 3,
        //        Title: 'Le Marché III',
        //        Banner: 'http://maddam-x.com/wp-content/uploads/2015/04/orig_15953.jpg',
        //        Sections: [

        //          { Id: 1, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a1.jpg' },
        //          { Id: 2, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a2.jpg' },
        //          { Id: 3, StoreName: 'almaksoud', StoreId: '3', Img: '/images/expo/advertise.png' },
        //          { Id: 4, StoreName: 'almaksoud', StoreId: '4', Img: '/images/expo/gallery_img-04.jpg' },
        //          { Id: 5, StoreName: 'almaksoud', StoreId: '5', Img: '/images/expo/gallery_img-05.jpg' },
        //          { Id: 6, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a3.jpg' },
        //          { Id: 7, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a4.jpg' },
        //          { Id: 8, StoreName: 'almaksoud', StoreId: '8', Img: '/images/expo/advertise.png' },
        //          { Id: 9, StoreName: 'almaksoud', StoreId: '9', Img: '/images/expo/gallery_img-09.jpg' },
        //          { Id: 10, StoreName: 'almaksoud', StoreId: '10', Img: '/images/expo/gallery_img-10.jpg' },
        //          { Id: 11, StoreName: 'almaksoud', StoreId: '11', Img: '/images/expo/gallery_img-11.jpg' },
        //          { Id: 12, StoreName: 'almaksoud', StoreId: '12', Img: '/images/expo/gallery_img-12.jpg' },
        //          { Id: 13, StoreName: 'almaksoud', StoreId: '13', Img: '/images/expo/advertise.png' },
        //          { Id: 14, StoreName: 'almaksoud', StoreId: '14', Img: '/images/expo/gallery_img-02.jpg' },
        //          { Id: 15, StoreName: 'almaksoud', StoreId: '15', Img: '/images/expo/gallery_img-03.jpg' },
        //          { Id: 16, StoreName: 'almaksoud', StoreId: '16', Img: '/images/expo/gallery_img-04.jpg' },
        //          { Id: 17, StoreName: 'almaksoud', StoreId: '17', Img: '/images/expo/gallery_img-05.jpg' },
        //          { Id: 18, StoreName: 'almaksoud', StoreId: '18', Img: '/images/expo/advertise.png' },
        //          { Id: 19, StoreName: 'almaksoud', StoreId: '19', Img: '/images/expo/gallery_img-07.jpg' },
        //          { Id: 20, StoreName: 'almaksoud', StoreId: '20', Img: '/images/expo/gallery_img-08.jpg' },
        //          { Id: 21, StoreName: 'almaksoud', StoreId: '21', Img: '/images/expo/gallery_img-09.jpg' },
        //          { Id: 22, StoreName: 'almaksoud', StoreId: '22', Img: '/images/expo/gallery_img-10.jpg' },
        //          { Id: 23, StoreName: 'almaksoud', StoreId: '23', Img: '/images/expo/advertise.png' },
        //          { Id: 24, StoreName: 'almaksoud', StoreId: '24', Img: '/images/expo/gallery_img-11.jpg' },
        //          { Id: 25, StoreName: 'almaksoud', StoreId: '25', Img: '/images/expo/gallery_img-12.jpg' },

        //        ]
        //    },
        //    {
        //        Id: 4,
        //        Title: 'Le Marché IIII',
        //        Banner: 'http://www.machakosgovernment.com/Machawood/images/parallax-bg1.jpg',
        //        Sections: [
        //          { Id: 1, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a1.jpg' },
        //          { Id: 2, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a2.jpg' },
        //          { Id: 3, StoreName: 'almaksoud', StoreId: '3', Img: '/images/expo/advertise.png' },
        //          { Id: 4, StoreName: 'almaksoud', StoreId: '4', Img: '/images/expo/gallery_img-04.jpg' },
        //          { Id: 5, StoreName: 'almaksoud', StoreId: '5', Img: '/images/expo/gallery_img-05.jpg' },
        //          { Id: 6, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a3.jpg' },
        //          { Id: 7, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a4.jpg' },
        //          { Id: 8, StoreName: 'almaksoud', StoreId: '8', Img: '/images/expo/advertise.png' },
        //          { Id: 9, StoreName: 'almaksoud', StoreId: '9', Img: '/images/expo/gallery_img-09.jpg' },
        //          { Id: 10, StoreName: 'almaksoud', StoreId: '10', Img: '/images/expo/gallery_img-10.jpg' },
        //          { Id: 11, StoreName: 'almaksoud', StoreId: '11', Img: '/images/expo/gallery_img-11.jpg' },
        //          { Id: 12, StoreName: 'almaksoud', StoreId: '12', Img: '/images/expo/gallery_img-12.jpg' },
        //          { Id: 13, StoreName: 'almaksoud', StoreId: '13', Img: '/images/expo/advertise.png' },
        //          { Id: 14, StoreName: 'almaksoud', StoreId: '14', Img: '/images/expo/gallery_img-02.jpg' },
        //          { Id: 15, StoreName: 'almaksoud', StoreId: '15', Img: '/images/expo/gallery_img-03.jpg' },
        //          { Id: 16, StoreName: 'almaksoud', StoreId: '16', Img: '/images/expo/gallery_img-04.jpg' },
        //          { Id: 17, StoreName: 'almaksoud', StoreId: '17', Img: '/images/expo/gallery_img-05.jpg' },
        //          { Id: 18, StoreName: 'almaksoud', StoreId: '18', Img: '/images/expo/advertise.png' },
        //          { Id: 19, StoreName: 'almaksoud', StoreId: '19', Img: '/images/expo/gallery_img-07.jpg' },
        //          { Id: 20, StoreName: 'almaksoud', StoreId: '20', Img: '/images/expo/gallery_img-08.jpg' },
        //          { Id: 21, StoreName: 'almaksoud', StoreId: '21', Img: '/images/expo/gallery_img-09.jpg' },
        //          { Id: 22, StoreName: 'almaksoud', StoreId: '22', Img: '/images/expo/gallery_img-10.jpg' },
        //          { Id: 23, StoreName: 'almaksoud', StoreId: '23', Img: '/images/expo/advertise.png' },
        //          { Id: 24, StoreName: 'almaksoud', StoreId: '24', Img: '/images/expo/gallery_img-11.jpg' },
        //          { Id: 25, StoreName: 'almaksoud', StoreId: '25', Img: '/images/expo/gallery_img-12.jpg' },
        //        ]
        //    },
        //    {
        //        Id: 5,
        //        Title: 'Le Marché V',
        //        Banner: 'http://social-lions.ro/wp-content/uploads/revslider/home2/img-33.jpg',
        //        Sections: [

        //          { Id: 1, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a1.jpg' },
        //          { Id: 2, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a2.jpg' },
        //          { Id: 3, StoreName: 'almaksoud', StoreId: '3', Img: '/images/expo/advertise.png' },
        //          { Id: 4, StoreName: 'almaksoud', StoreId: '4', Img: '/images/expo/gallery_img-04.jpg' },
        //          { Id: 5, StoreName: 'almaksoud', StoreId: '5', Img: '/images/expo/gallery_img-05.jpg' },
        //          { Id: 6, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a3.jpg' },
        //          { Id: 7, StoreName: 'almaksoud', StoreId: '1', Img: '/images/expo/a4.jpg' },
        //          { Id: 8, StoreName: 'almaksoud', StoreId: '8', Img: '/images/expo/advertise.png' },
        //          { Id: 9, StoreName: 'almaksoud', StoreId: '9', Img: '/images/expo/gallery_img-09.jpg' },
        //          { Id: 10, StoreName: 'almaksoud', StoreId: '10', Img: '/images/expo/gallery_img-10.jpg' },
        //          { Id: 11, StoreName: 'almaksoud', StoreId: '11', Img: '/images/expo/gallery_img-11.jpg' },
        //          { Id: 12, StoreName: 'almaksoud', StoreId: '12', Img: '/images/expo/gallery_img-12.jpg' },
        //          { Id: 13, StoreName: 'almaksoud', StoreId: '13', Img: '/images/expo/advertise.png' },
        //          { Id: 14, StoreName: 'almaksoud', StoreId: '14', Img: '/images/expo/gallery_img-02.jpg' },
        //          { Id: 15, StoreName: 'almaksoud', StoreId: '15', Img: '/images/expo/gallery_img-03.jpg' },
        //          { Id: 16, StoreName: 'almaksoud', StoreId: '16', Img: '/images/expo/gallery_img-04.jpg' },
        //          { Id: 17, StoreName: 'almaksoud', StoreId: '17', Img: '/images/expo/gallery_img-05.jpg' },
        //          { Id: 18, StoreName: 'almaksoud', StoreId: '18', Img: '/images/expo/advertise.png' },
        //          { Id: 19, StoreName: 'almaksoud', StoreId: '19', Img: '/images/expo/gallery_img-07.jpg' },
        //          { Id: 20, StoreName: 'almaksoud', StoreId: '20', Img: '/images/expo/gallery_img-08.jpg' },
        //          { Id: 21, StoreName: 'almaksoud', StoreId: '21', Img: '/images/expo/gallery_img-09.jpg' },
        //          { Id: 22, StoreName: 'almaksoud', StoreId: '22', Img: '/images/expo/gallery_img-10.jpg' },
        //          { Id: 23, StoreName: 'almaksoud', StoreId: '23', Img: '/images/expo/advertise.png' },
        //          { Id: 24, StoreName: 'almaksoud', StoreId: '24', Img: '/images/expo/gallery_img-11.jpg' },
        //          { Id: 25, StoreName: 'almaksoud', StoreId: '25', Img: '/images/expo/gallery_img-12.jpg' },

        //        ]
        //    },
        //];
        var _scope = {};
        console.log(req.params.catId);
        expo.getByCategory(req.params.catId).then(function (_data) {
            console.log(req.params.catId);
            console.log(_data);
            res.render('pages/expo', { expos: _data });
        }).catch(function (_err) {

            console.log(_err);
            res.render('pages/expo', { expos: _data });
        });

    });

    // store page   /eg/store/almaksoud
    app.get('/Eg/Store/:storeName/:storeId', function (req, res) {
        console.log(req.query);
        var store =  {
                   StoreName: 'Al Maksoud',
                   Imgs: [
                   {
                       URL: 'https://s-media-cache-ak0.pinimg.com/originals/e2/5e/90/e25e90d723ba723c282068816c139f9a.jpg'
                   },
                   {
                       URL: 'http://www.dwellingdecor.com/wp-content/uploads/2015/12/interior-living-room.jpg'
                   },
                   {
                       URL: 'http://metalip.com/wp-content/uploads/2016/03/modern-scandinavian-loft-living-room-design-with-upholstered-foamy-black-sofa-added-with-colorful-cushions.jpg'
                   }
                   ]
               };

        var bestSeller = [
            { Id: 1, Name: 'Raglan Sleeve Tee Maison Scotch', Price: '$44.95', Img: 'https://s-media-cache-ak0.pinimg.com/736x/69/44/a2/6944a2f143049e4d8be4ade167dbdb85.jpg' },
            { Id: 2, Name: 'Raglan Sleeve Tee Maison Scotch', Price: '$44.95', Img: 'https://s-media-cache-ak0.pinimg.com/736x/96/de/b1/96deb1dae3fde9de7a05e7334a6b31f9.jpg' },
            { Id: 3, Name: 'V Front Peplum Dress Club L', Price: '$22.95', Img: 'http://hative.com/wp-content/uploads/2016/10/behind-couch/1-space-behind-couch.jpg' },
            { Id: 4, Name: 'Raglan Sleeve Tee Maison Scotch', Price: '$44.95', Img: 'https://s-media-cache-ak0.pinimg.com/736x/69/44/a2/6944a2f143049e4d8be4ade167dbdb85.jpg' },
            { Id: 5, Name: 'Raglan Sleeve Tee Maison Scotch', Price: '$44.95', Img: 'https://s-media-cache-ak0.pinimg.com/736x/96/de/b1/96deb1dae3fde9de7a05e7334a6b31f9.jpg' },
            { Id: 6, Name: 'V Front Peplum Dress Club L', Price: '$22.95', Img: 'http://hative.com/wp-content/uploads/2016/10/behind-couch/1-space-behind-couch.jpg' }
        ];

        var Galleries = [
            { Id: 1, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/96/de/b1/96deb1dae3fde9de7a05e7334a6b31f9.jpg' },
            { Id: 2, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg' },
            { Id: 3, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/69/44/a2/6944a2f143049e4d8be4ade167dbdb85.jpg' },
            { Id: 4, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/bb/52/a4/bb52a4eca27d512bf9f0d9dca0e8cfaf.jpg' },
            { Id: 5, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/a7/c3/da/a7c3da858c7a67841ab92b849c4f88a7.jpg' },
            { Id: 6, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/96/de/b1/96deb1dae3fde9de7a05e7334a6b31f9.jpg' },
            { Id: 7, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/96/de/b1/96deb1dae3fde9de7a05e7334a6b31f9.jpg' },
            { Id: 8, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg' },
            { Id: 9, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/69/44/a2/6944a2f143049e4d8be4ade167dbdb85.jpg' },
            { Id: 10, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/bb/52/a4/bb52a4eca27d512bf9f0d9dca0e8cfaf.jpg' },
            { Id: 11, Name: 'Polly Top Notion', Img: 'https://s-media-cache-ak0.pinimg.com/736x/a7/c3/da/a7c3da858c7a67841ab92b849c4f88a7.jpg' },

        ];

        store.getById(req.params.storeId).then(function (_data) {
            console.log(req.params.storeId);
            console.log(_data);
            res.render('pages/expo', { expos: _data });
        }).catch(function (_err) {

            console.log(_err);
            res.render('pages/expo', { expos: _data });
        });

        res.render('pages/store', {
            store: store,
            bestSeller: bestSeller,
            Galleries: Galleries
        });
    });

    // gallery page   /eg/g/home-furniture/1
    app.get('/Eg/Gallery/:galleryName/:galleryId', function (req, res) {
        var gallery = [
            { Id: 1, Name: 'Raglan Sleeve Tee Maison Scotch', Price: '$44.95', Img: 'https://s-media-cache-ak0.pinimg.com/736x/69/44/a2/6944a2f143049e4d8be4ade167dbdb85.jpg' },
            { Id: 2, Name: 'Raglan Sleeve Tee Maison Scotch', Price: '$44.95', Img: 'https://s-media-cache-ak0.pinimg.com/736x/96/de/b1/96deb1dae3fde9de7a05e7334a6b31f9.jpg' },
            { Id: 3, Name: 'V Front Peplum Dress Club L', Price: '$22.95', Img: 'http://hative.com/wp-content/uploads/2016/10/behind-couch/1-space-behind-couch.jpg' },
            { Id: 4, Name: 'Raglan Sleeve Tee Maison Scotch', Price: '$44.95', Img: 'https://s-media-cache-ak0.pinimg.com/736x/69/44/a2/6944a2f143049e4d8be4ade167dbdb85.jpg' },
            { Id: 5, Name: 'Raglan Sleeve Tee Maison Scotch', Price: '$44.95', Img: 'https://s-media-cache-ak0.pinimg.com/736x/96/de/b1/96deb1dae3fde9de7a05e7334a6b31f9.jpg' },
            { Id: 6, Name: 'V Front Peplum Dress Club L', Price: '$22.95', Img: 'http://hative.com/wp-content/uploads/2016/10/behind-couch/1-space-behind-couch.jpg' }
        ];
        res.render('pages/gallery', { gallery: gallery });
    });

    // product page 
    app.get('/Eg/Product/:productName/:productId', function (req, res) {
        res.render('pages/product');
    });

    // contacts page 
    app.get('/eg/contactus', function (req, res) {
        res.render('pages/contactus');
    });


}

//app.get('/eg/Home', function (req, res) {
//    var featuredStores1 = [
//        { id: 1, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
//        { id: 2, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
//        { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
//        { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' }
//    ];
//    var onSaleStores = [
//        { id: 1, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
//        { id: 2, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
//        { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
//        { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' }
//    ];
//    var editorChoise = [
//        { id: 1, img: 'http://www.dwellingdecor.com/wp-content/uploads/2015/12/interior-living-room.jpg', title: 'Polly Top Notion', descreption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec eros tellus, scelerisque nec, rhoncus eget, laoreet sit amet, nunc. Ut sit amet turpis. In est arcu, sollicitudin eu, vehicula venenatis, tempor vitae, est.' },
//        { id: 2, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch', descreption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec eros tellus, scelerisque nec, rhoncus eget, laoreet sit amet, nunc. Ut sit amet turpis. In est arcu, sollicitudin eu, vehicula venenatis, tempor vitae, est.' },
//        { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion', descreption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec eros tellus, scelerisque nec, rhoncus eget, laoreet sit amet, nunc. Ut sit amet turpis. In est arcu, sollicitudin eu, vehicula venenatis, tempor vitae, est.' },
//        { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch', descreption: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec eros tellus, scelerisque nec, rhoncus eget, laoreet sit amet, nunc. Ut sit amet turpis. In est arcu, sollicitudin eu, vehicula venenatis, tempor vitae, est.' }
//    ];
//    var bestActiveStores = [
//        { id: 1, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
//        { id: 2, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
//        { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
//        { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' }
//    ];
//    var topRatedStores = [
//        { id: 1, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
//        { id: 2, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
//        { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
//        { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' }
//    ];
//    var featuredStores2 = [
//        { id: 1, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
//        { id: 2, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
//        { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
//        { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' }
//    ];
//    var otherStores = [
//        { id: 1, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
//        { id: 2, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
//        { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
//        { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
//        { id: 5, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
//        { id: 6, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
//        { id: 7, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
//        { id: 8, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
//        { id: 9, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
//        { id: 10, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
//        { id: 11, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
//        { id: 12, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' }
//    ];
//    res.render('pages/index', {
//        featuredStores1: featuredStores1,
//        onSaleStores: onSaleStores,
//        editorChoise: editorChoise,
//        bestActiveStores: bestActiveStores,
//        topRatedStores: topRatedStores,
//        featuredStores2: featuredStores2,
//        otherStores: otherStores
//    });
//});