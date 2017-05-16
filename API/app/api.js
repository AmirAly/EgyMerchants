var Schema = require('./galleries');
var Gallery = require('./Models/gallery');
var Item = require('./Models/item');
var Expo = require('./Models/expo');
var Store = require('./Models/store');
var Country = require('./Models/country');
var Category = require('./Models/category');

var Helper = require('./helper');


module.exports = function (app, express) {
    var api = express.Router();

    api.get('/', function (req, res) {
        return res.json({ code: '100', data: 'This api is working great, howver further calls to other endpoints require a token' });
    });


    api.post('/Store/Register', function (req, res) {
        var _newstore = new Store(req.body);
        Schema.register(_newstore);
    });
    api.post('/Store/Login', function (req, res) {
        var _newstore = new Store(req.body);
        Schema.login(_newstore);
    })
    api.put('/Store/editProfile', function (req, res) {
        Schema.editProfile(req.body._id, req.body.oldpassword, req.body.newpassword, req.body.email, req.body.city, req.body.address, req.body.country, req.body.description);
    })
    api.get('/Store/getById/:_id', function (req, res) {
        Schema.getById(req.params._id);
    });

    api.post('/Gallery/add', function (req, res) {
        var _newgallery = new Gallery(req.body);
        Schema.add(_newgallery);
    });
    api.put('/Gallery/edit', function (req, res) {
        Schema.edit(req.body._id,req.body.Title,req.body.Description,req.body.Imgs);
    });
    api.get('/Gallery/getById/:_id', function (req, res) {
        Schema.getById(req.params._id);
    });
    api.get('/Gallery/getByStore/:_id', function (req, res) {
        Schema.getByStore(req.params._id);
    });

    api.post('/Item/add', function (req, res) {
        var _newitem = new Item(req.body);
        Schema.add(_newitem);
    });
    api.put('/Item/edit', function (req, res) {
        Schema.edit(req.body._id, req.body.Name, req.body.Description, req.body.Imgs);
    });
    api.get('/Item/getById/:_id', function (req, res) {
        Schema.getById(req.params._id);
    });
    api.get('/Item/getByGalleryId/:_id', function (req, res) {
        Schema.getByGalleryId(req.params._id);
    });
    api.get('/Item/getFeatured/:_id', function (req, res) {
        Schema.getFeatured(req.params._id);
    });
    api.get('/Item/getByBestSeller/:_id', function (req, res) {
        Schema.getByBestSeller(req.params._id);
    });
    return api;
};
