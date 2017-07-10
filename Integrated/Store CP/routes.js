var store = require('./models/stores');
var product = require('./models/items');
var gallery = require('./models/galleries');
var category = require('./models/categories');
module.exports = function (app) {
    // use res.render to load up an ejs view file
    // index page 
    app.get('/', function (req, res) {
        return res.redirect('/Home');
    });


    app.get('/store/:storeId', function (req, res) {
        var _scope = {};
        store.getById(req.params.storeId).then(function (_store) {
            if (_store.code == 100) {
                _scope.store = _store.data;
                res.render('pages/store', _scope);
            } else {
                _scope.store = [];
                res.render('pages/store', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.store = [];
            res.render('pages/store', _scope);
        });
    });

    app.get('/gallery/:galleryId', function (req, res) {
        var _scope = {};
        gallery.getById(req.params.galleryId).then(function (_gallery) {
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
    });

    app.get('/product/:itemId', function (req, res) {
        var _scope = {};
        product.getById(req.params.itemId).then(function (_item) {
            if (_item.code == 100) {
                _scope.item = _item.data;
                _scope.itemJSON = JSON.stringify(_item.data);
                res.render('pages/item', _scope);
            } else {
                _scope.item = [];
                //res.render('pages/item', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.item = [];
            res.render('pages/item', _scope);
        });
    });

    app.get('/galleries/:storeId', function (req, res) {
        var _scope = {};
        gallery.getByStore(req.params.storeId).then(function (_galleryLst) {
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

    app.get('/products/:galleryId', function (req, res) {
        var _scope = {};
        product.getByGalleryId(req.params.galleryId).then(function (_itemLst) {

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

    app.get('/register', function (req, res) {
        var _scope = {};
        category.getAll().then(function (_category) {
            if (_category.code == 100) {
                _scope.categories = _category.data;
                res.render('pages/register', _scope);
            } else {
                _scope.categories = [];
                res.render('pages/register', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.categories = [];
            res.render('pages/register', _scope);
        });
    });

    app.get('/Home', function (req, res) {
        var _scope = {};
        store.login().then(function (_user) {
            if (_user.code == 100) {
                _scope.loginData = _user.data;
                res.render('pages/login', _scope);
            } else {
                _scope.loginData = [];
                res.render('pages/login', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.loginData = [];
            res.render('pages/login', _scope);
        });
    });
}