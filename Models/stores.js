var Schema = require('./models/user');
var Product = require('./models/item');
var Gallery = require('./models/gallery');
var Expo = require('./models/expo');
var Category = require('./models/category');
var Helper = require('./helper');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    register: function (_newStore) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Email': _newStore.Email }, {'Name':_newStore.Name}]}, '', function (err, Obj) {
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
                        _newStore.Type = 'store';
                            _newStore.save(function (err, _newstore) {
                                if (err)
                                    reject({
                                        code: 1,
                                        data: err
                                    });
                                else {
                                    resolve({
                                        code: 100,
                                        data: { _id: _newstore._id, Name: _newstore.Name,Type:_newstore.Type }
                                    });
                                }
                            })
                    }
                }
            })
               
        })
    },
    login: function (_store) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $and: [{ 'Email': _store.Email }, { 'Password': _store.Password }, {'Type':'store'}] }, '', function (err, Obj) {
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
                        data: { _id: Obj._id, Name: Obj.Name,Type:Obj.Type }
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
    editBadges: function (_id, _verified, _hasFactory, _featured) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id': _id }, { $set: { 'Badges.Verified': _verified, 'Badges.HasFactory': _hasFactory, 'Badges.Featured': _featured } }, { new: true }, function (err, Obj) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if (Obj)
                        resolve({ code: 100, data: "Store badges edited successfully" })
                    else
                        reject({ code: 21, data: "This filteration didn't resulted in any data" })
                }
            })
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
    getAll: function () {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Status':'Active','Type':'store' }, 'Name', function (err, lst) {
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
    },
    search: function (_store, _expo, _keyWord, _country) {
        var finalList = [],
             itemsLst = [],
        storesLst = [];
         var underscore = require("underscore");
        return new Promise(function (resolve, reject) {
            if (_country != "") {
                Schema.find({ 'Status': 'Active', 'CountryISOCode': _country }, 'StoreName Imgs', function (err, lst) {
                    if (err)
                        reject({
                            code: 1,
                            data: err
                        });
                    else {
                        if (lst.length > 0) {
                            storesLst.push(lst);
                        }
                        if (_expo != "") {
                            Expo.find({ 'Title': { "$regex": _expo, "$options": "i" } }, 'Sections').populate({
                                path: 'Sections.Store',
                                model: 'Store',
                                match: { Status: 'Active' },
                                select: { _id: 1, StoreName: 1, Imgs: 1, Type: 1 }
                            }).exec(function (err, lst) {
                                if (err)
                                    reject({
                                        code: 1,
                                        data: err
                                    });
                                else {
                                    if (lst.length > 0) {
                                        underscore.each(lst, function (expo) {
                                            underscore.each(expo.Sections, function (store) {
                                                storesLst.push({ _id: store.Store._id, StoreName: store.Store.StoreName, Imgs: store.Store.Imgs, Type: 'store' })
                                                //underscore.groupBy(finalList, 'Type');
                                                //console.log((underscore.groupBy(finalList, 'Type')).store);
                                            })
                                        })
                                    }
                                    if (_store != "") {
                                        underscore.filter(storesLst, function (store) {
                                            if (store.StoreName.indexOf(_store) !== -1 || store.Description.indexOf(_store) !== -1 || store.Badges.indexOf(_store) !== -1) {
                                                finalList.push({ _id: store._id, StoreName: store.StoreName, Imgs: store.Imgs, Type: 'store' });
                                            }
                                        })
                                    }
                                    if (_keyWord != "") {
                                        underscore.filter(storesLst, function (store) {
                                            if (store.StoreName.indexOf(_store) !== -1 || store.Description.indexOf(_store) !== -1 || store.Badges.indexOf(_store) !== -1) {
                                                finalList.push({ _id: store._id, StoreName: store.StoreName, Imgs: store.Imgs, Type: 'store' });
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    },

}