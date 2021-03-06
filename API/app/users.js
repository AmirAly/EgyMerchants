var Schema = require('./models/user');
var Helper = require('./helper');
var nodemailer = require('nodemailer')
module.exports = {
    register: function (_newUser) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Email': { $regex: new RegExp('^' + _newUser.Email + "$", 'i') } }] }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj) {
                        reject({
                            code: 21,
                            data: "This email already exist"
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
                                    var link = " https://egym.herokuapp.com/User/SetToActive/" + _newuser._id;
                                    var data = {
                                        to: _newUser.Email,
                                        subject: "Please confirm your e-mail address ",
                                        html: 'Dear ' + _newuser.Name + '<br />' +
                                            'Welcome to EgyMerchants' + '<br />' +
                                            ' You are almost ready to start interacting with our web site...' + '<br />'
                                            + '  Please confirm your email address by clicking the link below' + '<br />' +
                                            '<a href=' + link + '>Confirm your e-mail</a>' + '<b> Then relogin with your data.</b>'
                                    }

                                    Helper.sendEmail(data);

                                    resolve({
                                        code: 100,
                                        data: { _id: _newuser._id, Name: _newuser.Name, Type: _newuser.Type, Email: _newuser.Email, Status: _newuser.Status }
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
            Schema.findOne({ $and: [{ 'Email': { $regex: new RegExp('^' + _user.Email + "$", 'i') } }, { 'Password': { $regex: new RegExp('^' + _user.Password + "$", 'i') } }] }, '_id Name Type FavouriteItems VisitedStores ProfilePicture Rate.Store Status', function (err, Obj) {
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
                else
                    resolve({
                        code: 100,
                        data: Obj
                    });

            })
        })
    },
    editProfile: function (_id, _name, _profilePicture) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Name': { $regex: new RegExp('^' + _name + "$", 'i') } }], '_id': { $ne: _id } }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj) {

                        reject({
                            code: 21,
                            data: "This name already exists"
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
    addToFavourites: function (_userId, _itemId) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ "_id": _userId, "Status": "Active" }, { $addToSet: { FavouriteItems: _itemId } }, { new: true, fields: '_id Name Type FavouriteItems VisitedStores ProfilePicture Rate.Store Status' }, function (err, Obj) {
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
            Schema.findOneAndUpdate({ "_id": _userId, "Status": "Active" }, { $pull: { FavouriteItems: _itemId } }, { new: true, fields: '_id Name Type FavouriteItems VisitedStores ProfilePicture Rate.Store Status' }, function (err, Obj) {
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
            Schema.findOneAndUpdate({ "_id": _userId }, { $addToSet: { VisitedStores: _storeId } }, { new: true, fields: '_id Name Type FavouriteItems VisitedStores ProfilePicture Rate.Store Status' }, function (err, Obj) {
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
            Schema.findOne({ "_id": _userId, "Status": "Active" }, 'FavouriteItems').populate('FavouriteItems', { Name: 1, Pictures: { $slice: 1 } }).exec(function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
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
                            data: "This user doesn't exist"
                        });
                }
            })
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id }, { "Password": 0 }, function (err, Obj) {
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
    },

    setToActive: function (_userId) {
        return new Promise(function (resolve, reject) {

            Schema.findOneAndUpdate({ "_id": _userId }, { $set: { 'Status': 'Active' } }, { new: true }, function (err, Obj) {

                if (err) {
                    reject({
                        code: 1,
                        data: err
                    });
                }
                else {
                    resolve({
                        code: 100,
                        data: Obj
                    });

                }
            });
        })
    },

    addRating: function (_storeId, _userId, _value) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ "_id": _storeId, "Rate.User": _userId }, function (err, _obj) {
                if (err)
                    reject({ code: 1, data: err })
                else if (_obj) {
                    resolve({ code: 21, data: "You can't rate twice" });
                }
                else {

                    Schema.findOne({ "_id": _storeId }, function (err, _store) {
                        if (err)
                            reject({ code: 1, data: err });
                        else {
                            var _userObject = { "User": _userId, "Value": _value };
                            _store.Rate.push(_userObject);
                            _store.save(function (err, _result) {
                                if (err)
                                    reject({ code: 1, data: err });
                                else {

                                    var sum = [];
                                    var constant = 0;


                                    for (var i = 0; i < _store.Rate.length; i++) {


                                        sum = (_store.Rate[i].Value);

                                        constant += sum;
                                    }


                                    var average = constant / _store.Rate.length;
                                    average = average.toFixed(1);


                                    resolve({ code: 100, data: average });


                                }
                            })
                        }

                    });
                }

            });
        });

    },
    contactUs: function (_name, _phone, _mail, _comment) {
        return new Promise(function (resolve, reject) {
            var myPhone = _phone;
            if (myPhone.length > 0) {
                myPhone = _phone;
            }
            else {
                myPhone = "____";
            }

            var smtpTransport = nodemailer.createTransport({
                transport: "SMTP",
                host: "smtp.gmail.com",
                secureConnection: false,
                port: 587,
                requiresAuth: true,
                auth: {
                    user: 'appoutcompany@gmail.com',
                    pass: 'appout123'
                }
            });
            var mailOptions = {
                to: "ahmedelmonshareh@gmail.com",
                subject: "This is a message from" + " " + _name,
                html: `Name : ${_name}` + "<br/>" +
                    `Email : ${_mail}` + "<br/>" +
                    `Phone : ${myPhone}` + "<br/>" +
                    `Comment : ${_comment}`
            }
            smtpTransport.sendMail(mailOptions, function (err, response) {
                if (err) {
                    reject({ code: 1, data: err });
                }
                else
                    resolve({ code: 100, data: "mail sent successfully" });
            });


        });
    }
};
