var store = require('./models/stores');
var product = require('./models/items');
var gallery = require('./models/galleries');
var expo = require('./models/expoes');
var category = require('./models/categories');
var country = require('./models/countries');
module.exports = function (app) {
    // use res.render to load up an ejs view file
    // index page 

    app.get('/', function (req, res) {
        return res.redirect('/eg/Home');
    });

    // index page welcome + categories
    app.get('/Eg/Home', function (req, res) {
        
        var _scope = {};

        country.getAll().then(function (_countriesData) {
            console.log(_countriesData);
            if (_countriesData.code == 100) {
                console.log(_countriesData.data);
                _scope.allCountries = _countriesData.data;
                
                country.getById(_scope.allCountries[0]._id).then(function (_data) {
                    if (_data.code == 100) {
                        console.log(_data.data);
                        _scope.categoriesData = _data.data;
                        res.render('pages/landing', _scope);
                    }
                    else {
                        _scope.categoriesData = [];
                        res.render('pages/landing', _scope);
                    }
                }).catch(function (_err) {
                    console.log(_err);
                    _scope.categoriesData = [];
                    res.render('pages/landing', _scope);
                });
            }
            else {
                _scope.categoriesData = [];
                _scope.allCountries = [];
                res.render('pages/landing', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.categoriesData = [];
            _scope.allCountries = [];
            res.render('pages/landing', _scope);
        });
    });

    // expo page expos
    app.get('/Eg/Expos/:catId', function (req, res) {
        var _scope = {};
        var expos = [{
            "_id": 1,
            "Title": 'Le Marchee',
            "floors": [
                {
                    "Name": 'Men Floor',
                    Coordinates: [
                        { "Top": 0, "Left": 2, "Width": 4, "Height": 2, "Img": "http://www.beststylo.com/wp-content/uploads/2014/08/Al-Karam-Eid-Luxurious-Latha-Men-Collection-2016-2017-Coming-Soon.png", "Store": 5, "StoreName": 'Kalkaram' },
                        { "Top": 0, "Left": 0, "Width": 2, "Height": 5, "Img": "http://fashionsbizz.com/wp-content/uploads/2014/06/Charcoal-Summer-Jeans-Pants-and-Shirts-for-Smart-Men-2014-2.jpg", "Store": 6, "StoreName": 'Charcoal' },
                        { "Top": 2, "Left": 4, "Width": 2, "Height": 3, "Img": "http://www.latestsummerfashion.com/wp-content/uploads/2015/12/Bonanza-Garments-Sweaters-Collection-2016-Women-Men-9.jpg", "Store": 7, "StoreName": 'Bonanza' },
                        { "Top": 2, "Left": 2, "Width": 2, "Height": 3, "Img": "http://www.elleman.vn/wp-content/uploads/2016/11/02/cardigan-475x475.jpg", "Store": 8, "StoreName": 'Simwood' }
                    ]
                },
                {
                    "Name": 'Women Floor',
                    Coordinates: [
                        { "Top": 0, "Left": 4, "Width": 2, "Height": 5, "Img": "http://www.styling.pk/wp-content/uploads/2017/02/Mausummery-Pre-Summer-Collection-2017-for-women.jpg", "Store": 1, "StoreName": 'Spring' },
                        { "Top": 3, "Left": 0, "Width": 4, "Height": 2, "Img": "http://styloplanet.com/wp-content/uploads/2017/04/Borjan-Shoes-Latest-Summer-Collection-for-Women-2017-2018-3-1.png", "Store": 2, "StoreName": 'The Fashion' },
                        { "Top": 0, "Left": 0, "Width": 2, "Height": 3, "Img": "http://3.bp.blogspot.com/-iCXOp3A-BH4/VXWGjdRKIBI/AAAAAAAAALg/uzN4MtS_CRI/s640/borjan-shoes.jpg", "Store": 3, "StoreName": 'Borjan' },
                        { "Top": 0, "Left": 2, "Width": 2, "Height": 3, "Img": "https://fashion360.pk/wp-content/uploads/2017/02/Baroque-Festive-Edition-Luxury-Chiffon-collection-2017-for-women-7.jpg", "Store": 4, "StoreName": 'Luxury Chiffon' }
                    ]
                }
            ]
        },
        {
            "_id": 2,
            "Title": 'Dubai International',
            "floors": [
                {
                    "Name": 'Women Floor',
                    Coordinates: [
                        { "Top": 0, "Left": 4, "Width": 2, "Height": 5, "Img": "http://www.styling.pk/wp-content/uploads/2017/02/Mausummery-Pre-Summer-Collection-2017-for-women.jpg", "Store": 1 ,"StoreName":'Spring'},
                        { "Top": 3, "Left": 0, "Width": 4, "Height": 2, "Img": "http://styloplanet.com/wp-content/uploads/2017/04/Borjan-Shoes-Latest-Summer-Collection-for-Women-2017-2018-3-1.png", "Store": 2, "StoreName": 'The Fashion' },
                        { "Top": 0, "Left": 0, "Width": 2, "Height": 3, "Img": "http://3.bp.blogspot.com/-iCXOp3A-BH4/VXWGjdRKIBI/AAAAAAAAALg/uzN4MtS_CRI/s640/borjan-shoes.jpg", "Store": 3, "StoreName": 'Borjan' },
                        { "Top": 0, "Left": 2, "Width": 2, "Height": 3, "Img": "https://fashion360.pk/wp-content/uploads/2017/02/Baroque-Festive-Edition-Luxury-Chiffon-collection-2017-for-women-7.jpg", "Store": 4, "StoreName": 'Luxury Chiffon' }
                    ]
                },
                {
                    "Name": 'Men Floor',
                    Coordinates: [
                        { "Top": 0, "Left": 2, "Width": 4, "Height": 2, "Img": "http://www.beststylo.com/wp-content/uploads/2014/08/Al-Karam-Eid-Luxurious-Latha-Men-Collection-2016-2017-Coming-Soon.png", "Store": 5, "StoreName": 'Kalkaram' },
                        { "Top": 0, "Left": 0, "Width": 2, "Height": 5, "Img": "http://fashionsbizz.com/wp-content/uploads/2014/06/Charcoal-Summer-Jeans-Pants-and-Shirts-for-Smart-Men-2014-2.jpg", "Store": 6, "StoreName": 'Charcoal' },
                        { "Top": 2, "Left": 4, "Width": 2, "Height": 3, "Img": "http://www.latestsummerfashion.com/wp-content/uploads/2015/12/Bonanza-Garments-Sweaters-Collection-2016-Women-Men-9.jpg", "Store": 7, "StoreName": 'Bonanza' },
                        { "Top": 2, "Left": 2, "Width": 2, "Height": 3, "Img": "http://www.elleman.vn/wp-content/uploads/2016/11/02/cardigan-475x475.jpg", "Store": 8, "StoreName": 'Simwood' }
                    ]
                }
            ]
        }];

        _scope.JsonFloor = JSON.stringify(expos);
        console.log(_scope.JsonFloor);
        _scope.expos = expos;
        res.render('pages/expo', _scope);
        //var _scope = {};
        //expo.getByCategory(req.params.catId).then(function (_data) {
        //    _scope.expos = _data;
        //    console.log(_data);
        //    res.render('pages/expo', _scope);
        //}).catch(function (_err) {
        //    console.log(_err);
        //    _scope.expos = [];
        //    res.render('pages/expo', _scope);
        //});

    });

    // store page   /eg/store/almaksoud
    app.get('/Eg/Store/:storeName/:storeId', function (req, res) {
        console.log(req.query);

        var _scope = {};
        //res.render('pages/store', _scope);
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

    // search page 
    app.get('/Eg/Search/:searchTxt', function (req, res) {
        var _scope = {};
        _scope.searchTxt = req.params.searchTxt;
        expo.getAll().then(function (_expo) {
            if (_expo.code == 100) {
                _scope.expolist = _expo.data;
                //console.log(_expo.data);
                country.getAll().then(function (_country) {
                    if (_country.code == 100) {
                        _scope.countrieslst = _country.data;
                        store.getAll().then(function (_store) {
                            if (_store.code == 100) {
                                _scope.storeslst = _store.data;
                                store.search('', '', _scope.searchTxt, '').then(function (_searchResult) {
                                    console.log(_scope.searchTxt);
                                    console.log(_searchResult);
                                    if (searchResult.code == 100) {
                                        _scope.searchResult = _searchResult;
                                        res.render('pages/search', _scope);
                                    } else {
                                        _scope.searchResult = [];
                                        res.render('pages/search', _scope);
                                    }
                                }).catch(function (err) {
                                    console.log(_scope.searchTxt);
                                    console.log(err);
                                    _scope.searchResult = [];
                                    res.render('pages/search', _scope);
                                });
                            } else {
                                _scope.storeslst = [];
                                res.render('pages/search', _scope);
                            }
                        }).catch(function (_err) {
                            //console.log(_err);
                            _scope.storeslst = [];
                            res.render('pages/search', _scope);
                        });

                    } else {
                        _scope.countrieslst = {};
                        res.render('pages/search', _scope);
                    }
                }).catch(function (_err) {
                    console.log(_err);
                    _scope.countrieslst = {};
                    res.render('pages/search', _scope);
                });

            } else {
                //console.log('else');
                _scope.expolist = {};
                res.render('pages/search', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.expolist = {};
            res.render('pages/search', _scope);
        });

        
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
    });
}
