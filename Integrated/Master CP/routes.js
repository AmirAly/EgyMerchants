var store = require('./models/stores');
var product = require('./models/items');
var gallery = require('./models/galleries');
var category = require('./models/categories');
var country = require('./models/countries');
var expo = require('./models/expoes');
var master = require('./models/masters');
module.exports = function (app) {
    // use res.render to load up an ejs view file
    // index page 
    app.get('/', function (req, res) {
        return res.redirect('/eg/Home');
    });

    app.get('/eg/store', function (req, res) {
        var _scope = {};
        store.getAll().then(function (_store) {
            if (_store.code == 100) {
                _scope.storeslst = _store.data;
                res.render('pages/store', _scope);
            } else {
                _scope.storeslst = [];
                res.render('pages/store', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.storeslst = [];
            res.render('pages/store', _scope);
        });
    });

    app.get('/eg/exposlist', function (req, res) {
        var _scope = {};
        expo.getAll().then(function (_expo) {
            if (_expo.code == 100) {
                _scope.expolist = _expo.data;
                console.log(_expo.data);
                category.getAll().then(function (_category) {
                    if (_category.code == 100) {
                        _scope.categorieslst = _category.data;
                        res.render('pages/exposlist', _scope);
                    } else {
                        _scope.categorieslst = {};
                        res.render('pages/exposlist', _scope);
                    }
                }).catch(function (_err) {
                    console.log(_err);
                    _scope.categorieslst = {};
                    res.render('pages/exposlist', _scope);
                });

            } else {
                console.log('else');
                _scope.expolist = {};
                res.render('pages/exposlist', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.expolist = {};
            res.render('pages/exposlist', _scope);
        });
    });

    app.get('/eg/floors/:expoid', function (req, res) {
        var _scope = {};
        // drop down fill
        store.getAll().then(function (_store) {
            if (_store.code == 100) {
                _scope.storeslst = _store.data;
                res.render('pages/floors', _scope);
            } else {
                _scope.storeslst = [];
                res.render('pages/floors', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.storeslst = [];
            res.render('pages/floors', _scope);
        });
    });

    app.get('/eg/editfloor', function (req, res) {
        var _scope = {};
        // drop down fill
        store.getAll().then(function (_store) {
            if (_store.code == 100) {
                _scope.storeslst = _store.data;
                res.render('pages/editfloor', _scope);
            } else {
                _scope.storeslst = [];
                res.render('pages/editfloor', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.storeslst = [];
            res.render('pages/editfloor', _scope);
        });
    });

    app.get('/eg/expo/:expoId', function (req, res) {
        var _scope = {};
        expo.getById(req.params.expoId).then(function (_expo) {
            if (_expo.code == 100) {
                _scope.expo = _expo.data;
                _scope.floorslstJSON = JSON.stringify(_expo.data.Floors);
                _scope.expoJSON = JSON.stringify(_expo.data);
                category.getAll().then(function (_category) {
                    if (_category.code == 100) {
                        _scope.categorieslst = _category.data;
                        res.render('pages/expo', _scope);
                    } else {
                        _scope.categorieslst = {};
                        res.render('pages/expo', _scope);
                    }
                }).catch(function (_err) {
                    console.log(_err);
                    _scope.categorieslst = {};
                    res.render('pages/expo', _scope);
                });
            } else {
                console.log('else');
                _scope.expo = {};
                _scope.floorslstJSON = [];
                res.render('pages/expo', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.expo = {};
            _scope.floorslstJSON = [];
            res.render('pages/expo', _scope);
        });
    });

    app.get('/eg/categorieslist', function (req, res) {
        var _scope = {};
        category.getAll().then(function (_category) {
            if (_category.code == 100) {
                _scope.categorieslst = _category.data;
                res.render('pages/categorieslist', _scope);
            } else {
                _scope.categorieslst = {};
                res.render('pages/categorieslist', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.categorieslst = {};
            res.render('pages/categorieslist', _scope);
        });
    });

    app.get('/eg/countrieslist', function (req, res) {
        var _scope = {};
        country.getAll().then(function (_country) {
            if (_country.code == 100) {
                _scope.countrieslst = _country.data;
                _scope.countrieslstJSON = JSON.stringify(_country.data);
                category.getAll().then(function (_category) {
                    if (_category.code == 100) {
                        _scope.categorieslst = _category.data;
                        _scope.categorieslstJSON = JSON.stringify(_category.data);
                        res.render('pages/countrieslist', _scope);
                    } else {
                        _scope.categorieslst = {};
                        res.render('pages/countrieslist', _scope);
                    }
                }).catch(function (_err) {
                    console.log(_err);
                    _scope.categorieslst = {};
                    res.render('pages/countrieslist', _scope);
                });

            } else {
                _scope.countrieslst = [];
                res.render('pages/countrieslist', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.countrieslst = [];
            res.render('pages/countrieslist', _scope);
        });
    });

    app.get('/eg/country/:countryId', function (req, res) {
        var _scope = {};
        country.getById(req.params.countryId).then(function (_country) {
            if (_country.code == 100) {
                _scope.country = _country.data;
                category.getAll().then(function (_category) {
                    if (_category.code == 100) {
                        _scope.categorieslst = _category.data;
                        _scope.categorieslstJSON = JSON.stringify(_category.data);
                        res.render('pages/country', _scope);
                    } else {
                        _scope.categorieslst = {};
                        res.render('pages/country', _scope);
                    }
                }).catch(function (_err) {
                    console.log(_err);
                    _scope.categorieslst = {};
                    res.render('pages/country', _scope);
                });

            } else {
                _scope.country = {};
                res.render('pages/country', _scope);
            }
        }).catch(function (_err) {
            console.log(_err);
            _scope.country = {};
            res.render('pages/country', _scope);
        });
    });

    app.get('/eg/Home', function (req, res) {
        var _scope = {};
        master.login().then(function (_master) {
            if (_master.code == 100) {
                _scope.loginData = _master.data;
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