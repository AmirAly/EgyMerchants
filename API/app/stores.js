var Schema = require('./models/user');
var Product = require('./models/item');
var Gallery = require('./models/gallery');
var Expo = require('./models/expo');
var Item = require('./models/item');
var Category = require('./models/category');
var Helper = require('./helper');
var CDN = "https://egmpre.blob.core.windows.net/";
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
    editProfile: function (_id, _email, _city, _address, _country, _description, _imgs) {
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
            storesList=[],
            expoList = [];
        itemsList = [];
        var underscore = require("underscore");
        return new Promise(function (resolve, reject) {
            var filter = { 'Country': { "$regex": _country, "$options": "i" }, 'Status': 'Active', 'Type': 'store' };
            if (_country == "")
                filter = { 'Status': 'Active', 'Type': 'store' };
            var expoFilter = { 'Title': { "$regex": _expo, "$options": "i" }, 'Status': 'Active' };
            if (_expo == "")
                expoFilter = { 'Status': 'Active' };
            Schema.find(filter, '_id Name ProfilePicture Description Address Status Type', function (err, lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (lst.length > 0) {
                        storesList = storesList.concat(lst);
                        //console.log(storesList);
                    }
                    Expo.find(expoFilter, 'Floors Title Banner').populate('Floors.Stores.Store', '_id Name ProfilePicture Description Address Status Type').exec(function (err, lst) {
                        if (err)
                            reject({
                                code: 1,
                                data: err
                            });
                        else {
                            if (lst.length > 0) {
                                underscore.each(lst, function (expo) {
                                    expoList.push({ "_id": expo._id, "Title": expo.Title, "Banner": expo.banner, "Type": "expo" });
                                })
                                if (_expo !== "") {
                                    if (_country == "") {
                                        storesList.length=0;  //console.log(storesList);
                                    }
                                    underscore.each(lst, function (expo) {
                                        underscore.each(expo.Floors, function (floor) {
                                            underscore.each(floor.Stores, function (store) {
                                                if (store.Store.Status == "Active") {
                                                    storesList.push(store.Store);
                                                }
                                            })
                                        })
                                    })
                                }
                                var destinctArray = underscore.uniq(storesList, function (x) {
                                    return (x._id).toString();
                                });
                                storesList = destinctArray;
                                //console.log(storesList);
                                //console.log(expoList);
                                if (_store != "") {
                                    underscore.filter(storesList, function (store) {
                                        if (store.Type == "store") {
                                           // console.log(store.Name+store.Name.indexOf(_store));
                                            if ((store.Name.indexOf(_store) !== -1 || store.Description.indexOf(_store) !== -1 || store.Address.indexOf(_store) !== -1)) {
                                                finalList.push(store);
                                            }
                                        }
                                    })
                                    //console.log(finalList);
                                    //console.log(expoList);
                                }
                                if (_keyWord != "") {
                                    underscore.filter(expoList, function (expo) {
                                        if (expo.Title.indexOf(_keyWord) !== -1) {
                                            finalList.push(expo);
                                        }
                                    })
                                   // console.log(finalList);
                                    underscore.filter(storesList, function (store) {
                                        if ((store.Name.indexOf(_keyWord) !== -1 || store.Description.indexOf(_keyWord) !== -1 || store.Address.indexOf(_keyWord) !== -1)) {
                                            finalList.push(store);
                                    Item.find({ $and: [{ $or: [{ 'Name': { "$regex": _keyWord, "$options": "i" } }, { 'Description': { "$regex": _keyWord, "$options": "i" } }] }, { 'Status': 'Active' }, {'Store':store._id}] }, '_id Name Pictures',function (err, itemLst) {
                                                    if (err)
                                                        reject({
                                                            code: 1,
                                                            data: err
                                                        });
                                                    else {
                                                        if (itemLst.length > 0) {
                                                            console.log("push");
                                                            underscore.each(itemLst,function(item){
                                                                finalList.push({ "_id": item._id, "Name": item.Name, "Pictures": item.Pictures, "Type": "item" });
                                                            })
                                                        }
                                                        console.log(finalList);
                                                    }
                                                })
                                            }
                                    })
                                }
                                
                            }
                        }
                    })
                }
            })
        })
    },
}