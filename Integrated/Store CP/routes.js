var store = require('./models/stores');
var product = require('./models/items');
var gallery = require('./models/galleries');
var category = require('./models/categories');
var country = require('./models/countries');
module.exports = function (app) {
    // use res.render to load up an ejs view file //test
    // index page 
    app.get('/', function (req, res) {
        return res.redirect('/Home');
    });


    app.get('/store/:storeId', function (req, res) {
        var _scope = {};
        store.getById(req.params.storeId).then(function (_store) {
            if (_store.code == 100) {
                _scope.store = _store.data;
                _scope.storeJSON = JSON.stringify(_store.data);
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
                _scope.galleryJSON = JSON.stringify(_gallery.data);
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
                _scope.galleriesObject = JSON.stringify(_galleryLst.data);
                res.render('pages/galleries', _scope);
            } else {
                _scope.galleries = [];
                _scope.galleriesObject = "";
                res.render('pages/galleries', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.galleries = [];
            _scope.galleriesObject = "";
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
        country.loadAllInJson().then(function (_country) {
            if (_country.code == 100) {
                _scope.countries = _country.data;
                res.render('pages/register', _scope);
            } else {
                _scope.countries = [];
                res.render('pages/register', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.countries = [];
            res.render('pages/register', _scope);
        });

        //category.getAll().then(function (_category) {
        //    if (_category.code == 100) {
        //        _scope.categories = _category.data;
        //        res.render('pages/register', _scope);
        //    } else {
        //        _scope.categories = [];
        //        res.render('pages/register', _scope);
        //    }
        //}).catch(function (_err) {
        //    console.log(_err);
        //    _scope.categories = [];
        //    res.render('pages/register', _scope);
        //});
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