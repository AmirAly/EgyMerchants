var schedule = require('node-schedule');
var Helper = require('./helper');
var Stores = require('./models/store');
var Galleries = require('./models/gallery');
var Items = require('./models/item');
var CDN_App = "https://egmpre.blob.core.windows.net/";
var jwt = require('jsonwebtoken');
var Config = require('./config');

//====================================================================================
module.exports = function (app, express) {
    var api = express.Router();
    api.use(function (req, res, next) {
        if (req.url.toLowerCase() == '/stores/login'
            || req.url.toLowerCase() == '/'
            || req.url.toLowerCase() == '/users/login'
            || req.url.toLowerCase() == '/admins/login'
            || req.url.toLowerCase() == '/merchants/register'
            || req.url.toLowerCase().indexOf('/gallery') > -1
            || req.url.toLowerCase().indexOf('/store') > -1
            || req.url.toLowerCase() == '/galleries'
            || req.url.toLowerCase().indexOf('/items') > -1
            || req.url.toLowerCase() == '/stores/register')
            next();
        else {
            var recToken = req.headers['authorization'];
            jwt.verify(recToken, Config.secret, function (err, decoded) {
                if (err) {
                    return res.json({ code: '401', data: 'Unathorized access' });
                } else {
                    if (decoded.Type == 'Store') {
                        Stores.findOne({ '_id': decoded._id }, {}, function (err, Obj) {
                            if (err)
                                return res.json({ code: '1', data: 'Something went wrong' });
                            else {
                                if (Obj) {
                                    req.currentUser = Obj;
                                    next();
                                }
                            }
                        });
                    }

                }
            });
        }
    });
    api.get('/', function (req, res) {
        return res.json({ code: '100', data: 'This api is working great, howver further calls to other endpoints require a token' });
    });
    api.post('/Stores/Register', function (req, res) {
        var _newObj = new Stores({
            Email: req.body.Email,
            Password: req.body.Password,
            StoreName: req.body.StoreName,
            CountryISOCode: req.body.CountryISOCode,
            Category: req.body.Category,
            Fullname: req.body.Fullname,
            Status: 'Active',
            FeaturedPhoto: req.body.FeaturedPhoto
        });
        if (_newObj.Email && _newObj.Password && _newObj.StoreName && _newObj.CountryISOCode) {
            Stores.findOne({ $or: [{ 'Email': _newObj.Email }, { 'StoreName': _newObj.StoreName }] }, '', function (err, Obj) {
                if (err)
                    return res.json({ code: '1', data: err });
                else {
                    if (Obj)
                        return res.json({ code: '20', data: 'This email/store name is already registered with us' });
                    else {
                        if (_newObj.Password.length < 6)
                            return res.json({ code: '21', data: 'Password should be 6 chars or more' });
                        _newObj.save(function (err) {
                            if (err)
                                return res.json({ code: '1', data: err });
                            else {
                                _newObj.Password = '';
                                return res.json({ code: '100', data: _newObj });
                            }
                        })
                    }
                }
            });
        }
        else {
            return res.json({ code: '23', data: 'Some of required parametars are missing' });
        }
    });
    api.post('/Stores/Login', function (req, res) {
        Stores.findOne({ 'Email': req.body.Email, 'Password': req.body.Password }, {}, function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    Obj.LastActivity = new Date().getTime();
                    Obj.save(function (err) {
                        if (err)
                            console.log(err);
                        else
                            console.log('Last activity updated');
                    });
                    var token = jwt.sign({ Type: 'Store', _id: Obj._id }, Config.secret, {
                        expiresIn: 144000 // expires in 24 hours
                    });
                    if (Obj.Status == 'Unconfirmed')
                        return res.json({
                            code: '101', data: {
                                Username: Obj.StoreName,
                                Email: Obj.Email,
                                _id: Obj._id,
                                AccountType: 'Store',
                                Token: token
                            }
                        });
                    else if (Obj.Status == 'Active')
                        return res.json({
                            code: '100', data: {
                                Username: Obj.StoreName,
                                Email: Obj.Email,
                                _id: Obj._id,
                                AccountType: 'Store',
                                Token: token
                            }
                        });
                    else if (Obj.Status == 'Suspended')
                        return res.json({ code: '24', data: 'This account is suspended' });
                }
                else {
                    return res.json({ code: '20', data: 'Email or password is incorrect' });
                }
            }
        });
    });
    api.get('/Stores/:Category', function (req, res) {
        if (req.params.Category == 'All') {
            Stores.find({}, '_id StoreName CountryISOCode Category FeaturedPhoto', function (err, lst) {
                if (err)
                    return res.json({ code: '1', data: err });
                else {
                    if (lst)
                        return res.json({ code: '100', data: lst });
                    else {
                        return res.json({ code: '102', data: 'No stores found for this country' });
                    }
                }
            });
        }
        else {
            Stores.find({ 'Category': req.params.Category }, '_id StoreName CountryISOCode Category FeaturedPhoto', function (err, lst) {

                if (err)
                    return res.json({ code: '1', data: err });
                else {
                    if (lst)
                        return res.json({ code: '100', data: lst });
                    else {
                        return res.json({ code: '102', data: 'No stores found for this country' });
                    }
                }
            });
        }
    });
    api.get('/Store/:id', function (req, res) {
        Stores.findOne({ '_id': req.params.id }, {}, function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                console.log(Obj);
                if (Obj)
                    return res.json({ code: '100', data: Obj });
                else {
                    return res.json({ code: '102', data: 'No stores found for this country' });
                }
            }
        });
    });
    api.get('/Galleries/:CountryISOCode', function (req, res) {
        Galleries.find({ 'Status': 'Active' }, '_id Status Title Description Store', function (err, lst) {
            if (err)
                return res.json({ code: '1', data: err });
            else {

                if (lst) {
                    var _res = [];
                    for (var i = 0 ; i < lst.length; i++) {
                        if (lst[i].Store) {
                            if (lst[i].Store.CountryISOCode == req.params.CountryISOCode)
                                _res.push(lst[i]);
                        }
                        else {
                            return res.json({ code: '101', data: 'No galleries found for this country' });
                        }
                    }
                    return res.json({ code: '100', data: _res });
                }
                else {
                    return res.json({ code: '102', data: 'No galleries found for this country' });
                }
            }
        }).populate({
            path: 'Store',
            model: 'Store'
        })
    });
    api.get('/Galleries', function (req, res) {
        Galleries.find({ 'Status': 'Active' }, '', function (err, lst) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (lst)
                    return res.json({ code: '100', data: lst });
                else {
                    return res.json({ code: '21', data: 'No galleries found' });
                }
            }
        }).populate({
            path: 'Store',
            model: 'Store'
        });
    });
    api.get('/Gallery/:id', function (req, res) {
        Galleries.findOne({ '_id': req.params.id, 'Status': 'Active' }, {}, function (err, obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (obj)
                    return res.json({ code: '100', data: obj });
                else {
                    return res.json({ code: '102', data: 'No galleries found with such id' });
                }
            }
        });
    });
    api.get('/StoreGalleries/:id', function (req, res) {
        Galleries.find({ 'Store': req.params.id, 'Status': 'Active' }, {}, function (err, obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (obj)
                    return res.json({ code: '100', data: obj });
                else {
                    return res.json({ code: '102', data: 'No galleries found with such store id' });
                }
            }
        });
    });
    api.post('/Galleries', function (req, res) {
        var _newObj = new Galleries(req.body);
        Stores.findOne({ '_id': _newObj.Store }, '_id Status', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                console.log(Obj);
                if (Obj && Obj.Status == 'Active') {
                    _newObj.save(function (err) {
                        if (err)
                            return res.json({ code: '1', data: err });
                        else {
                            return res.json({ code: '100', data: _newObj });
                        }
                    });
                }
                else {
                    return res.json({ code: '22', data: 'Store is disabled or not exist' });
                }
            }
        });
    });
    api.put('/Galleries', function (req, res) {
        Galleries.findOne({ _id: req.body._id }, {}, function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj && Obj.Status == 'Active') {
                    Obj.Title = req.body.Title;
                    Obj.Description = req.body.Description;

                    Obj.save(function (err) {
                        if (err)
                            return res.json({ code: '21', data: err });
                        else
                            return res.json({ code: '100', data: 'Gallery updated' });
                    });

                }
                else {
                    return res.json({ code: '20', data: 'This gallery is disabled or not exist' });
                }
            }
        });
    });
    api.put('/Galleries/Disable/:id', function (req, res) {
        Galleries.findOne({ _id: req.params.id }, '', {}, function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    Obj.Status = 'Disabled';
                    console.log(Obj.Status);
                    Obj.save(function (err) {
                        if (err)
                            return res.json({ code: '1', data: err });
                        else {
                            return res.json({ code: '100', data: 'Gallery disable' });
                        }
                    })
                }
                else {
                    return res.json({ code: '21', data: 'This gallery is not exist' });
                }
            }
        });
    });
    api.post('/Items', function (req, res) {
        var _newObj = new Items(req.body);
        if (_newObj.Pictures) {
            if (_newObj.Pictures.length > 4)
                return res.json({ code: '30', data: 'Only 4 pictures are allowed per item' });
            for (var i = 0 ; i < _newObj.Pictures.length; i++) {
                var _blob_result = Helper.postFile(_newObj.Pictures[i].URL, _newObj._id + "-" + i + ".png");
                _newObj.Pictures[i].URL = CDN_App + "items/" + _newObj._id + "-" + i + ".png";
            }
        }
        _newObj.save(function (err) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                return res.json({ code: '100', data: 'Item created' });
            }
        })
    });
    api.put('/Items', function (req, res) {
        Items.findOne({ _id: req.body._id }, {}, function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (Obj) {
                    // var _newObj = new Items(req.body);
                    Obj.Name = req.body.Name;
                    Obj.Description = req.body.Description;
                    if (req.body.Pictures) {
                        if (req.body.Pictures.length > 4)
                            return res.json({ code: '30', data: 'Only 4 pictures are allowed per item' });
                        for (var i = 0 ; i < req.body.Pictures.length; i++) {
                            var _blob_result = Helper.postFile(req.body.Pictures[i].URL, req.body._id + "-" + i + ".png");
                            req.body.Pictures[i].URL = CDN_App + "items/" + req.body._id + "-" + i + ".png";
                        }
                    }
                    Obj.Pictures = req.body.Pictures;
                    console.log(Obj);
                    Obj.save(function (err) {
                        if (err)
                            return res.json({ code: '1', data: err });
                        else {
                            return res.json({ code: '100', data: 'Item updated' });
                        }
                    })

                }
                else {
                    return res.json({ code: '20', data: 'This item is disabled or not exist' });
                }
            }
        });
    });
    api.get('/Items/:id', function (req, res) {
        Items.find({ 'Gallery': req.params.id }, {}, function (err, lst) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (lst)
                    return res.json({ code: '100', data: lst });
                else {
                    return res.json({ code: '21', data: 'No items found for such gallery' });
                }
            }
        });
    });
    return api;
};