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
            res.render('pages/login', {
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

    // store page   /eg/store/Da7i
    app.get('/eg/store/:storeName', function (req, res) {
        var _scope = {};
        store.getStoreByName(req.params.storeName).then(function (_store) {
            _scope.Store = _store;
            res.render('pages/store', _scope);
        }).catch(function (_err) { console.log(_err) });
    });

    // gallery page   /eg/g/homefurniture/1
    //          /eg/g/:GalleryName/:GalleryId
    app.get('/eg/g/gallery', function (req, res) {
        var _scope = {};
        res.render('pages/gallery', _scope);
        //gallery.getGallery(req.params.galleryId).then(function (_gallery) {
        //    _scope.gallery = _gallery;
        //    product.getByGalleryId(req.params.galleryId).then(function (_produtsList) {
        //        _scope.products = _produtsList;
        //        store.getStoreById(_gallery.Store).then(function (_store) {
        //            console.log(_store);
        //            _scope.storeData = _store;
        //            res.render('pages/gallery', _scope);
        //        }).catch(function (_err) { console.log(_err) });
        //    }).catch(function (_err) { console.log(_err) });
        //}).catch(function (_err) { console.log(_err) });
    });

    // product page 
    ///      /eg/p/:productName/:productId
    app.get('/eg/p/product', function (req, res) {
        var _scope = {};
        res.render('pages/item', _scope);

 //       product.getById(req.params.productId).then(function (_product) {
 //           console.log(_product);
 //           _scope.productData = _product;
            
 //           gallery.getGallery(_product.Gallery).then(function (_gallery) {
 //               console.log(_gallery);
 //               _scope.galleryData = _gallery;

 //               store.getStoreById(_product.Store).then(function (_store) {
 //                   console.log(_store);
 //                   _scope.storeData = _store;

 //_scope.SimilarProducts = [
 //           { id: 1, Pictures: [{ URL: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg' }], Name: 'Polly Top Notion' },
 //           { id: 2, Pictures: [{ URL: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg' }], Name: 'Raglan Sleeve Tee Maison Scotch' },
 //           { id: 3, Pictures: [{ URL: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg' }], Name: 'Polly Top Notion' },
 //           { id: 4, Pictures: [{ URL: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg' }], Name: 'Raglan Sleeve Tee Maison Scotch' },
 //           { id: 5, Pictures: [{ URL: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg' }], Name: 'Polly Top Notion' },
 //           { id: 6, Pictures: [{ URL: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg' }], Name: 'Raglan Sleeve Tee Maison Scotch' },
 //           { id: 7, Pictures: [{ URL: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg' }], Name: 'Polly Top Notion' },
 //           { id: 8, Pictures: [{ URL: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg' }], Name: 'Raglan Sleeve Tee Maison Scotch' },
 //           { id: 9, Pictures: [{ URL: 'https://s-media-cache-ak0.pinimg.com/736x/9d/d0/eb/9dd0ebcd13e908de44ccbb2a7e5a294f.jpg' }], Name: 'Polly Top Notion' },
 //           { id: 10, Pictures: [{ URL: 'http://4.bp.blogspot.com/-KOdUGQjMe9o/Uigvi-aAxxI/AAAAAAAAMKc/hWtkDnYUtrg/s1600/2014-Comfort-Modern-Living-Room-Decorating-Ideas-2.jpg' }], Name: 'Raglan Sleeve Tee Maison Scotch' },
 //           { id: 11, Pictures: [{ URL: 'http://residencestyle.com/wp-content/uploads/2014/12/Contemporary-Living-Room-Designs-Idea.jpg' }], Name: 'Polly Top Notion' },
 //           { id: 12, Pictures: [{ URL: 'https://s-media-cache-ak0.pinimg.com/736x/a6/c5/4e/a6c54e1a6eaf7550072850aadc862893.jpg' }], Name: 'Raglan Sleeve Tee Maison Scotch' }
 //   ];
 //                   res.render('pages/product', _scope);
 //               }).catch(function (_err) { console.log(_err) });

 //           }).catch(function (_err) { console.log(_err) });

 //       }).catch(function (_err) { console.log(_err) });
    });
    
    app.get('/eg/g/galleries', function (req, res) {
        var _scope = {};
        res.render('pages/galleries', _scope);
    });
    app.get('/eg/p/products', function (req, res) {
        var _scope = {};
        res.render('pages/items', _scope);
    });
    app.get('/eg/register', function (req, res) {
        var _scope = {};
        res.render('pages/register', _scope);
    });



    // contacts page 
    //app.get('/eg/contactus', function (req, res) {
    //    res.render('pages/contactus');
    //});

   
}