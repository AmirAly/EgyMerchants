var Schema = require('./models/user');
module.exports = {
    register: function (_newUser) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Email': _newUser.Email }, { 'Name': _newUser.Name }] }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj) {
                        reject({
                            code: 21,
                            data: "This email or name already exist"
                        });
                    }
                    else {
                        _newUser.Type = 'user';
                        _newUser.save(function (err, Obj) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                })
                            else {
                                resolve({
                                    code: 100,
                                    data: { _id: _newUser._id, Name: Obj.Name, Type: Obj.Type }
                                })
                            }
                        });
                    }
                }
            })
        })
    },
    login: function (_user) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $and: [{ 'Email': _user.Email }, { 'Password': _user.Password }, { 'Type': 'user' }] }, '', function (err, Obj) {
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
                        data: { _id: Obj._id, Name: Obj.Name, Type: Obj.Type, FavouriteItems: Obj.FavouriteItems, VisitedStores: Obj.VisitedStores, ProfilePicture: Obj.ProfilePicture}
                    });
            })
        })
    },
    editProfile: function (_id, _email, _displayName, _profilePicture) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Email': _email }, { 'Name': _displayName }] , '_id': { $ne: _id }}, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj) {
                        reject({
                            code: 21,
                            data: "This email or name already exist"
                        });
                    }
                    else {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        Obj.Email = _email;
                        Obj.DisplayName = _displayName;
                        if (_profilePicture)
                            Obj.ProfilePicture = _profilePicture;
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
                    else 
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                    }
                })
                }
            }
    })
        })
    },
    addToFavourites: function (_userId,_itemId) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ "_id": _userId, "Status": "Active" }, { $addToSet: { FavouriteItems: _itemId }}, { new: true }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj)
                        resolve({
                            code: 100,
                            data: "This item added to your favourites"
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
    removeFromFavourites: function (_userId, _itemId) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ "_id": _userId, "Status": "Active" }, { $pull: { FavouriteItems: _itemId } }, { new: true }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj)
                        resolve({
                            code: 100,
                            data: "This item deleted from your favourites"
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
    addToVisited: function (_userId, _storeId) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ "_id": _userId, "Status": "Active" }, { $addToSet: { VisitedStores: _storeId } }, { new: true }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj)
                        resolve({
                            code: 100,
                            data: "This store added to your visited stores"
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
    getFavourites: function (_userId) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ "_id": _userId, "Status": "Active" }, 'FavouriteItems').populate('FavouriteItems','Name Pictures').exec(function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj){
                    if(Obj.FavouriteItems.length)
                        resolve({
                            code: 100,
                            data: Obj
                        });
                    else
                        reject({
                            code: 22,
                            data: "There is no favourite items for you"
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
    }
}
