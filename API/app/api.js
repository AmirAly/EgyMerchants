var GalleryLogic = require('./galleries');
var ItemLogic = require('./products');
var StoreLogic = require('./stores');
var Gallery = require('./models/gallery');
var Item = require('./models/item');
var Expo = require('./models/expo');
var Store = require('./models/store');
var Country = require('./models/country');
var Category = require('./models/category');

var Helper = require('./helper');


module.exports = function (app, express) {
    var api = express.Router();

    api.get('/', function (req, res) {
        return res.json({ code: '100', data: 'This api is working great, howver further calls to other endpoints require a token' });
    });


    api.post('/Store/Register', function (req, res) {
        var _newstore = new Store(req.body);
        StoreLogic.register(_newstore).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.post('/Store/Login', function (req, res) {
        var _newstore = new Store(req.body);
        StoreLogic.login(_newstore).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Store/EditProfile', function (req, res) {
        StoreLogic.editProfile(req.body._id, req.body.OldPassword, req.body.NewPassword,req.body.Email, req.body.City, req.body.Address, req.body.Country, req.body.Description,req.body.Imgs).then(function (result) {
            res.json(result );
        }, function (err) {
            res.json(err);
        });
    })
    api.get('/Store/GetById/:_id', function (req, res) {
        StoreLogic.getById(req.params._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })

    api.post('/Gallery/Add', function (req, res) {
        var _newgallery = new Gallery(req.body);
        GalleryLogic.add(_newgallery).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Gallery/Edit', function (req, res) {
        GalleryLogic.edit(req.body._id, req.body.Title, req.body.Description, req.body.Imgs).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.get('/Gallery/GetById/:_id', function (req, res) {
        GalleryLogic.getById(req.params._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.get('/Gallery/GetByStore/:_id', function (req, res) {
        GalleryLogic.getByStore(req.params._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })

    api.post('/Item/Add', function (req, res) {
        var _newitem = new Item(req.body);
        ItemLogic.add(_newitem).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Item/Edit', function (req, res) {
        ItemLogic.edit(req.body._id, req.body.Name, req.body.Description, req.body.Imgs, req.body.Price, req.body.PriceBeforeSale, req.body.Badges,req.body.Tags).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.get('/Item/GetById/:_id', function (req, res) {
        ItemLogic.getById(req.params._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.get('/Item/GetByGalleryId/:_id', function (req, res) {
        ItemLogic.getByGalleryId(req.params._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    return api;
};
