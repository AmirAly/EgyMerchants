var schedule = require('node-schedule');
var Helper = require('./helper');
var Merchants = require('./models/merchant');
var Galleries = require('./models/gallery');
var Items = require('./models/item');
var CDN_App = "https://egmpre.blob.core.windows.net/";
var jwt = require('jsonwebtoken');
var Config = require('./config');

//====================================================================================
module.exports = function (app, express) {
    var api = express.Router();
    api.use(function (req, res, next) {
        if (req.url.toLowerCase() == '/merchants/login'
            || req.url.toLowerCase() == '/'
            || req.url.toLowerCase() == '/users/login'
            || req.url.toLowerCase() == '/admins/login'
            || req.url.toLowerCase() == '/merchants/register')
            next();
        else {
            var recToken = req.headers['authorization'];
            jwt.verify(recToken, Config.secret, function (err, decoded) {
                if (err) {
                    return res.json({ code: '401', data: 'Unathorized access' });
                } else {
                    //decoded
                    next();
                }
            });
        }
    });
    api.get('/', function (req, res) {
        return res.json({ code: '100', data: 'This api is working great, howver further calls to other endpoints require a token' });
    });
    api.post('/Merchants/Register', function (req, res) {
        var _newObj = new Merchants({
            Email: req.body.Email,
            Password: req.body.Password,
            StoreName: req.body.StoreName,
            CountryISOCode: req.body.CountryISOCode
        });
        if (_newObj.Email && _newObj.Password && _newObj.StoreName && _newObj.CountryISOCode) {
            Merchants.findOne({ $or: [{ 'Email': _newObj.Email }, { 'StoreName': _newObj.StoreName }] }, '', function (err, Obj) {
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
    api.post('/Merchants/Login', function (req, res) {
        Merchants.findOne({ 'Email': req.body.Email, Password: req.body.Password }, {}, function (err, Obj) {
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
                    var token = jwt.sign({ Type: 'Merchant', _id: Obj._id, StoreName: Obj.StoreName }, Config.secret, {
                        expiresIn: 144000 // expires in 24 hours
                    });
                    var refresh = jwt.sign({ Type: 'Merchant', _id: Obj._id, }, Config.secret, {
                        expiresIn: 99999999 // expires in 24 hours
                    });
                    if (Obj.Status == 'Unconfirmed')
                        return res.json({ code: '101', data: token, refresh_token: refresh });
                    else if (Obj.Status == 'Active')
                        return res.json({ code: '100', data: token, refresh_token: refresh });
                    else if (Obj.Status == 'Suspended')
                        return res.json({ code: '24', data: 'This account is suspended' });
                }
                else {
                    return res.json({ code: '20', data: 'Email or password is incorrect' });
                }
            }
        });
    });
    api.get('/Merchants/:Category', function (req, res) {
        Merchants.find({ 'Category': req.params.Category }, '_id StoreName CountryISOCode', function (err, lst) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (lst)
                    return res.json({ code: '100', data: lst });
                else {
                    return res.json({ code: '102', data: 'No merchants found for this country' });
                }
            }
        });
    });
    api.get('/Galleries/:CountryISOCode', function (req, res) {
        Galleries.find({}, '_id Title Description Merchant', function (err, lst) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (lst) {
                    var _res = [];
                    for (var i = 0 ; i < lst.length; i++)
                    {
                        if (lst[i].Merchant.CountryISOCode == req.params.CountryISOCode)
                            _res.push(lst[i]);
                    }
                    return res.json({ code: '100', data: _res });
                }
                else {
                    return res.json({ code: '102', data: 'No galleries found for this country' });
                }
            }
        }).populate({
            path: 'Merchant',
            model: 'Merchant'
        })
    });
    api.get('/Galleries', function (req, res) {
        Galleries.find({}, '', function (err, lst) {
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
            path: 'Merchant',
            model: 'Merchant'
        });
    });
    api.get('/Gallery/:id', function (req, res) {
        Galleries.findOne({ '_id': req.params.id }, {}, function (err, obj) {
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
    api.post('/Galleries', function (req, res) {
        var _newObj = new Galleries(req.body);
        Merchants.findOne({ '_id': _newObj.Merchant }, '_id Status', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
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
                    return res.json({ code: '22', data: 'Merchant is disabled or not exist' });
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