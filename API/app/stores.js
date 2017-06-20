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
    editProfile: function (_id, _email, _city, _address, _country, _description, _imgs, _profilePicture) {
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
            storesList = [],
            result = [],
         filteredList = [],
            expoList = [];
        var underscore = require("underscore");
        return new Promise(function (resolve, reject) {
            var filter = { 'Country': { "$regex": _country, "$options": "i" }, 'Status': 'Active', 'Type': 'store' };
            if (_country == "all")
                filter = { 'Status': 'Active', 'Type': 'store' };
            var expoFilter = { 'Title': { "$regex": _expo, "$options": "i" }, 'Status': 'Active' };
            if (_expo == "all")
                expoFilter = { 'Status': 'Active' };
            Schema.find(filter, '_id Name ProfilePicture  Description Address Status Type', function (err, lst) {
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
                                underscore.each(lst, function (expo) {
                                    expoList.push({ "_id": expo._id, "Title": expo.Title, "Banner": expo.banner, "Type": "expo" });
                                })
                                if (_expo !== "all") {
                                    if (_country == "all") {
                                        storesList.length = 0;
                                    }
                                    underscore.each(lst, function (expo) {
                                        underscore.each(expo.Floors, function (floor) {
                                            underscore.each(floor.Coordinates, function (store) {
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
                                if (_store != "all") {
                                    underscore.filter(storesList, function (store) {
                                            if ((store.Name.indexOf(_store) !== -1 || store.Description.indexOf(_store) !== -1 || store.Address.indexOf(_store) !== -1)) {
                                                filteredList.push(store);
                                            }
                                    })
                                }
                                if (_keyWord != "all") {
                                    if (_store != "all") {
                                        underscore.filter(storesList, function (store) {
                                            if ((store.Name.indexOf(_store) !== -1 || store.Description.indexOf(_store) !== -1 || store.Address.indexOf(_store) !== -1)) {
                                                filteredList.push(store);
                                            }
                                         })
                                    }
                                    else { filteredList = storesList; }
                                    underscore.filter(expoList, function (expo) {
                                        if (expo.Title.indexOf(_keyWord) !== -1) {
                                            finalList.push(expo);
                                        }
                                    })
                                    underscore.filter(filteredList, function (store) {
                                        if ((store.Name.toLowerCase().indexOf(_keyWord) !== -1 || store.Description.toLowerCase().indexOf(_keyWord) !== -1 || store.Address.toLowerCase().indexOf(_keyWord) !== -1)) {
                                            finalList.push(store);
                                            
                                    Item.find({ $and: [{ $or: [{ 'Name': { "$regex": _keyWord, "$options": "i" } }, { 'Description': { "$regex": _keyWord, "$options": "i" } }] }, { 'Status': 'Active' }, {'Store':store._id}] }, '_id Name Pictures',function (err, itemLst) {
                                                    if (err)
                                                        reject({
                                                            code: 1,
                                                            data: err
                                                        });
                                                    else {
                                                        if (itemLst.length > 0) {
                                                            underscore.each(itemLst, function (item) {
                                                                finalList.push({ "_id": item._id, "Name": item.Name, "Pictures": item.Pictures, "Type": "item" });
                                                            })
                                                        }
                                                        
                                                    }
                                                })
                                        }
                                    })
                                }
                            }

                        }
                    })
                    underscore.delay(function () {
                        var destinctResult = underscore.uniq(finalList, function (x) {
                            return (x._id).toString();
                        });
                        if (_keyWord !== "all") {
                            result = destinctResult;
                        }
                        else if (_store !== "all") {
                            if (_expo !== "all") 
                                result = filteredList.concat(expoList);
                           else
                            result = filteredList
                        }
                        else {
                            if (_expo !== "all") {result = storesList.concat(expoList); }
                            else
                                result = storesList;
                        }
                    },9999);
                    underscore.delay(function () {
                        if (result.length > 0) {
                              resolve({ code: 100, data: underscore.groupBy(result, 'Type') });
                        }
                        else { reject({ code: 21, data: "This filteration didn't result in any data" }) 
                        }
                    },10000);
                }
            })
        })
    },
    search2: function (_store, _expo, _keyWord, _country) {
        var finalList = [],
            expoList = [],
            result=[],
            itemsList=[],
            storesList = [];
        var _ = require("underscore");
        var filter = { 'Country': { "$regex": _country, "$options": "i" }, 'Status': 'Active', 'Type': 'store' };
        if (_country == "")
            filter = { 'Status': 'Active', 'Type': 'store' };
        var expoFilter = { 'Title': { "$regex": _expo, "$options": "i" }, 'Status': 'Active' };
        if (_expo == "")
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
                        //console.log("strcoun"+storesList)
                    }
                    Expo.find(expoFilter, 'Floors Title Banner').populate('Floors.Coordinates.Store', '_id Name ProfilePicture Description Address Status Type').exec(function (err, lst) {
                        if (err)
                            reject({
                                code: 1,
                                data: err
                            });
                        else {
                            if (lst.length > 0) {
                            expoList=_.map(lst,function(item){
                                return _.pick(_.extend({}, expo, { Type: "expo" }), '_id', 'Title', 'Banner','Type'); 
                            })
                                if (_expo !== "") {
                                    if (_country == "") {
                                        storesList.length = 0;
                                    }
                                    _.each(lst, function (expo) {
                                        _.each(expo.Floors, function (floor) {
                                            _.each(floor.Coordinates, function (store) {
                                                if (store.Store.Status == "Active") storesList.push(store.Store);
                                            })
                                        })
                                    })
                                }
                                var destinctArray = _.uniq(storesList, function (x) {
                                    return (x._id).toString();
                                })
                                storesList = destinctArray;
                                if (_store != "") {
                                    finalList = _.filter(storesList, function (store) {
                                        return (store.Name.indexOf(_store) !== -1 || store.Description.indexOf(_store) !== -1 || store.Address.indexOf(_store) !== -1) 
                                    })
                                   // storesList = finalList;
                                  //  finalList.length = 0;
                                }
                                if (_keyWord != "") {
                                    //console.log(storesList);
                                    Item.find({ $and: [{ $or: [{ 'Name': { "$regex": _keyWord, "$options": "i" } }, { 'Description': { "$regex": _keyWord, "$options": "i" } }] }, { 'Status': 'Active' }] }, '_id Name Pictures', function (err, itemLst) {
                                        if (err)
                                            reject({
                                                code: 1,
                                                data: err
                                            });
                                        else {
                                            if (itemLst.length > 0) {itemsList=_.map(itemLst, function (item) {
                                                return _.pick(_.extend({}, item, { Type: "item" }), '_id', 'Name', 'Pictures','Type'); })
                                            }
                                            }
                                        })
                                    finalList = _.filter(expoList, function (expo) {
                                        return (expo.Title.indexOf(_keyWord) !== -1) 
                                    })
                                  
                                   finalList= _.filter(storesList, function (store) {
                                        return (store.Name.indexOf(_keyWord) !== -1 || store.Description.indexOf(_keyWord) !== -1 || store.Address.indexOf(_keyWord) !== -1)
                                    })
//                                    _.map(
//    _.where(storesList, Name.indexOf(_keyWord) !== -1 || Description.indexOf(_keyWord) !== -1 || Address.indexOf(_keyWord) !== -1),
//    function(store) {
        
//    }
//);
                                    _.each(storesList, function (store) {
                                        if (store.Name.indexOf(_keyWord) !== -1 || store.Description.indexOf(_keyWord) !== -1 || store.Address.indexOf(_keyWord) !== -1){finalList.push(store);
                                        Item.find({ $and: [{ $or: [{ 'Name': { "$regex": _keyWord, "$options": "i" } }, { 'Description': { "$regex": _keyWord, "$options": "i" } }] }, { 'Status': 'Active' }, { 'Store': store._id }] }, '_id Name Pictures', function (err, itemLst) {
                                            if (err)
                                                reject({
                                                    code: 1,
                                                    data: err
                                                });
                                            else {
                                                if (itemLst.length > 0) {
                                                    finalList = _.map(itemLst, function (item) {
                                                        return _.pick(_.extend({}, item, { Type: "item" }), '_id', 'Name', 'Pictures','Type');
                                                    });
                                                    //console.log(finalList);
                                                }

                                            }
                                        })
                                    }
                                    })
                                }

                            }
                        }
                        var destinctResult = _.uniq(finalList, function (x) {
                            return (x._id).toString();
                        });
                        if ((_store !== "" && _keyWord !== "") || _keyWord !== "") {
                            result = destinctResult;
                        }
                        else if (_store !== "") {
                            if (_expo !== "") {
                                result = destinctResult.concat(expoList);
                            }
                            else
                                result = destinctResult
                        }
                        else {
                            if (_expo !== "") { result = storesList.concat(expoList); }
                            else
                                result = storesList;
                        }
                        if (result.length > 0) {
                            resolve({ code: 100, data: _.groupBy(result, 'Type') });
                        }
                        else {
                            reject({ code: 21, data: "This filteration didn't result in any data" })
                        }
                    })
                }
            })
        })
    },
}