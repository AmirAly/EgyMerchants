var store = require('./models/stores');
var product = require('./models/products');
var gallery = require('./models/galleries');
module.exports = function (app) {
    // use res.render to load up an ejs view file
    // index page 

    app.get('/', function (req, res) {
        return res.redirect('/eg/Home');
    })
    app.get('/eg/Home', function (req, res) {
        var featuredStores1 = [], onSaleStores = [], editorChoise = [], bestActiveStores = [], topRatedStores = [], featuredStores2 = [], otherStores = [];
        store.getStoreByPlacement(null).then(function (_data) {
            console.log(_data);
            if (_data.Featured1)
                featuredStores1 = _data.Featured1;
            if (_data.OnSale)
                onSaleStores = _data.OnSale;
            if (_data.EditorChoise)
                editorChoise = _data.EditorChoise;
            if (_data.BestActive)
                bestActiveStores = _data.BestActive;
            if (_data.TopRated)
                topRatedStores = _data.TopRated;
            if (_data.Featured2)
                var featuredStores2 = _data.Featured2;
            if (_data.Others)
             otherStores = _data.Others;
            res.render('pages/index', {
                featuredStores1: featuredStores1,
                onSaleStores: onSaleStores,
                editorChoise: editorChoise,
                bestActiveStores: bestActiveStores,
                topRatedStores: topRatedStores,
                featuredStores2: featuredStores2,
                otherStores: otherStores
            });
        });

    });

    // store page   /eg/store/almaksoud
    app.get('/eg/store/:storeName', function (req, res) {
        var _scope = {};
        store.getStoreByName(req.params.storeName).then(function (_data) {
            _scope.Store = _data;
            gallery.getGalleries(_data._id).then(function (_flst) {
                _scope.Galleries = _flst;
                console.log(_scope);
                product.getStoreBestSeller(_data._id).then(function (_blst) {
                    _scope.BestSeller = _blst;
                    console.log(_scope);
                    res.render('pages/store', _scope);

                }).catch(function (_err) { console.log(_err) })


            }).catch(function (_err) { console.log(_err) })
        }).catch(function (_err) { console.log(_err) });

    });

    // gallery page   /eg/g/home-furniture/1
    app.get('/eg/g/:galleryName/:galleryId', function (req, res) {
        var _scope = {};
        gallery.getGallery(req.params.galleryId).then(function (_blst) {
            _scope.gallery = _blst;
            product.getByGalleryId(req.params.galleryId).then(function (_plst) {
                _scope.products = _plst;
                console.log(_scope);
                res.render('pages/gallery', _scope);

            }).catch(function (_err) { console.log(_err) })

        }).catch(function (_err) { console.log(_err) })

    });

    // product page 
    app.get('/eg/p/:productName/:productId', function (req, res) {
        var _scope = {};
        product.getById(req.params.productId).then(function (_plst) {
            console.log(_plst);
            _scope.productData = _plst;
            _scope.SimilarProducts = [
            { id: 1, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
            { id: 2, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 3, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
            { id: 4, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 5, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
            { id: 6, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 7, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
            { id: 8, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 9, img: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg', title: 'Polly Top Notion' },
            { id: 10, img: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg', title: 'Raglan Sleeve Tee Maison Scotch' },
            { id: 11, img: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg', title: 'Polly Top Notion' },
            { id: 12, img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg', title: 'Raglan Sleeve Tee Maison Scotch' }
            ];

            res.render('pages/product', _scope);

        }).catch(function (_err) { console.log(_err) })

    });

    // contacts page 
    app.get('/eg/contactus', function (req, res) {
        res.render('pages/contactus');
    });


}