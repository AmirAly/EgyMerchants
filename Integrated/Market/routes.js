var store = require('./models/stores');
var product = require('./models/items');
var gallery = require('./models/galleries');
var expo = require('./models/expoes');
var category = require('./models/categories');
var country = require('./models/countries');
module.exports = function (app) {
    // use res.render to load up an ejs view file
    app.get('/', function (req, res) {
        return res.redirect('/EG/Home');
    });

    // index page welcome + categories
    app.get('/:countryIso/Home', function (req, res) {
        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;
        country.getAll().then(function (_countriesData) {
            if (_countriesData.code == 100) {
                _scope.allCountries = _countriesData.data;
                _scope.JsonCountries = JSON.stringify(_countriesData.data);
                country.getById(_scope.allCountries[0]._id).then(function (_data) {
                    if (_data.code == 100) {
                        _scope.categoriesData = _data.data;
                        _scope.JsonCategories = JSON.stringify(_data.data);
                        res.render('pages/landing', _scope);
                    }
                    else {
                        _scope.categoriesData = [];
                        _scope.JsonCategories = [];
                        res.render('pages/landing', _scope);
                    }
                }).catch(function (_err) {
                    console.log(_err);
                    _scope.categoriesData = [];
                    _scope.JsonCategories = [];
                    res.render('pages/landing', _scope);
                });
            }
            else {
                _scope.categoriesData = [];
                _scope.JsonCategories = [];
                _scope.allCountries = [];
                _scope.JsonCountries = [];
                res.render('pages/landing', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.categoriesData = [];
            _scope.JsonCategories = [];
            _scope.allCountries = [];
            _scope.JsonCountries = [];
            res.render('pages/landing', _scope);
        });
    });

    // expo page expos
    app.get('/Eg/Expos/:catId', function (req, res) {
        
        var _scope = {};
        expo.getByCategory(req.params.catId).then(function (_data) {
            if (_data.code == 100) {
                _scope.expos = _data.data;
                _scope.JsonExpos = JSON.stringify(_data.data);
                res.render('pages/expo', _scope);
            }
            else {
                _scope.expos = [];
                _scope.JsonExpos = [];
                res.render('pages/expo', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.expos = [];
            _scope.JsonExpos = [];
            res.render('pages/expo', _scope);
        });


    });

    // store page /eg/store/almaksoud
    app.get('/Eg/Store/:storeName/:storeId', function (req, res) {
        var _scope = {};
        store.getById(req.params.storeId).then(function (_data) {
            if (_data.code == 100) {
                _scope.store = _data.data;
                product.getByStore(req.params.storeId).then(function (_galleriesData) {
                    if (_galleriesData.code == 100) {
                        _scope.GalleriesJson = JSON.stringify(_galleriesData.data);
                        _scope.Galleries = _galleriesData.data;
                        product.getFeatured(req.params.storeId).then(function (_featuredItemsData) {
                            if (_featuredItemsData.code == 100) {
                                _scope.featured = _featuredItemsData.data;
                                res.render('pages/store', _scope);
                            } else {
                                _scope.featured = [];
                                res.render('pages/store', _scope);
                            }
                        }).catch(function (_err) {
                            console.log(_err);
                            _scope.featured = [];
                            res.render('pages/store', _scope);
                        });
                    } else {
                        _scope.Galleries = [];
                        _scope.GalleriesJson = [];
                        _scope.featured = [];
                        res.render('pages/store', _scope);
                    }
                }).catch(function (_err) {
                    console.log(_err);
                    _scope.Galleries = [];
                    _scope.GalleriesJson = [];
                    _scope.featured = [];
                    res.render('pages/store', _scope);
                });
            } else {
                _scope.store = {};
                _scope.Galleries = [];
                _scope.GalleriesJson = [];
                _scope.featured = [];
                res.render('pages/store', _scope);
            }

        }).catch(function (_err) {
            console.log(_err);
            _scope.store = {};
            _scope.Galleries = [];
            _scope.GalleriesJson = [];
            _scope.featured = [];
            res.render('pages/store', _scope);
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
            if (_product.code == 100) {
                _scope.product = _product.data;
                res.render('pages/product', _scope);
            }
            else {
                _scope.product = [];
                res.render('pages/product', _scope);
            }
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

    // search page 
    app.get('/Eg/Search/:searchTxt', function (req, res) {
        var _scope = {};
        _scope.searchTxt = req.params.searchTxt;
        expo.getAll().then(function (_expo) {
            if (_expo.code == 100) {
                _scope.expolist = _expo.data;
                country.getAll().then(function (_country) {
                    if (_country.code == 100) {
                        _scope.countrieslst = _country.data;
                        store.getAll().then(function (_store) {
                            if (_store.code == 100) {
                                _scope.storeslst = _store.data;
                                store.search('all', 'all', _scope.searchTxt, 'all').then(function (_searchResult) {
                                    console.log(_scope.searchTxt);
                                    console.log(_searchResult);
                                    if (_searchResult.code == 100) {
                                        _scope.lstSearchResult = _searchResult.data;
                                        _scope.JsonSearchResult = JSON.stringify(_searchResult.data);
                                        res.render('pages/search', _scope);
                                    } else {
                                        _scope.lstSearchResult = [];
                                        _scope.JsonSearchResult = [];
                                        res.render('pages/search', _scope);
                                    }
                                }).catch(function (err) {
                                    console.log(_scope.searchTxt);
                                    console.log(err);
                                    _scope.storeslst = [];
                                    _scope.lstSearchResult = [];
                                    _scope.JsonSearchResult = [];
                                    res.render('pages/search', _scope);
                                });
                            } else {
                                _scope.storeslst = [];
                                _scope.lstSearchResult = [];
                                _scope.JsonSearchResult = [];
                                res.render('pages/search', _scope);
                            }
                        }).catch(function (_err) {
                            _scope.storeslst = [];
                            _scope.lstSearchResult = [];
                            _scope.JsonSearchResult = [];
                            res.render('pages/search', _scope);
                        });

                    } else {
                        _scope.storeslst = [];
                        _scope.countrieslst = [];
                        _scope.lstSearchResult = [];
                        _scope.JsonSearchResult = [];
                        res.render('pages/search', _scope);
                    }
                }).catch(function (_err) {
                    console.log(_err);
                    _scope.storeslst = [];
                    _scope.expolist = [];
                    _scope.countrieslst = [];
                    _scope.lstSearchResult = [];
                    _scope.JsonSearchResult = [];
                    res.render('pages/search', _scope);
                });

            } else {
                _scope.storeslst = [];
                _scope.expolist = [];
                _scope.countrieslst = [];
                _scope.lstSearchResult = [];
                _scope.JsonSearchResult = [];
                res.render('pages/search', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.storeslst = [];
            _scope.expolist = [];
            _scope.countrieslst = [];
            _scope.lstSearchResult = [];
            _scope.JsonSearchResult = [];
            res.render('pages/search', _scope);
        });

    });
}
