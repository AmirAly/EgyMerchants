var Schema = require('./models/user');
var Helper = require('./helper');
module.exports = {
    //added for test
    register: function (_newMaster) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Email': _newMaster.Email }, { 'Name': _newMaster.Name }] }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj)
                        reject({
                            code: 21,
                            data: "This email or name already exist"
                        });
                    else {
                        _newMaster.Type = 'master';
                        _newMaster.save(function (err, _newMaster) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else {
                                resolve({
                                    code: 100,
                                     data: { _id: _newMaster._id, Name: _newMaster.Name, Type: _newMaster.Type }
                                });
                            }
                        })
                    }
                }
            })

        })
    },
    login: function (_master) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $and: [{ 'Email': _master.Email }, { 'Password': _master.Password }, { 'Type': 'master' }] }, '', function (err, Obj) {
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
}
