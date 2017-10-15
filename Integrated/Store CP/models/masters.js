var Schema = require('./models/user');
module.exports = {
    //added for test
    register: function (_newMaster) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Email': {$regex: new RegExp('^' + _newMaster.Email+"$" , 'i')} }, { 'Name': {$regex: new RegExp('^' + _newMaster.Name+"$" , 'i')} }] }, '', function (err, Obj) {
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
                        Helper.uploadImage(_newMaster.ProfilePicture, function (_url) {
                            _newMaster.ProfilePicture = _url;
                            _newMaster.save(function (err, _newmaster) {
                                if (err)
                                    reject({
                                        code: 1,
                                        data: err
                                    });
                                else {
                                    resolve({
                                        code: 100,
                                        data: { _id: _newmaster._id, Name: _newmaster.Name, Type: _newmaster.Type }
                                    });
                                }
                            })
                        })
                    }
                }
            })

        })
    },
    login: function (_master) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $and: [{ 'Email': {$regex: new RegExp('^' + _master.Email+"$" , 'i')} }, { 'Password': {$regex: new RegExp('^' + _master.Password+"$" , 'i')} }, { 'Type': 'master' }] }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else if (!Obj)
                    reject({
                        code: 21,
                        data: "This email or password is incorrect"
                    });
                else if (Obj.Status == "Suspended")
                    reject({
                        code: 22,
                        data: "This account is suspended"
                    });
                else if (Obj.Status == "Deleted")
                    reject({
                        code: 23,
                        data: "This account is  deleted"
                    });
                else 
                    resolve({
                        code: 100,
                        data: { _id: Obj._id, Name: Obj.Name, Type: Obj.Type, ProfilePicture: Obj.ProfilePicture }
                    });
            })
        })
    },
}
