var Schema = require('./models/user');
var Helper = require('./helper');

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
                        data: { _id: Obj._id,Name:Obj.Name,Type:Obj.Type }
                    });
            })
        })
    },
    editProfile: function (_id, _email, _displayName, _profilePicture) {
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
