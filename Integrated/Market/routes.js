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
            res.render('pages/landing', { categories: _data });
        }).catch(function (_err) {
            console.log(_err)
        });

    });

    // expo page expos
    app.get('/Eg/Expos/:catId', function (req, res) {

        var _scope = {};
        console.log(req.params.catId);
        expo.getByCategory(req.params.catId).then(function (_data) {
            console.log(req.params.catId);
            console.log(_data);
            res.render('pages/expo', { expos: _data });
        }).catch(function (_err) {
            console.log(_err);
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

        gallery.getById(req.params.galleryId).then(function (_data) {
            console.log(req.params.galleryId);
            product.getByGalleryId(req.params.galleryId).then(function (_productsData) {
                res.render('pages/gallery', {
                    gallery: _data,
                    products: _productsData
                });
            }).catch(function (_err) {
                console.log(_err);
            });
        }).catch(function (_err) {
            console.log(_err);
        });

    });

    // product page 
    app.get('/Eg/Product/:productName/:productId', function (req, res) {

        product.getById(req.params.productId).then(function (_product) {
            res.render('pages/product', {
                product: _product,
                similarProducts: similarProducts
            });
        }).catch(function (_err) {
            console.log(_err);
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