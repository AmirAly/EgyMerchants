﻿var store = require('./models/stores');
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
        var _scope = {};
        category.getByCountry('59067579734d1d32590f51dd').then(function (_data) {
            console.log(_data);
            _scope.categories = _data;
            res.render('pages/landing', _scope);
        }).catch(function (_err) {
            console.log(_err);
            _scope.categories = [];
            res.render('pages/landing', _scope);
        });

    });

    // expo page expos
    app.get('/Eg/Expos/:catId', function (req, res) {

        //var expos = [
        //    {
        //        Id: 1,
        //        Title: 'Le Marché I',
        //        Banner: 'http://file.mrbool.com/mrbool/articles/RicardoArrigoni/Parallax/Parallax1.jpg',
        //        Sections: [
        //          { Id: 1, StoreName: 'Race', _id: '1', Img: '/images/expo/1.jpg' },
        //          { Id: 2, StoreName: 'Race', _id: '1', Img: '/images/expo/2.jpg' },
        //          { Id: 3, StoreName: 'Race', _id: '3', Img: '/images/expo/3.jpg' },
        //          { Id: 4, StoreName: 'Race', _id: '4', Img: '/images/expo/4.jpg' },
        //          { Id: 5, StoreName: 'Race', _id: '5', Img: '/images/expo/5.jpg' },
        //          { Id: 6, StoreName: 'Race', _id: '1', Img: '/images/expo/6.jpg' },
        //          { Id: 7, StoreName: 'Race', _id: '1', Img: '/images/expo/7.jpg' },
        //          { Id: 8, StoreName: 'Race', _id: '8', Img: '/images/expo/8.jpg' },
        //          { Id: 9, StoreName: 'Race', _id: '9', Img: '/images/expo/9.jpg' },
        //          { Id: 10, StoreName: 'Race', _id: '10', Img: '/images/expo/10.jpg' },
        //          { Id: 11, StoreName: 'Race', _id: '11', Img: '/images/expo/11.jpg' },
        //          { Id: 12, StoreName: 'Race', _id: '12', Img: '/images/expo/12.jpg' },
        //          { Id: 13, StoreName: 'Race', _id: '13', Img: '/images/expo/13.jpg' },
        //          { Id: 14, StoreName: 'Race', _id: '14', Img: '/images/expo/14.jpg' },
        //          { Id: 15, StoreName: 'Race', _id: '15', Img: '/images/expo/15.jpg' },
        //          { Id: 16, StoreName: 'Race', _id: '16', Img: '/images/expo/16.jpg' },
        //          { Id: 17, StoreName: 'Race', _id: '17', Img: '/images/expo/17.jpg' },
        //          { Id: 18, StoreName: 'Race', _id: '18', Img: '/images/expo/18.jpg' },
        //          { Id: 19, StoreName: 'Race', _id: '19', Img: '/images/expo/19.jpg' },
        //          { Id: 20, StoreName: 'Race', _id: '20', Img: '/images/expo/20.jpg' },
        //          { Id: 21, StoreName: 'Race', _id: '21', Img: '/images/expo/21.jpg' },
        //          { Id: 22, StoreName: 'Race', _id: '22', Img: '/images/expo/22.jpg' },
        //          { Id: 23, StoreName: 'Race', _id: '23', Img: '/images/expo/23.jpg' },
        //          { Id: 24, StoreName: 'Race', _id: '24', Img: '/images/expo/24.jpg' },
        //          { Id: 25, StoreName: 'Race', _id: '25', Img: '/images/expo/25.jpg' },
        //          { Id: 26, StoreName: 'Race', _id: '26', Img: '/images/expo/26.jpg' },
        //          { Id: 27, StoreName: 'Race', _id: '27', Img: '/images/expo/27.jpg' },
        //          { Id: 28, StoreName: 'Race', _id: '28', Img: '/images/expo/28.jpg' },
        //          { Id: 29, StoreName: 'Race', _id: '29', Img: '/images/expo/29.jpg' },
        //          { Id: 30, StoreName: 'Race', _id: '30', Img: '/images/expo/30.jpg' },
        //          { Id: 31, StoreName: 'Race', _id: '31', Img: '/images/expo/31.jpg' },
        //          { Id: 32, StoreName: 'Race', _id: '32', Img: '/images/expo/32.jpg' }
        //        ]
        //    }
        //];
        //res.render('pages/expo', { expos: expos });

        var _scope = {};
        expo.getByCategory(req.params.catId).then(function (_data) {
            _scope.expos = _data;
            console.log(_data);
            res.render('pages/expo', _scope);
        }).catch(function (_err) {
            console.log(_err);
            _scope.expos = [];
            res.render('pages/expo', _scope);
        });

    });

    // store page   /eg/store/almaksoud
    app.get('/Eg/Store/:storeName/:storeId', function (req, res) {
        console.log(req.query);
       
        var _scope = {};
        store.getById(req.params.storeId).then(function (_data) {
            console.log(req.params.storeId);
            _scope.store = _data;
            gallery.getByStore(req.params.storeId).then(function (_galleriesData) {
                _scope.Galleries = _galleriesData;
                product.getByBestSeller(req.params.storeId).then(function (_bestSellerData) {
                    _scope.bestSeller = _bestSellerData;
                    res.render('pages/store', _scope);
                }).catch(function (_err) {
                    console.log(_err);
                    _scope.bestSeller = [];
                    res.render('pages/store', _scope);
                });
            }).catch(function (_err) {
                console.log(_err);
                _scope.Galleries = [];
                _scope.bestSeller = [];
                res.render('pages/store', _scope);
            });
        }).catch(function (_err) {
            console.log(_err);
            _scope.store = {};
            _scope.Galleries = [];
            _scope.bestSeller = [];
            res.render('pages/store', _scope);
        });
    });

    // gallery page   /eg/g/home-furniture/1
    app.get('/Eg/Gallery/:galleryName/:galleryId', function (req, res) {
        var _scope = {};
        gallery.getById(req.params.galleryId).then(function (_data) {
            _scope.gallery = _data;
            product.getByGalleryId(req.params.galleryId).then(function (_productsData) {
                _scope.products = _productsData;
                res.render('pages/gallery', _scope);
            }).catch(function (_err) {
                console.log(_err);
                _scope.products = [];
                res.render('pages/gallery', _scope);
            });
        }).catch(function (_err) {
            console.log(_err);
            _scope.gallery = [];
            _scope.products = [];
            res.render('pages/gallery', _scope);
        });

    });

    // product page 
    app.get('/Eg/Product/:productName/:productId', function (req, res) {
        var _scope = {};
        var similarProducts = [
           { id: 1, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg' },
           { id: 2, img: 'https://s-media-cache-ak0.pinimg.com/736x/a7/c3/da/a7c3da858c7a67841ab92b849c4f88a7.jpg' },
           { id: 3, img: 'https://s-media-cache-ak0.pinimg.com/736x/bb/52/a4/bb52a4eca27d512bf9f0d9dca0e8cfaf.jpg' },
           { id: 4, img: 'http://hative.com/wp-content/uploads/2016/10/behind-couch/1-space-behind-couch.jpg' },
           { id: 1, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg' },
           { id: 2, img: 'https://s-media-cache-ak0.pinimg.com/736x/a7/c3/da/a7c3da858c7a67841ab92b849c4f88a7.jpg' },
           { id: 3, img: 'https://s-media-cache-ak0.pinimg.com/736x/bb/52/a4/bb52a4eca27d512bf9f0d9dca0e8cfaf.jpg' },
           { id: 4, img: 'http://hative.com/wp-content/uploads/2016/10/behind-couch/1-space-behind-couch.jpg' },
           { id: 1, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg' },
           { id: 2, img: 'https://s-media-cache-ak0.pinimg.com/736x/a7/c3/da/a7c3da858c7a67841ab92b849c4f88a7.jpg' },
           { id: 3, img: 'https://s-media-cache-ak0.pinimg.com/736x/bb/52/a4/bb52a4eca27d512bf9f0d9dca0e8cfaf.jpg' },
           { id: 4, img: 'http://hative.com/wp-content/uploads/2016/10/behind-couch/1-space-behind-couch.jpg' },
           { id: 1, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg' },
           { id: 2, img: 'https://s-media-cache-ak0.pinimg.com/736x/a7/c3/da/a7c3da858c7a67841ab92b849c4f88a7.jpg' },
           { id: 3, img: 'https://s-media-cache-ak0.pinimg.com/736x/bb/52/a4/bb52a4eca27d512bf9f0d9dca0e8cfaf.jpg' },
           { id: 4, img: 'http://hative.com/wp-content/uploads/2016/10/behind-couch/1-space-behind-couch.jpg' },
        ];
        _scope.similarProducts = similarProducts;
        product.getById(req.params.productId).then(function (_product) {
            _scope.product = _product;
            res.render('pages/product', _scope);
        }).catch(function (_err) {
            console.log(_err);
            _scope.product = [];
            res.render('pages/product', _scope);
        });

    });

    // contacts page 
    app.get('/Eg/Contactus', function (req, res) {
        res.render('pages/contactus');
    });

    // contacts page 
    app.get('/Eg/Search', function (req, res) {
        res.render('pages/search');
    });
}
