var _ = require("underscore");
var store = require('./models/stores');
var product = require('./models/items');
var gallery = require('./models/galleries');
var expo = require('./models/expoes');
var category = require('./models/categories');
var country = require('./models/countries');
var message = require('./models/messages');
var user = require('./models/users');
var notification = require('./models/notifications');
var comment = require('./models/comments');

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
                console.log(_countriesData.data);
                _scope.allCountries = _countriesData.data;
                _scope.JsonCountries = JSON.stringify(_countriesData.data);
                res.render('pages/landing', _scope);
            }
            else {
                _scope.allCountries = [];
                _scope.JsonCountries = [];
                res.render('pages/landing', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.allCountries = [];
            _scope.JsonCountries = [];
            res.render('pages/landing', _scope);
        });

    });

    // expo page expos
    app.get('/:countryIso/Expos/:catId', function (req, res) {

        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;
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

    // store page /EG/store/almaksoud
    app.get('/:countryIso/Store/:storeName/:storeId', function (req, res) {
        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;
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
    app.get('/:countryIso/Product/:productName/:productId', function (req, res) {
        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;
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

        //var comments = [
        //    { _id: 1, date: "Feb-21-2014", userName: "Ahmed Mohammed Alaa", comment: "Invitamus me testatur sed quod non dum animae tuae lacrimis ut libertatem deum rogus aegritudinis causet. Dicens hoc contra serpentibus isto." },
        //    { _id: 2, date: "Feb-21-2014", userName: "fashion world", comment: "Invitamus me testatur sed quod non dum animae tuae lacrimis ut libertatem deum rogus aegritudinis causet. Dicens hoc contra serpentibus isto." },
        //    { _id: 3, date: "Feb-21-2014", userName: "Asmaa Ahmed Mohammed ", comment: "Invitamus me testatur sed quod non dum animae tuae lacrimis ut libertatem deum rogus aegritudinis causet. Dicens hoc contra serpentibus isto." },
        //    { _id: 4, date: "Feb-21-2014", userName: "Mohammed Ali Ahmed ", comment: "Invitamus me testatur sed quod non dum animae tuae lacrimis ut libertatem deum rogus aegritudinis causet. Dicens hoc contra serpentibus isto." }
        //];
        //_scope.comments = comments;
        //_scope.JsonComments = JSON.stringify(comments);

        product.getById(req.params.productId).then(function (_product) {
            if (_product.code == 100) {
                _scope.product = _product.data;

                comment.getByItem(req.params.productId).then(function (_commentsList) {
                    if (_commentsList.code == 100) {
                        console.log(_commentsList.data);
                        _scope.comments = _commentsList.data;
                        _scope.JsonComments = JSON.stringify(_commentsList.data);
                        res.render('pages/product', _scope);
                    } else {
                        _scope.comments = [];
                        _scope.JsonComments = [];
                        res.render('pages/product', _scope);
                    }
                }).catch(function (err) {
                    console.log(_err);
                    _scope.comments = [];
                    _scope.JsonComments = [];
                    res.render('pages/product', _scope);
                });

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
    app.get('/:countryIso/Contactus', function (req, res) {
        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;
        res.render('pages/contactus');
    });

    // search page 
    app.get('/:countryIso/Search/:searchTxt', function (req, res) {
        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;
        _scope.searchTxt = req.params.searchTxt;
        console.log(req.params.searchTxt);
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
                                    //console.log(_searchResult);
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

    // inbox page
    app.get('/:countryIso/Inbox/:me/:user', function (req, res) {
        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;

        _scope.chatPartener = req.params.user;
        console.log(_scope.chatPartener);

        message.getAllContacts(req.params.me).then(function (_listAllContacts) {
            if (_listAllContacts.code == 100) {
                console.log(_listAllContacts.data);
                var allMyUsers = JSON.stringify(_listAllContacts.data);
                _scope.usersList = allMyUsers;

                if (req.params.user != '0') {

                    user.getById(req.params.user).then(function (_newStore) {
                        if (_newStore.code == 100) {
                            // store data
                            console.log(_newStore.data);
                            _scope.currentMessageReceiver = JSON.stringify(_newStore.data);

                            message.getAll(req.params.me, req.params.user).then(function (_data) {
                                console.log(_data);
                                if (_data.code == 100) {
                                    console.log(_data.data);
                                    var chatingHistory = _data.data;
                                    var JsonInbox = JSON.stringify(chatingHistory);
                                    _scope.chatingHistory = chatingHistory;
                                    _scope.JsonInbox = JsonInbox;
                                    res.render('pages/inbox', _scope);
                                }
                                else {
                                    console.log('nooooooooooooo data');
                                    _scope.chatingHistory = [];
                                    _scope.JsonInbox = [];
                                    res.render('pages/inbox', _scope);
                                }
                            }).catch(function (err) {
                                console.log(err);
                                console.log('nooooooooooooo data');
                                _scope.chatingHistory = [];
                                _scope.JsonInbox = [];
                                res.render('pages/inbox', _scope);
                            });

                        }
                        else {
                            //store not exist
                            _scope.currentMessageReceiver = '';
                            _scope.chatingHistory = [];
                            _scope.JsonInbox = [];
                            res.render('pages/inbox', _scope);
                        }
                    }).catch(function () {
                        //store not exist
                        _scope.currentMessageReceiver = '';
                        _scope.chatingHistory = [];
                        _scope.JsonInbox = [];
                        res.render('pages/inbox', _scope);
                    });
                }
                else {
                    _scope.currentMessageReceiver = '';
                    _scope.chatingHistory = [];
                    _scope.JsonInbox = [];
                    _scope.chatPartener = '';
                    res.render('pages/inbox', _scope);
                }


            } else {
                _scope.currentMessageReceiver = '';
                _scope.usersList = [];
                _scope.chatingHistory = [];
                _scope.JsonInbox = [];
                res.render('pages/inbox', _scope);
            }
        })
            .catch(function () {
                _scope.currentMessageReceiver = '';
                _scope.usersList = [];
                _scope.chatingHistory = [];
                _scope.JsonInbox = [];
                res.render('pages/inbox', _scope);
            });



    });

    // notifications page
    app.get('/:countryIso/Notifications/:me', function (req, res) {
        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;

        notification.getAll(req.params.me).then(function (_listAllNotifications) {
            console.log(_listAllNotifications);
            if (_listAllNotifications.code == 100) {
                console.log(_listAllNotifications.data);
                _scope.listNotifications = _listAllNotifications.data;
                res.render('pages/notification', _scope);
            } else {
                _scope.listNotifications = [];
                res.render('pages/notification', _scope);
            }
        })
        .catch(function (err) {
            console.log(err);
            _scope.listNotifications = [];
            res.render('pages/notification', _scope);
        });
    });

    // favorites page
    app.get('/:countryIso/Favorites/:me', function (req, res) {
        console.log(req.params.countryIso);
        var _scope = {};
        _scope.countryIso = req.params.countryIso;

        user.getFavourites(req.params.me).then(function (_list) {
            console.log(_list);
            if (_list.code == 100) {
                console.log(_list.data);
                _scope.listFavourites = _list.data.FavouriteItems;
                res.render('pages/favourites', _scope);
            } else {
                _scope.listFavourites = [];
                res.render('pages/favourites', _scope);
            }
        })
        .catch(function (err) {
            console.log(err);
            _scope.listFavourites = [];
            res.render('pages/favourites', _scope);
        });
    });

}
