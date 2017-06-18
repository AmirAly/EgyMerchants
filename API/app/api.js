var GalleryLogic = require('./galleries');
var ItemLogic = require('./items');
var StoreLogic = require('./stores');
var MasterLogic = require('./masters');
var CountryLogic = require('./countries');
var CategoryLogic = require('./categories');
var ExpoLogic = require('./expoes');
var UserLogic = require('./users');
var Gallery = require('./models/gallery');
var Item = require('./models/item');
var Expo = require('./models/expo');
var Country = require('./models/country');
var Category = require('./models/category');
var User = require('./models/user');
var Expo = require('./models/expo');
var Helper = require('./helper');


module.exports = function (app, express) {
    var api = express.Router();

    api.get('/', function (req, res) {
        return res.json({ code: '100', data: 'This api is working great, howver further calls to other endpoints require a token' });
    });

    //store API calls
    api.post('/Store/Register', function (req, res) {
        var _newstore = new User(req.body);
        StoreLogic.register(_newstore).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.post('/Store/Login', function (req, res) {
        var _newStore = new User(req.body);
        StoreLogic.login(_newStore).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Store/EditProfile', function (req, res) {
        StoreLogic.editProfile(req.body._id, req.body.Email, req.body.City, req.body.Address, req.body.Country, req.body.Description, req.body.Imgs, req.body.ProfilePicture).then(function (result) {
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
    api.put('/Store/EditBadges', function (req, res) {
        StoreLogic.editBadges(req.body._id, req.body.Verified, req.body.HasFactory, req.body.Featured).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })

    //gallery API calls
    api.post('/Gallery/Add', function (req, res) {
        var _newGallery = new Gallery(req.body);
        GalleryLogic.add(_newGallery).then(function (result) {
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

    //item API calls
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

    //country API calls
    api.post('/Country/Add', function (req, res) {
        var _newCountry = new Country(req.body);
        CountryLogic.add(_newCountry).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Country/Edit', function (req, res) {
        CountryLogic.edit(req.body._id, req.body.Name, req.body.Flag, req.body.IsoCode,req.body.WelcomeMsg,req.body.Categories).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Country/Suspend', function (req, res) {
        CountryLogic.suspend(req.body._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.get('/Country/GetById/:_id', function (req, res) {
        CountryLogic.getById(req.params._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })

   //category API calls
    api.post('/Category/Add', function (req, res) {
        var _newCategory = new Category(req.body);
        CategoryLogic.add(_newCategory).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Category/Edit', function (req, res) {
        CategoryLogic.edit(req.body._id, req.body.Name).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Category/Suspend', function (req, res) {
        CategoryLogic.suspend(req.body._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })

    //master API calls
    api.post('/Master/Register', function (req, res) {
        var _newMaster = new User(req.body);
        MasterLogic.register(_newMaster).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.post('/Master/Login', function (req, res) {
        var _newMaster = new User(req.body);
        MasterLogic.login(_newMaster).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })

    //user API calls
    api.post('/User/Register', function (req, res) {
        var _newUser = new User(req.body);
        UserLogic.register(_newUser).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.post('/User/Login', function (req, res) {
        var _newUser = new User(req.body);
        UserLogic.login(_newUser).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })

    //expo API calls
    api.post('/Expo/Add', function (req, res) {
        var _newExpo = new Expo(req.body);
        ExpoLogic.add(_newExpo).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Expo/Edit', function (req, res) {
        ExpoLogic.edit(req.body._id, req.body.Title,req.body.Banner,req.body.Category,req.body.Floors).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Expo/SetFloor', function (req, res) {
        ExpoLogic.setFloor(req.body._id,req.body.Floor).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Expo/Suspend', function (req, res) {
        ExpoLogic.suspend(req.body._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.get('/Expo/GetById/:_id', function (req, res) {
        ExpoLogic.getById(req.params._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })


    return api;
};
