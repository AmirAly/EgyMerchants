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
var CountriesInJson = require('./allcountries.json');
var MessageLogic = require('./messages');
var Message = require('./models/message');
var CommentLogic = require('./comments');
var Comment = require('./models/comment');
var NotificationLogic = require('./notifications');
var Notification = require('./models/notification');
var _ = require("underscore");
module.exports = function (app, express) {
    var api = express.Router();
    
    api.get('/', function (req, res) {
        return res.json({ code: '100', data: 'This api is working great, however further calls to other endpoints require a token' });
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
        StoreLogic.editProfile(req.body._id, req.body.Email, req.body.City, req.body.Address, req.body.Country, req.body.Description, req.body.Imgs, req.body.ProfilePicture, req.body.CoverPhoto,req.body.Contacts).then(function (result) {
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
    api.get('/Store/Search/:_store/:_expo/:_keyword/:_country', function (req, res) {
        StoreLogic.search(req.params._store, req.params._expo, req.params._keyword, req.params._country).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Store/SetAdminNotifications', function (req, res) {
        StoreLogic.setAdminNotifications(req.body._id, req.body._notifications).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Store/Remove', function (req, res) {
        StoreLogic.remove(req.body._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Store/Suspend', function (req, res) {
        StoreLogic.suspend(req.body._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Store/Active', function (req, res) {
        StoreLogic.active(req.body._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Store/AddAdminNotification', function (req, res) {
        StoreLogic.addAdminNotification(req.body._id, req.body._notification).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.get('/Store/GetAdminNotifications/:_id', function (req, res) {
        StoreLogic.getAdminNotifications(req.params._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.get('/Store/SetToActive/:_storeId', function (req, res) {
        StoreLogic.setToActive(req.params._storeId).then(function (result) {
            res.redirect("https://storecp.herokuapp.com");
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
    api.put('/Gallery/Order', function (req, res) {
        GalleryLogic.order(req.body._galleries).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Gallery/Remove', function (req, res) {
        GalleryLogic.remove(req.body._id).then(function (result) {
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
    api.put('/Item/Remove', function (req, res) {
        ItemLogic.remove( req.body._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Item/RemoveImage', function (req, res) {
        ItemLogic.removeImage(req.body._itemid, req.body._imageid).then(function (result) {
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
        CountryLogic.edit(req.body._id, req.body.Name, req.body.Flag, req.body.IsoCode,req.body.WelcomeMsg).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Country/Remove', function (req, res) {
        CountryLogic.remove(req.body._id).then(function (result) {
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
    api.get('/Country/LoadAllInJson', function (req, res) {
        CountryLogic.loadAllInJson().then(function (result) {
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
        CategoryLogic.edit(req.body._id, req.body.Name,req.body.Country).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Category/Remove', function (req, res) {
        CategoryLogic.remove(req.body._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.get('/Category/GetByCountry/:_isoCode', function (req, res) {
        CategoryLogic.getByCountry(req.params._isoCode).then(function (result) {
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
    api.put('/User/AddToFavourites', function (req, res) {
        UserLogic.addToFavourites(req.body._userid, req.body._itemid).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/User/RemoveFromFavourites', function (req, res) {
        UserLogic.removeFromFavourites(req.body._userid, req.body._itemid).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/User/AddToVisited', function (req, res) {
        UserLogic.addToVisited(req.body._userid, req.body._storeid).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.get('/User/SetToActive/:_userId', function (req, res) {
        UserLogic.setToActive(req.params._userId).then(function (result) {
            res.redirect("https://egymarket.herokuapp.com");
        }, function (err) {
            res.json(err);
        });
    })


    api.put('/User/EditProfile', function (req, res) {
        UserLogic.editProfile(req.body._userid, req.body._name , req.body._profilePicture).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })

    api.put('/User/AddRating', function (req, res) {
        UserLogic.addRating(req.body._storeId, req.body._userId , req.body._value).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
        
    })
	  api.get('/GetFavourites/:_userId', function (req, res) {
        UserLogic.getFavourites(req.params._userId).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.post('/User/ContactUS', function (req, res) {
        UserLogic.contactUs(req.body._name,req.body._phone,req.body._mail,req.body._comment).then(function (result) {
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
        ExpoLogic.edit(req.body._id, req.body.Title, req.body.Banner, req.body.Category, req.body.Floors, req.body.FlipTime).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Expo/EditFloor', function (req, res) {
        ExpoLogic.editFloor(req.body._id,req.body.Floor).then(function (result) {
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
    });

    api.put('/Expo/Remove', function (req, res) {
        ExpoLogic.remove(req.body._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    });
    api.get('/Expo/GetById/:_id', function (req, res) {
        ExpoLogic.getById(req.params._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    });
    api.get('/Expo/GetStore/:_expoId', function (req, res) {
        ExpoLogic.getStores(req.params._expoId).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    });

    //message api calls
    api.post('/Message/Send', function (req, res) {
        var _newMessage = new Message(req.body);
        MessageLogic.send(_newMessage).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.get('/Message/GetAll/:_userid/:_toid', function (req, res) {
        MessageLogic.getAll(req.params._userid, req.params._toid).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.get('/Message/GetAllContacts/:_userid', function (req, res) {
        MessageLogic.getAllContacts(req.params._userid).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });

    })
    api.get('/Message/SeeMore/:_UserTo/:_UserFrom/:_keyword', function (req, res) {
        MessageLogic.getTenMessages(req.params._UserTo , req.params._UserFrom , req.params._keyword).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Message/UpdateStatus', function (req, res) {
        MessageLogic.updateStatus(req.body._id).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    //comments api calls
    api.post('/Comment/Add', function (req, res) {
        var _newComment = new Comment(req.body);
        CommentLogic.add(_newComment).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    api.put('/Comment/Remove', function (req, res) {
        CommentLogic.remove(req.body._commentid, req.body._userid).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    
    api.get('/Comment/SeeMore/:_itemId/:_keyword', function (req, res) {
        CommentLogic.getTenItems(req.params._itemId,req.params._keyword).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    


    //notifications api calls
    api.get('/Notification/GetUnRead/:_userid', function (req, res) {
        NotificationLogic.getUnRead(req.params._userid).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })

    api.get('/Notification/SeeMore/:_userId/:_keyword', function (req, res) {
        NotificationLogic.getTenNotifications(req.params._userId,req.params._keyword).then(function (result) {
            res.json(result);
        }, function (err) {
            res.json(err);
        });
    })
    
 
    return api;
};
