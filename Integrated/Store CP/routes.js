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
        var _scope = {};
        res.render('pages/login', _scope);
    });

    // store page   /eg/store/Da7i
    //// eg/store/:storeName
    app.get('/eg/store', function (req, res) {
        var _scope = {};
        res.render('pages/store', _scope);

        //store.getStoreByName(req.params.storeName).then(function (_store) {
        //    _scope.Store = _store;
        //    res.render('pages/store', _scope);
        //}).catch(function (_err) { console.log(_err) });
    });

    // gallery page   /eg/g/homefurniture/1
    //          /eg/g/:GalleryName/:GalleryId
    app.get('/eg/g/gallery', function (req, res) {
        var _scope = {};
        gallery.getById('59099416734d1d274bfd08d4').then(function (_gallery) {
            if (_gallery.code == 100) {
                _scope.gallery = _gallery.data;
                res.render('pages/gallery', _scope);
            } else {
                _scope.galleries = [];
                res.render('pages/gallery', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.galleries = [];
            res.render('pages/gallery', _scope);
        });
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
        product.getById('59089186734d1d3098a85879').then(function (_item) {
            console.log(_item);
            if (_item.code == 100) {
                _scope.item = _item.data;
                res.render('pages/item', _scope);
            } else {
                _scope.item = [];
                res.render('pages/item', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.item = [];
            res.render('pages/item', _scope);
        });

        //       product.getById(req.params.productId).then(function (_product) {
        //           console.log(_product);
        //           _scope.productData = _product;

        //           gallery.getGallery(_product.Gallery).then(function (_gallery) {
        //               console.log(_gallery);
        //               _scope.galleryData = _gallery;

        //               store.getStoreById(_product.Store).then(function (_store) {
        //                   console.log(_store);
        //                   _scope.storeData = _store;


    });

    app.get('/eg/g/galleries', function (req, res) {
        var _scope = {};
        gallery.getByStore('59085125734d1d3098a830df').then(function (_galleryLst) {
            if (_galleryLst.code == 100) {
                _scope.galleries = _galleryLst.data;
                res.render('pages/galleries', _scope);
            } else {
                _scope.galleries = [];
                res.render('pages/galleries', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.galleries = [];
            res.render('pages/galleries', _scope);
        });
    });
    app.get('/eg/p/products', function (req, res) {
        var _scope = {};
        product.getByGalleryId('59088e74734d1d3098a8563e').then(function (_itemLst) {
            //591d68b488bfb91ae01f0d24   empty gallery
            //59088e74734d1d3098a8563e
            //console.log(JSON.stringify(_itemLst));
            if (_itemLst.code == 100) {
                _scope.items = _itemLst.data;
                res.render('pages/items', _scope);
            }
            else {
                _scope.items = [];
                res.render('pages/items', _scope);
            }

        }).catch(function (_err) {
            console.log(_err);
            _scope.items = [];
            res.render('pages/items', _scope);
        });
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