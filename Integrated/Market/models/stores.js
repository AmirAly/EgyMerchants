var Schema = require('./models/user');
var Product = require('./models/item');
var Gallery = require('./models/gallery');
var Expo = require('./models/expo');
var Item = require('./models/item');
var Category = require('./models/category');
var _ = require("underscore");
module.exports = {
    register: function (_newStore) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $and: [{ $or: [{ 'Email': _newStore.Email }, { 'Name': _newStore.Name }] }, { 'Status': 'Active' }] }, '', function (err, Obj) {
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
                                    data: { _id: _newstore._id, Name: _newstore.Name, Type: _newstore.Type }
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
            Schema.findOne({ $and: [{ 'Email': _store.Email }, { 'Password': _store.Password }, { 'Type': 'store' }] }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else if (!Obj)
                    reject({
                        code: 21,
                        data: "This email or password incorrect"
                    });
                else if (Obj.Status == "Unconfirmed")
                    reject({
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
                        data: { _id: Obj._id, Name: Obj.Name, Type: Obj.Type }
                    });
            })
        })
    },
    editProfile: function (_id, _email, _city, _address, _country, _description, _imgs, _profilePicture, _coverPhoto) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ 'Email': _email, '_id': { $ne: _id }, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj)
                        reject({
                            code: 21,
                            data: "This email already exist"
                        });
                    else {
                        Schema.findOne({ '_id': _id, 'Status': 'Active' }, '', function (err, Obj) {
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
                                        Obj.ProfilePicture = _profilePicture;
                                        Obj.CoverPhoto = _coverPhoto;
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
                                else
                                    reject({
                                        code: 21,
                                        data: "There is no such store"
                                    });
                            }
                        })
                    }
                }
            })
        })
    },
    editBadges: function (_id, _verified, _hasFactory, _featured) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id': _id, 'Status': 'Active' }, { $set: { 'Badges.Verified': _verified, 'Badges.HasFactory': _hasFactory, 'Badges.Featured': _featured } }, { new: true }, function (err, Obj) {
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
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, { "Password": 0 }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        resolve({
                            code: 100,
                            data: Obj
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
                    if (Obj)
                        resolve({ code: 100, data: "This store deleted successfuylly" })
                    else
                        reject({ code: 21, data: "This filteration didn't resulted in any data" })
                }
            })
        })
    },
    getAll: function () {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Status': 'Active', 'Type': 'store' }, 'Name Description ProfilePicture Badges Category', function (err, lst) {
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
            expoList = [],
            expoStoresList = [],
            itemsList = [],
            storesList = [];
        var filter = { 'Country': { "$regex": _country, "$options": "i" }, 'Status': 'Active', 'Type': 'store' };
        if (_country == "all")
            filter = { 'Status': 'Active', 'Type': 'store' };
        var expoFilter = { 'Title': { "$regex": _expo, "$options": "i" }, 'Status': 'Active' };
        if (_expo == "all")
            expoFilter = { 'Status': 'Active' };
        return new Promise(function (resolve, reject) {
            Schema.find(filter, '_id Name ProfilePicture Description Address Status Type', function (err, lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (lst.length > 0) {
                        storesList = storesList.concat(lst);
                    }
                    Expo.find(expoFilter, 'Floors Title Banner').populate('Floors.Coordinates.Store', '_id Name ProfilePicture Description Address Status Type').exec(function (err, lst) {
                        if (err)
                            reject({
                                code: 1,
                                data: err
                            });
                        else {
                            if (lst.length > 0) {
                                expoList = _.map(lst, function (expo) {
                                    return _.pick(_.extend({}, expo, { Type: "expo" }), '_id', 'Title', 'Banner', 'Type');
                                })
                                if (_expo != "all") {
                                    _.each(lst, function (expo) {
                                        _.each(expo.Floors, function (floor) {
                                            _.each(floor.Coordinates, function (store) {
                                                if (store.Store.Status == "Active") expoStoresList.push(store.Store);
                                            })
                                        })
                                    })
                                    var destinctArray = _.uniq(expoStoresList, function (x) {
                                        return (x._id).toString();
                                    })
                                    var intersect = [];
                                    _.each(destinctArray, function (a) {
                                        _.each(storesList, function (b) {
                                            if (a._id.toString() === b._id.toString()) {
                                                intersect.push(a);
                                            }
                                        });
                                    });
                                    storesList = intersect;
                                }
                                if (_store != "all" && _keyWord == "all") {
                                    finalList = _.filter(storesList, function (store) {
                                        return (store.Name.toLowerCase().indexOf(_store.toLowerCase()) !== -1 || store.Description.toLowerCase().indexOf(_store.toLowerCase()) !== -1 || store.Address.toLowerCase().indexOf(_store.toLowerCase()) !== -1)
                                    })

                                    if (_expo != "all") { finalList = finalList.concat(expoList) }
                                    if (finalList.length > 0) {
                                        resolve({ code: 100, data: _.groupBy(finalList, 'Type') });
                                    }
                                    else {
                                        reject({ code: 21, data: "This filteration didn't result in any data" })
                                    }
                                }
                                if (_keyWord != "all") {
                                    Item.find({ $and: [{ $or: [{ 'Name': { "$regex": _keyWord, "$options": "i" } }, { 'Description': { "$regex": _keyWord, "$options": "i" } }] }, { 'Status': 'Active' }] }, '_id Name Pictures Store', function (err, itemLst) {
                                        if (err)
                                            reject({
                                                code: 1,
                                                data: err
                                            });
                                        else {
                                            if (itemLst.length > 0) {
                                                itemsList = _.map(itemLst, function (item) {
                                                    return _.pick(_.extend({}, item, { Type: "item" }), '_id', 'Name', 'Pictures', 'Store', 'Type');
                                                })
                                            }
                                            if (_expo == "all")
                                                finalList = finalList.concat(_.filter(expoList, function (expo) {
                                                    return (expo.Title.toLowerCase().indexOf(_keyWord.toLowerCase()) !== -1)
                                                }))
                                            else { finalList = finalList.concat(expoList) }
                                            if (_store != "all" || _expo != "all" || _country != "all") {
                                                if (_store != "all") {
                                                    storesList = _.filter(storesList, function (store) {
                                                        return (store.Name.toLowerCase().indexOf(_store.toLowerCase()) !== -1 || store.Description.toLowerCase().indexOf(_store.toLowerCase()) !== -1 || store.Address.toLowerCase().indexOf(_store.toLowerCase()) !== -1)
                                                    })
                                                    finalList = finalList.concat(storesList);
                                                }
                                                else {
                                                    finalList = finalList.concat(_.filter(storesList, function (store) {
                                                        return (store.Name.toLowerCase().indexOf(_keyWord.toLowerCase()) !== -1 || store.Description.toLowerCase().indexOf(_keyWord.toLowerCase()) !== -1 || store.Address.toLowerCase().indexOf(_keyWord.toLowerCase()) !== -1)
                                                    }))
                                                }
                                                _.each(storesList, function (store) {
                                                    var res = _.filter(itemsList, function (item) {
                                                        return item.Store == store._id.toString();
                                                    })
                                                    finalList = finalList.concat(res);
                                                })
                                            }
                                            else {
                                                var filteredStores = _.filter(storesList, function (store) {
                                                    return (store.Name.toLowerCase().indexOf(_keyWord.toLowerCase()) !== -1 || store.Description.toLowerCase().indexOf(_keyWord.toLowerCase()) !== -1 || store.Address.toLowerCase().indexOf(_keyWord.toLowerCase()) !== -1)
                                                })
                                                finalList = finalList.concat(filteredStores);
                                                finalList = finalList.concat(itemsList);
                                            }
                                            var destinctResult = _.uniq(finalList, function (x) {
                                                return (x._id).toString();
                                            });
                                            finalList = destinctResult;
                                            if (finalList.length > 0) {
                                                resolve({ code: 100, data: _.groupBy(finalList, 'Type') });
                                            }
                                            else {
                                                reject({ code: 21, data: "This filteration didn't result in any data" })
                                            }
                                        }
                                    })
                                }
                                else {
                                    if (_expo != "all") {
                                        finalList = storesList.concat(expoList);
                                        if (finalList.length > 0) {
                                            resolve({ code: 100, data: _.groupBy(finalList, 'Type') });
                                        }
                                        else {
                                            reject({ code: 21, data: "This filteration didn't result in any data" })
                                        }
                                    }
                                    else {
                                        if (_country != "all") {
                                            finalList = storesList;
                                            if (finalList.length > 0) {
                                                resolve({ code: 100, data: _.groupBy(finalList, 'Type') });
                                            }
                                            else {
                                                reject({ code: 21, data: "This filteration didn't result in any data" })
                                            }
                                        }
                                        else { reject({ code: 22, data: "please enter any value for search" }) }
                                    }
                                }

                            }
                        }

                    })
                }
            })
        })
    },
}