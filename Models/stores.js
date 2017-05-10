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
                        if (_newstore.Imgs)
                        {
                            for (i = 0; i < _newstore.Imgs.length; i++) {
                                var Uploadedimg = Helper.postFile(_newstore.Imgs[i].URL, _newstore._id+i+".png");
                                _newstore.Imgs[i].URL = CDN + "egmpre/" + _newstore._id + i+".png";
                            }
                        }
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
                    reject("this email or password incorrect");
                else if (Obj.Status == "Unconfirmed") 
                    reject("this account not confirmed yet");
                else if (Obj.Status == "Suspend") 
                    reject("this account suspended");
                else if (Obj.Status == "Active") 
                    resolve("successful login");
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
                    if (_newpassword != "")
                        Obj.Password = _newpassword;
                    else
                        Obj.Password = _oldpassword;
                    if (_imgs) {
                        for (i = 0; i < _imgs.length; i++) {
                            var Uploadedimg = Helper.postFile(_imgs[i].URL, _id + i + ".png");
                            _imgs[i].URL = CDN + "egmpre/" + _id+i + ".png";
                        }
                    }
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
    }
}