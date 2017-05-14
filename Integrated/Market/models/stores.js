var Schema = require('./schema/store');
var Helper = require('./helper');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    register: function (_newstore) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Email': _newstore.Email }, { 'StoreName': _newstore.StoreName }] }, '', function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else {
                    if (Obj) 
                        reject("This email or store name already exist");
                    else {
                        _newstore.save(function (err, _newstore) {
                            if (err)
                                reject('1:' + err);
                            else
                                resolve(_newstore);
                        })
                    }
                }
            })

        })
    },
    login: function (_newstore) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $and: [{ 'Email': _newstore.Email }, { 'Password': _newstore.Password }] }, '', function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else if (!Obj) 
                    reject("This email or password incorrect");
                else if (Obj.Status == "Unconfirmed") 
                    reject("This account not confirmed yet");
                else if (Obj.Status == "Suspend") 
                    reject("This account suspended");
                else if (Obj.Status == "Active") 
                    resolve("Successful login");
            })
        })
    },
    editProfile: function (_id,_oldpassword,_newpassword,_email,_city,_address,_country,_description,_imgs) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id }, '', function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else {
                    Obj.Email = _email;
                    Obj.City = _city;
                    Obj.Address = _address;
                    Obj.Country = _country;
                    Obj.Description = _description;
                    if(_imgs)
                    Obj.Imgs=_imgs;
                    if (_newpassword != "")
                        Obj.Password = _newpassword;
                    else
                        Obj.Password = _oldpassword;
                    Obj.save(function (err, Obj) {
                        if (err)
                            reject('1:' + err);
                        else 
                            resolve("Your profile updated successfully");
                    })
                }
            });
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id }, '', function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else {
                    if (Obj) 
                        resolve(Obj);
                    else 
                        reject("This filteration didn't resulted in any data");
                }
            })
        })
    },
}