var Schema = require('./models/user');
var Product = require('./models/item');
var Gallery = require('./models/gallery');
var Expo = require('./models/expo');
var Item = require('./models/item');
var Category = require('./models/category');
var Helper = require('./helper');
var _ = require("underscore");

module.exports = {
    register: function (_newStore) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Email': _newStore.Email }, { 'Name': _newStore.Name }] } , '', function (err, Obj) {
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
                            Helper.uploadImage(_newStore.ProfilePicture, function (_url) {
                                _newStore.ProfilePicture = _url;
                                Helper.uploadImage(_newStore.CoverPhoto, function (_url) {
                                    _newStore.CoverPhoto = _url;
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
                                })
                            })
                    }
                }
            })

        })
    },
    login: function (_store) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $and: [{ 'Email': _store.Email }, { 'Password': _store.Password }, { 'Type': 'store' }, {'Status':'Active'}] }, '', function (err, Obj) {
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
                else if (Obj.Status == "deleted")
                    reject({
                        code: 23,
                        data: "This account deleted"
                    });
                else if (Obj.Status == "Active")
                    resolve({
                        code: 100,
                        data: { _id: Obj._id, Name: Obj.Name, Type: Obj.Type, ProfilePicture: Obj.ProfilePicture }
                    });
            })
        })
    },
    editProfile: function (_id, _email, _city, _address, _country, _description, _imgs, _profilePicture, _coverPhoto) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ 'Email': _email, '_id': { $ne: _id } }, '', function (err, Obj) {
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
                                        Obj.CoverPhoto = "";
                                        Obj.ProfilePicture = "";
                                        Obj.Email = _email;
                                        Obj.City = _city;
                                        Obj.Address = _address;
                                        Obj.Country = _country;
                                        Obj.Description = _description;
                                            Helper.uploadImage(_profilePicture, function (_url) {
                                                Obj.ProfilePicture = _url;
                                                    Helper.uploadImage(_coverPhoto, function (_url) {
                                                        Obj.CoverPhoto = _url;
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
                                                    })
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
    setAdminNotifications: function (_id, _notifications) {
        return new Promise(function (resolve, reject) {
            var i = 0;
            _.each(_notifications, function (notification) {
                            Schema.findOneAndUpdate({ "_id": _id, 'AdminNotifications._id': notification._id }, { $set: { 'AdminNotifications.$.Status':true} }, function (err, Obj) {
                                if (err)
                                    reject({ code: 1, data: err })
                                else {
                                    i++;
                                    if ( i== _notifications.length)
                                        resolve({
                                            code: 100,
                                            data: "Admin notifications updated successfully"
                                        });
                                }
                            })
                        })
        })
    },
    getAdminNotifications: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ "_id": _id, "Status": "Active"}, 'AdminNotifications', function (err, Obj) {
                    if (err)
                        reject({ code: 1, data: err })
                    else {
                        if (Obj)
                        {
                           var result= _.filter(Obj.AdminNotifications, function (notification) {
                                return(notification.Status==false)
                            })
                            resolve({
                                code: 100,
                                data: { 'AdminNotifications': result }
                            });
                            }
                        else reject({code:21,data:"This store not exist"})
                    }
                })
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id,'Type':'store', 'Status': 'Active' }, { "Password": 0 }, function (err, Obj) {
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
    remove: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id': _id }, { $set: { 'Status': "deleted" } }, { new: true }, function (err, Obj) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if (Obj) {
                        Gallery.updateMany({ "Store": _id }, { $set: { Status: "deleted" } }).exec(function (err, lst) {
                            if (err)
                                reject({
                                    code: 3,
                                    data: err
                                })
                        })
                        Item.updateMany({ "Store": _id }, { $set: { Status: "deleted" } }).exec(function (err, lst) {
                            if (err)
                                reject({
                                    code: 4,
                                    data: err
                                })
                        })
                        Expo.find({ 'Status': 'Active', 'Floors.Coordinates.Store': _id }, function (err, allexpoes) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else {
                                if (allexpoes.length) {
                                      var coordinatesfiltered = [];
                                        //added to determine the last coordinate will updated so that used in if condition that resolve after ensure all updates finished
                                      _.each(allexpoes,function(expo){_.each(expo.Floors, function (floor) { _.each(floor.Coordinates, function (coordinate) { if (coordinate.Store ==_id) coordinatesfiltered.push(coordinate); }) })});
                                      _.each(allexpoes, function (expo) {
                                        _.each(expo.Floors, function (floor) {
                                            _.each(floor.Coordinates, function (coordinate) {
                                                if (coordinate.Store == _id) {
                                                    Expo.findOneAndUpdate({ '_id': expo._id, "Floors._id": floor._id },
                                                        { $pull: { 'Floors.$.Coordinates': { "_id": coordinate._id } } },function (err, data) {
                                                          if (err) { reject({ code: 2, data: err }) }
                                                          else {
                                                              //this if check to confirm that when resolve happen the data already updated in database
                                                              if (expo._id == allexpoes[allexpoes.length - 1]._id && coordinate._id == coordinatesfiltered[coordinatesfiltered.length - 1]._id)
                                                                  resolve({ code: 100, data: "This store deleted successfully" });
                                                          }
                                                      })
                                                }
                                            })
                                        })
                                    })
                                }
                                else { resolve({ code: 100, data: "This store deleted successfully" }); }
                            }
                        });

                    }
                    else
                        reject({ code: 21, data: "This store not exist" })
                }
            })
        })
    },
    suspend: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id': _id }, { $set: { 'Status': "suspended" } }, { new: true }, function (err, Obj) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if (Obj) {
                        Gallery.updateMany({ "Store": _id }, { $set: { Status: "suspended" } }).exec(function (err) {
                            if (err)
                                reject({
                                    code: 2,
                                    data: err
                                })
                            else
                            {
                                Item.updateMany({ "Store": _id }, { $set: { Status: "suspended" } }).exec(function (err) {
                                    if (err)
                                        reject({
                                            code: 3,
                                            data: err
                                        })
                                    else resolve({ code: 100, data: "This store suspended successfully" })
                                })
                            }
                        })
                    }
                    else
                        reject({ code: 21, data: "This store not exist" })
                }
            })
        })
    },
    active: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id': _id }, { $set: { 'Status': "Active" } }, { new: true }, function (err, Obj) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if (Obj){
                        Gallery.updateMany({ "Store": _id }, { $set: { Status: "Active" } }).exec(function (err) {
                            if (err)
                                reject({
                                    code: 2,
                                    data: err
                                })
                            else
                            {
                                Item.updateMany({ "Store": _id }, { $set: { Status: "Active" } }).exec(function (err) {
                                    if (err)
                                        reject({
                                            code: 3,
                                            data: err
                                        })
                                    else resolve({ code: 100, data: "This store activated successfully" })
                                })
                            }
                        })
                    }
                        
                    else
                        reject({ code: 21, data: "This store not exist" })
                }
            })
        })
    },
    getAll: function () {
        return new Promise(function (resolve, reject) {
            Schema.find({ $or: [{ 'Status': 'Active' }, { 'Status': 'suspended' }], 'Type': 'store' }, 'Name Description ProfilePicture Badges Category Status', function (err, lst) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                        resolve({ code: 100, data: lst })
                }
            })
        })
    },
    addAdminNotification:function(_id,_notification) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id': _id,'Type':'store','Status':'Active' }, { $addToSet: { AdminNotifications: _notification } }, { new: true }, function (err, Obj) {
                if(err)
                    reject({ code: 1, data: err })
                else
                    if(Obj)
                        resolve({ code: 100, data: "notification added successfully" })
                    else
                        reject({code:21,data:"This store not exist"})
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
                    Expo.find(expoFilter, 'Floors Title Banner Category').populate('Floors.Coordinates.Store', '_id Name ProfilePicture Description Address Status Type').exec(function (err, lst) {
                        if (err)
                            reject({
                                code: 1,
                                data: err
                            });
                        else {
                            if (lst.length > 0) {
                            expoList=_.map(lst,function(expo){
                                return _.pick(_.extend({}, expo, { Type: "expo" }), '_id', 'Title', 'Banner','Type','Category'); 
                            })
                            if (_expo != "all") {
                                        _.each(lst, function (expo) {
                                            _.each(expo.Floors, function (floor) {
                                                _.each(floor.Coordinates, function (store) {
                                                    if (store.Store.Status == "Active" && store.ExpiryDate >= new Date().getTime()) { expoStoresList.push(store.Store); };
                                                })
                                            })
                                        })
                                        var destinctArray = _.uniq(expoStoresList, function (x) {
                                            return (x._id).toString();
                                        })
                                        var intersect=[];
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
                                    
                                    if (_expo != "all") {finalList=finalList.concat(expoList) }
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
                                            else { finalList = finalList.concat(expoList)}
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