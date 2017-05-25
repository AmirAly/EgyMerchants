var Schema = require('./models/store');
var Product = require('./models/item');
var Gallery = require('./models/gallery');
var Expo = require('./models/expo');
var Category = require('./models/category');
var Helper = require('./helper');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    register: function (_newStore) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Email': _newStore.Email }, { 'StoreName': _newStore.StoreName }] }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj)
                        reject({
                            code: 21,
                            data: "This email or store name already exist"
                        });
                    else {
                        Category.findOneAndUpdate({ '_id': _newStore.Category }, { $addToSet: { 'Countries': _newStore.CountryISOCode } }, { new: true }, function (err, Obj) {
                            _newStore.save(function (err, _newstore) {
                                if (err)
                                    reject({
                                        code: 1,
                                        data: err
                                    });
                                else
                                    resolve({
                                        code: 100,
                                        data: { _id: _newstore._id, StoreName: _newstore.StoreName }
                                    });
                            })
                        })
                    }
                }
            })

        })
    },
    login: function (_store) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $and: [{ 'Email': _store.Email }, { 'Password': _store.Password }] }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else if (!Obj)
                    reject ({
                        code: 21,
                        data: "This email or password incorrect"
                    });
                else if (Obj.Status == "Unconfirmed")
                    reject ({
                        code: 22,
                        data: "This account not confirmed yet"
                    });
                else if (Obj.Status == "Suspend")
                    reject({
                        code: 23,
                        data: "This account suspended"
                    });
                else if (Obj.Status == "Active")
                    resolve({
                        code: 100,
                        data: { _id: Obj._id, StoreName: Obj.StoreName }
                    });
            })
        })
    },
    editProfile: function (_id,_oldPassword,_newPassword,_email,_city,_address,_country,_description,_imgs) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        Obj.Email = _email;
                        Obj.City = _city;
                        Obj.Address = _address;
                        Obj.Country = _country;
                        Obj.Description = _description;
                        if (_imgs)
                            Obj.Imgs = _imgs;
                        if (_newPassword != "")
                            Obj.Password = _newPassword;
                        else
                            Obj.Password = _oldPassword;
                        Obj.save(function (err, Obj) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else
                                resolve({
                                    code: 100,
                                    data: "Your profile updated successfully"
                                });
                        })
                    }
                    else {
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                    }
                }
            });
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id }, {"Password":0}, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) 
                        resolve({
                            code: 100,
                            data: Obj
                        });
                    else 
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                }
            })
        })
    },
}