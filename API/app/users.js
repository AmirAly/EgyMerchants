var Schema = require('./models/user');
var Helper = require('./helper');
module.exports = {
    register: function (_newUser) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Email': {$regex: new RegExp('^' + _newUser.Email+"$" , 'i')} }, { 'Name':  {$regex: new RegExp('^' + _newUser.Name+"$" , 'i')} }] }, '', function (err, Obj) {
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
                        Helper.uploadImage(_newUser.ProfilePicture, function (_url) {
                            _newUser.ProfilePicture = _url;
                            _newUser.save(function (err, _newuser) {
                                    if (err)
                                        reject({
                                            code: 1,
                                            data: err
                                        });
                                    else {
                                        resolve({
                                            code: 100,
                                            data: { _id: _newuser._id, Name: _newuser.Name, Type: _newuser.Type }
                                        });
                                    }
                                })
                            })
                    }
                }
            })
        })
    },
    login: function (_user) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $and: [{ 'Email':{$regex: new RegExp('^' + _user.Email+"$" , 'i')} }, { 'Password':{$regex: new RegExp('^' + _user.Password+"$" , 'i')}}] }, '', function (err, Obj) {
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
                else if (Obj.Status == "Suspended")
                    reject({
                        code: 22,
                        data: "This account is suspended "
                    });
                else if (Obj.Status == "Deleted")
                    reject({
                        code: 23,
                        data: "This account is deleted"
                    });
                else if (Obj.Status == "Active")
                    resolve({
                        code: 100,
                        data: { _id: Obj._id, Name: Obj.Name, Type: Obj.Type, FavouriteItems: Obj.FavouriteItems, VisitedStores: Obj.VisitedStores, ProfilePicture: Obj.ProfilePicture}
                    });
            })
        })
    },
    editProfile: function (_id, _email, _name, _profilePicture) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Email': {$regex: new RegExp('^' + _email+"$" , 'i')} }, { 'Name': {$regex: new RegExp('^' + _name+"$" , 'i')}}] , '_id': { $ne: _id }}, '', function (err, Obj) {
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
                        Obj.Name = _name;
                        Helper.uploadImage(_profilePicture, function (_url) {
                            Obj.ProfilePicture = _url;
                            Obj.save(function (err, _newuser) {
                                    if (err)
                                        reject({
                                            code: 1,
                                            data: err
                                        });
                                    else {
                                        resolve({
                                            code: 100,
                                            data: "Your profile is updated successfully"
                                        });
                                    }
                                })
                            })
                    }
                    else 
                        reject({
                            code: 21,
                            data: "No results"
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
            Schema.findOneAndUpdate({ "_id": _userId, "Status": "Active" }, { $addToSet: { FavouriteItems: _itemId } }, { new: true, fields: '_id Name Type FavouriteItems VisitedStores ProfilePicture' }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj)
                        resolve({
                            code: 100,
                            data: Obj
                        });
                    else
                        reject({
                        code: 21,
                        data: "No results"
                    });
                }
            })
        })
    },
    removeFromFavourites: function (_userId, _itemId) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ "_id": _userId, "Status": "Active" }, { $pull: { FavouriteItems: _itemId } }, { new: true, fields: '_id Name Type FavouriteItems VisitedStores ProfilePicture' }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj)
                        resolve({
                            code: 100,
                            data: Obj
                        });
                    else
                        reject({
                            code: 21,
                            data: "No results"
                        });
                }
            })
        })
    },
    addToVisited: function (_userId, _storeId) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ "_id": _userId, "Status": "Active" }, { $addToSet: { VisitedStores: _storeId } }, { new: true, fields: '_id Name Type FavouriteItems VisitedStores ProfilePicture' }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj)
                        resolve({
                            code: 100,
                            data: Obj
                        });
                    else
                        reject({
                            code: 21,
                            data: "No result"
                        });
                }
            })
        })
    },
    getFavourites: function (_userId) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ "_id": _userId, "Status": "Active" }, 'FavouriteItems').populate('FavouriteItems',{Name:1, Pictures: { $slice: 1 }}).exec(function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj){
                        resolve({
                            code: 100,
                            data: Obj
                        });
                    }
                    else
                        reject({
                            code: 21,
                            data: "This user doesn't exist"
                        });
                }
            })
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id,'Status': 'Active' }, { "Password": 0 }, function (err, Obj) {
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
                            data: "No results"
                        });
                }
            })
        })
    }
}
