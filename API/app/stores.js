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
                        code:1,
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
                                else {
                                    var email = {
                                        to: _newstore.Email,
                                        subject: "confirm your email",
                                        html: '<a href="http://localhost:8007/Store/Confirm/"+_newStore._id>"please click this link to confirm your email"</a>'
                                    };
                                    Helper.sendEmail(email);
                                    resolve({
                                        code: 100,
                                        data: { _id: _newstore._id, StoreName: _newstore.StoreName }
                                    });
                                }
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
    editProfile: function (_id,_email,_city,_address,_country,_description,_imgs) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        if (Obj.Status == "Active") {
                            Obj.Email = _email;
                            Obj.City = _city;
                            Obj.Address = _address;
                            Obj.Country = _country;
                            Obj.Description = _description;
                            if (_imgs)
                                Obj.Imgs = _imgs;
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
                                code: 22,
                                data: "This store is suspended"
                            });
                        }
                    }
                    else {
                        reject({
                            code: 21,
                            data: "There is no such store"
                        });
                    }
                }
            });
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id}, { "Password": 0 }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        if(Obj.Status=="Active")
                            resolve({
                                code: 100,
                                data: Obj
                            });
                        else
                            reject({
                                code: 22,
                                data: "This store not active"
                            });
                    }
                    else
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                }
            })
        })
    },
    suspend: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id': _id }, { $set: { 'Status': "Suspended" } }, { new: true }, function (err, Obj) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if(Obj)
                        resolve({ code: 100, data: "This store deleted successfuylly" })
                    else 
                        reject({code:21,data:"This filteration didn't resulted in any data"})
                }
            })
        })
    },
    confirmMail: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else
                    Obj.Status = "Active";
                Obj.save(function (err, Obj) {
                    if (err)
                        reject({
                            code: 1,
                            data: err
                        });
                    else
                        resolve({
                            code: 100,
                            data: "your account activated successfully"
                        });
                });
            })
        })
    },
    getByCountry: function (_countryId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'CountryISOCode': _countryId }, '_id StoreName', function (err, lst) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if (lst.length > 0)
                        resolve({ code: 100, data: lst })
                    else
                        reject({ code: 21, data: "This filteration didn't resulted in any data" })
                }
            })
        })
    }

}