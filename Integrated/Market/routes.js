var store = require('./models/stores');
var product = require('./models/items');
var gallery = require('./models/galleries');
var expo = require('./models/expoes');
var category = require('./models/categories');
var country = require('./models/countries');
module.exports = function (app) {
    // use res.render to load up an ejs view file
    app.get('/', function (req, res) {
<<<<<<< HEAD
        return res.redirect('/EG/Home');
    });

    // index page welcome + categories
    app.get('/:countryIso/Home', function (req, res) {
        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;
        country.getAll().then(function (_countriesData) {
=======
        return res.redirect('/eg/Home');
    });

    // index page welcome + categories
    app.get('/Eg/Home', function (req, res) {

        var _scope = {};

        country.getAll().then(function (_countriesData) {
            console.log(_countriesData);
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
            if (_countriesData.code == 100) {
                console.log(_countriesData.data);
                _scope.allCountries = _countriesData.data;
                _scope.JsonCountries = JSON.stringify(_countriesData.data);
<<<<<<< HEAD
                res.render('pages/landing', _scope);
            }
            else {
=======
                country.getById(_scope.allCountries[0]._id).then(function (_data) {
                    if (_data.code == 100) {
                        console.log(_data.data);
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
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
                _scope.allCountries = [];
                _scope.JsonCountries = [];
                res.render('pages/landing', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
<<<<<<< HEAD
=======
            _scope.categoriesData = [];
            _scope.JsonCategories = [];
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
            _scope.allCountries = [];
            _scope.JsonCountries = [];
            res.render('pages/landing', _scope);
        });
<<<<<<< HEAD

    });

    // expo page expos
    app.get('/:countryIso/Expos/:catId', function (req, res) {
        
        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;
=======
    });

    // expo page expos
    app.get('/Eg/Expos/:catId', function (req, res) {
        
        var _scope = {};
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
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

<<<<<<< HEAD
    // store page /EG/store/almaksoud
    app.get('/:countryIso/Store/:storeName/:storeId', function (req, res) {
        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;
=======
    // store page   /eg/store/almaksoud
    app.get('/Eg/Store/:storeName/:storeId', function (req, res) {
        var _scope = {};
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
        store.getById(req.params.storeId).then(function (_data) {
            if (_data.code == 100) {
                _scope.store = _data.data;
                product.getByStore(req.params.storeId).then(function (_galleriesData) {
                    if (_galleriesData.code == 100) {
                        _scope.GalleriesJson = JSON.stringify(_galleriesData.data);
                        _scope.Galleries = _galleriesData.data;
<<<<<<< HEAD
=======
                        console.log(_galleriesData.data);
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
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
<<<<<<< HEAD
    app.get('/:countryIso/Product/:productName/:productId', function (req, res) {
        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;
=======
    app.get('/Eg/Product/:productName/:productId', function (req, res) {
        var _scope = {};
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
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
<<<<<<< HEAD
    app.get('/:countryIso/Contactus', function (req, res) {
        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;
=======
    app.get('/Eg/Contactus', function (req, res) {
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
        res.render('pages/contactus');
    });

    // search page 
<<<<<<< HEAD
    app.get('/:countryIso/Search/:searchTxt', function (req, res) {
        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;
        _scope.searchTxt = req.params.searchTxt;
        console.log(req.params.searchTxt);
        expo.getAll().then(function (_expo) {
            if (_expo.code == 100) {
                _scope.expolist = _expo.data;
=======
    app.get('/Eg/Search/:searchTxt', function (req, res) {
        var _scope = {};
        _scope.searchTxt = req.params.searchTxt;
        expo.getAll().then(function (_expo) {
            if (_expo.code == 100) {
                _scope.expolist = _expo.data;
                //console.log(_expo.data);
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
                country.getAll().then(function (_country) {
                    if (_country.code == 100) {
                        _scope.countrieslst = _country.data;
                        store.getAll().then(function (_store) {
                            if (_store.code == 100) {
                                _scope.storeslst = _store.data;
                                store.search('all', 'all', _scope.searchTxt, 'all').then(function (_searchResult) {
                                    console.log(_scope.searchTxt);
<<<<<<< HEAD
                                    //console.log(_searchResult);
=======
                                    console.log(_searchResult);
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
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
<<<<<<< HEAD
=======
                            //console.log(_err);
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
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
<<<<<<< HEAD
=======
                //console.log('else');
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
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

<<<<<<< HEAD
=======

        //var searchResult = [
        //    {
        //        'resultExpos': [
        //            { _id: 1, Img: '/images/expo0.png', Title: 'Le Marchee' },
        //            { _id: 2, Img: '/images/expo1.png', Title: 'Dubai International Expo' }
        //        ],
        //        'resultStores': [
        //            { _id: 3, Img: '/images/dior.jpg', Title: 'Dior' },
        //            { _id: 4, Img: '/images/chanel.jpg', Title: 'Chanel' }
        //        ],
        //        'resultProducts': [
        //            { _id: 1, Img: 'http://uploads.tapatalk-cdn.com/20150518/7eb179f322533ce313ad587987f75914.jpg', Title: 'Blue Watch' },
        //            { _id: 2, Img: 'http://g01.a.alicdn.com/kf/HTB1AX3oLpXXXXbraXXXq6xXFXXXW/CHENXI-Gold-Watch-Men-Watches-Top-Brand-Luxury-Famous-2016-Male-Clock-Golden-Quartz-Analog-Wristwatch.jpg', Title: 'Golden Watch' },
        //            { _id: 3, Img: 'https://s-media-cache-ak0.pinimg.com/736x/e2/69/24/e26924a315df6b0d6f6d8ba5488a168c.jpg', Title: 'Rolex Watch' },
        //            { _id: 4, Img: 'https://s-media-cache-ak0.pinimg.com/originals/4e/35/6b/4e356bed54fd89f966c2df43bdcc4bf2.jpg', Title: 'Pincky Watch' }
        //        ]
        //    }
        //];
        //_scope.searchResult = searchResult;
        //console.log(req.params.searchTxt);
        //res.render('pages/search', _scope);
>>>>>>> e1865de5fdce1e083c94f0ae8573aa812b31f813
    });
}
