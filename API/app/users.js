var Schema = require('./models/user');
var Helper = require('./helper');

module.exports = {
    register: function (_newUser) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ 'Email': _newUser.Email }, '', function (err, Obj) {
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
                        _newUser.save(function (err, Obj) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                })
                            else {
                                var email = {
                                    to: _newUser.Email,
                                    subject: "confirm your email",
                                    html: '<a href="http://localhost:8007/User/Confirm/"+_newUser._id>"please click this link to confirm your email"</a>'
                                };
                                Helper.sendEmail(email);
                                resolve({
                                    code: 100,
                                    data: { _id: _newUser._id }
                                })
                            }
                        });
                    }
                }
            })
        })
    },
    ConfirmMail: function (_id) {
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
    login: function (_user) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $and: [{ 'Email': _user.Email }, { 'Password': _user.Password }] }, '', function (err, Obj) {
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
                        data: { _id: Obj._id }
                    });
            })
        })
    },
    editProfile: function (_id, _oldPassword, _newPassword, _email, _displayName, _profilePicture) {
        return new Promise(function (resolve, reject) {
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
                        if (_newPassword != "")
                            Obj.Password = _newPassword;
                        else
                            Obj.Password = _oldPassword;
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
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                    }
                }
            });
        })
    },
}
