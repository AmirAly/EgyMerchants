var Schema = require('./models/country');
var Category = require('./models/category');
var CountriesInJson = require('./allcountries.json');
var _ = require("underscore");
var Helper = require('./helper');
module.exports = {
    add: function (_newCountry) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Name': _newCountry.Name, 'Status': 'Active' }, { 'IsoCode': _newCountry.IsoCode, 'Status': 'Active' }] }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        resolve({
                            code: 22,
                            data: "This country name or Isocode already exist"
                        });
                    }
                    else {
                        Helper.uploadImage(_newCountry.Flag, function (_url) {
                            _newCountry.Flag = _url;
                            _newCountry.save(function (err, _newcountry) {
                                if (err)
                                    reject({
                                        code: 2,
                                        data: err
                                    });
                                else
                                    resolve({
                                        code: 100,
                                        data: _newcountry
                                    });
                            })
                        })
                    }
                }
            })
        })
    },
    getAll: function () {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Status': 'Active' }, '', function (err, lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                        resolve({
                            code: 100,
                            data: lst
                        });
                }
            })
        })
    },
    edit: function (_id, _name, _flag, _isoCode, _welcomeMsg) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        Schema.findOne({ $or: [{ 'Name': _name }, { 'IsoCode': _isoCode }], 'Status': 'Active', '_id': { $ne: _id } }, '', function (err, Objexist) {
                            if (err)
                                reject({code: 2,data: err});
                            else {
                                if (Objexist)
                                    resolve({ code: 22, data: 'This country name or iso code already exist' })
                                else {
                                    Obj.Name = _name;
                                    Obj.IsoCode = _isoCode;
                                    Obj.WelcomeMsg = _welcomeMsg;
                                    Helper.uploadImage(_flag, function (_url) {
                                        Obj.Flag = _url;
                                        Obj.save(function (err, Obj) {
                                            if (err)
                                                reject({code: 3, data: err});
                                            else
                                                resolve({code: 100,data:"Country data edited successfully"})
                                        })
                                    })
                                }
                            }
                        })
                    }
                    else
                        reject({code: 21,data: "This country not exist any more"});
                }
            })
        })
    },
    remove: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Status': 'Active' }, '', function (err, lst) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if (lst.length > 0) {
                        if (lst.length == 1) resolve({ code: 22, data: "Sorry,you can't delete this last country" })
                        else {
                            Category.find({ 'Country': _id,"Status":"Active"}, '', function (err, lst) {
                                if (err)
                                    reject({ code: 2, data: err })
                                else {
                                    if (lst.length > 0) {
                                        Schema.findOneAndUpdate({ '_id': _id }, { $set: { 'Status': "deleted" } }, { new: true }, function (err, Obj) {
                                            if (err)
                                                reject({ code: 3, data: err })
                                            else {
                                                if (Obj) {
                                                    _.each(lst, function (category) {
                                                        Category.findOneAndUpdate({ '_id': category._id }, { $set: { 'Status': "deleted" } }, { new: true }, function (err, Obj) {
                                                            if (err)
                                                                reject({ code: 4, data: err })
                                                        })
                                                    })
                                                    resolve({
                                                        code: 100, data: "This country deleted successfuylly"
                                                    })
                                                }
                                                else
                                                    reject({ code: 21, data: "This country not exist" })
                                            }
                                        })
                                    }
                                    else {
                                        Schema.findOneAndRemove({ '_id': _id }, function (err, Obj) {
                                            if (err)
                                                reject({ code: 1, data: err })
                                            else
                                            {
                                                if (Obj)
                                            resolve({
                                                code: 100, data: "This country deleted successfuylly"
                                            })
                                            else
                                                    reject({ code: 22, data: "This country not exist" })
                                        }
                                        })

                                    }
                                }
                            })

                        }
                    }
                }
            })
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, '',function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj)
                        resolve({
                            code: 100,
                            data: Obj
                        });
                    else {
                        reject({
                            code: 21,
                            data: "This country not exist"
                        });
                    }
                }
            });
        })
    },
    loadAllInJson: function () {
        return new Promise(function (resolve, reject) {
            resolve({
                code: 100,
                data: CountriesInJson.data
            });
        })
    },
}
