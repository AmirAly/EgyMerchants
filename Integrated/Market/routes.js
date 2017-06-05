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
    app.get('/Eg/Search/:searchTxt', function (req, res) {
        var _scope = {};
        _scope.searchTxt = req.params.searchTxt;

        var searchResult =[
            {
                'resultExpos': [
                    { _id: 1, Img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', Title: 'Le Marchee' },
                    { _id: 2, Img: 'https://s-media-cache-ak0.pinimg.com/736x/a7/c3/da/a7c3da858c7a67841ab92b849c4f88a7.jpg', Title: 'Dubai International Expo' }
                ],
                'resultStores': [
                    { _id: 3, Img: 'https://s-media-cache-ak0.pinimg.com/736x/bb/52/a4/bb52a4eca27d512bf9f0d9dca0e8cfaf.jpg', Title: 'Dior' },
                    { _id: 4, Img: 'http://hative.com/wp-content/uploads/2016/10/behind-couch/1-space-behind-couch.jpg', Title: 'Channel' }
                ],
                'resultProducts': [
                    { _id: 1, Img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', Title: 'Blue Watch' },
                    { _id: 2, Img: 'https://s-media-cache-ak0.pinimg.com/736x/a7/c3/da/a7c3da858c7a67841ab92b849c4f88a7.jpg', Title: 'Golden Watch' },
                    { _id: 3, Img: 'https://s-media-cache-ak0.pinimg.com/736x/bb/52/a4/bb52a4eca27d512bf9f0d9dca0e8cfaf.jpg', Title: 'Rolex' },
                    { _id: 4, Img: 'http://hative.com/wp-content/uploads/2016/10/behind-couch/1-space-behind-couch.jpg', Title: 'Stop Watch' }
                ]
            }
        ];
        _scope.searchResult = searchResult;
        console.log(req.params.searchTxt);
        res.render('pages/search', _scope);
    });
}
