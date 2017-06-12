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
             itemsLst = [],
             expoLst = [],
         arrayOfIds = [],
         storesOfItems = [];
        storesLst = [];
        var underscore = require("underscore");
        return new Promise(function (resolve, reject) {
            var filter = { 'Country': { "$regex": _country, "$options": "i" }, 'Status': 'Active', 'Type': 'store' };
            if (_country == "")
                filter = { 'Status': 'Active', 'Type': 'store' };
            var expoFilter = { 'Title': { "$regex": _expo, "$options": "i" }, 'Status': 'Active' };
            if (_expo == "")
                expoFilter = { 'Status': 'Active' };
            Schema.find(filter, '_id Name ProfilePicture Description Address Status', function (err, lst) {//Pictures
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (lst.length > 0) {
                        underscore.each(lst, function (store) { storesLst.push(store) });
                    }
                    Expo.find(expoFilter, 'Floors Title Banner').populate('Floors.Stores.Store', '_id Name ProfilePicture Description Address Status').exec(function (err, lst) {
                        if (err)
                            reject({
                                code: 1,
                                data: err
                            });
                        else {
                            if (lst.length > 0) {
                                underscore.each(lst, function (expo) { expoLst.push({ "_id": expo._id, "Title": expo.Title, "Banner": expo.banner, "Type": "expo" }) });
                                underscore.each(lst, function (expo) {
                                    underscore.each(expo.Floors, function (floor) {
                                        underscore.each(floor.Stores, function (store) {
                                            if (store.Store.Status == "Active") {
                                                storesLst.push(store.Store);
                                            }
                                        })
                                    })
                                })
                                var destArray = underscore.uniq(storesLst, function (x) {
                                    return x.Name;
                                });
                                storesLst = destArray;
                                
                                if (_store != "") {
                                    underscore.filter(storesLst, function (store) {
                                        if (store.Name.indexOf(_store) !== -1 || store.Description.indexOf(_store) !== -1 || store.Address.indexOf(_store) !== -1) {
                                            finalList.push({ "_id": store._id, "Name": store.Name, "ProfilePicture": store.ProfilePicture, "Type": "store" });
                                            storesOfItems.push({ "_id": store._id });
                                        }
                                    })
                                    var destArray = underscore.uniq(finalList, function (x) {
                                        return x.Name;
                                    });
                                    finalList = destArray;
                                }
                                
                                

                                if (_keyWord != "") {
                                    underscore.filter(storesLst, function (store) {
                                        if (store.Name.indexOf(_keyWord) !== -1 || store.Description.indexOf(_keyWord) !== -1 || store.Address.indexOf(_keyWord) !== -1) {
                                            finalList.push({ "_id": store._id, "Name": store.Name, "ProfilePicture": store.ProfilePicture, "Type": "store" });
                                            Item.find({ 'Status': 'Active' }, { 'Name': { "$regex": _keyWord, "$options": "i" } }, { 'Description': { "$regex": _keyWord, "$options": "i" } }, '_id Name Pictures Gallery').populate('Gallery', 'Store').exec(function (err, lst) {
                                                if (err)
                                                    reject({
                                                        code: 1,
                                                        data: err
                                                    });
                                                else {
                                                    if (lst.length > 0) {
                                                        underscore.filter(lst, function (item) {
                                                            console.log(item.Gallery.Store);
                                                            if (item.Gallery.Store == store._id)
                                                                finalList.push({ "_id": item._id, "Name": item.Name, "Pictures": item.Pictures, "Type": "item" });
                                                        })




                                                        //underscore.filter(lst, function (item) {
                                                        //    console.log(item.Gallery.Store);

                                                        //    if (arrayOfIds.includes(item.Gallery.Store)) {
                                                        //        itemsLst.push(item);
                                                        //    }
                                                        //    console.log(itemsLst);
                                                        //})
                                                    }
                                                    console.log(itemsLst);
                                                }
                                            })


                                        }
                                    })
                                    underscore.filter(expoLst, function (expo) {
                                        if (expo.Title.indexOf(_expo) !== -1) {
                                            finalList.push({ "_id": expo._id, "Title": expo.Title, "Banner": expo.Banner, "Type": "expo" });
                                        }
                                    })
                                    var destArray = underscore.uniq(finalList, function (x) {
                                        return x.Name;
                                    });
                                    finalList = destArray;
                                    console.log("final2" + JSON.stringify(finalList));
                                }


                                //underscore.groupBy(finalList, 'Type');
                                //console.log((underscore.groupBy(finalList, 'Type')).store);


                                //})
                                // }
                            }
                        }
                    })
                }
            })
            // resolve(storesLst);
        })
    },
}