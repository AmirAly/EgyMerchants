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
        StoreLogic.register(_newstore);
    });
    api.post('/Store/Login', function (req, res) {
        var _newstore = new Store(req.body);
        StoreLogic.login(_newstore);
    })
    api.put('/Store/editProfile', function (req, res) {
        StoreLogic.editProfile(req.body._id, req.body.oldpassword, req.body.newpassword, req.body.email, req.body.city, req.body.address, req.body.country, req.body.description);
    })
    api.get('/Store/getById/:_id', function (req, res) {
        StoreLogic.getById(req.params._id);
    });

    api.post('/Gallery/add', function (req, res) {
        var _newgallery = new Gallery(req.body);
        GalleryLogic.add(_newgallery);
    });
    api.put('/Gallery/edit', function (req, res) {
        GalleryLogic.edit(req.body._id, req.body.Title, req.body.Description, req.body.Imgs);
    });
    api.get('/Gallery/getById/:_id', function (req, res) {
        GalleryLogic.getById(req.params._id);
    });
    api.get('/Gallery/getByStore/:_id', function (req, res) {
        GalleryLogic.getByStore(req.params._id);
    });

    api.post('/Item/add', function (req, res) {
        var _newitem = new Item(req.body);
        ItemLogic.add(_newitem);
    });
    api.put('/Item/edit', function (req, res) {
        ItemLogic.edit(req.body._id, req.body.Name, req.body.Description, req.body.Imgs);
    });
    api.get('/Item/getById/:_id', function (req, res) {
        ItemLogic.getById(req.params._id);
    });
    api.get('/Item/getByGalleryId/:_id', function (req, res) {
        ItemLogic.getByGalleryId(req.params._id);
    });
    api.get('/Item/getFeatured/:_id', function (req, res) {
        ItemLogic.getFeatured(req.params._id);
    });
    api.get('/Item/getByBestSeller/:_id', function (req, res) {
        ItemLogic.getByBestSeller(req.params._id);
    });
    return api;
};
