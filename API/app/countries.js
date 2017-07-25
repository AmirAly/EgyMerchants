var Schema = require('./models/country');
var Category = require('./models/category');
var CountriesInJson = require('./allcountries.json');
var _ = require("underscore");
module.exports = {
    add: function (_newCountry) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({'Name': _newCountry.Name,'Status':'Active'}, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        reject({
                            code: 21,
                            data: "This country already exist"
                        });
                    }
                    else {
                        _newCountry.save(function (err, _newcountry) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else
                                resolve({
                                    code: 100,
                                    data: _newcountry
                                });
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
                    if (lst.length > 0)
                        resolve({
                            code: 100,
                            data: lst
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
                        Schema.findOne({'Name': _name,'Status':'Active', '_id': { $ne: _id } }, '', function (err, Objexist) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else {
                                if (Objexist)
                                    reject({ code: 22, data: 'This country name already exist' })
                                else {
                                    Obj.Name = _name;
                                    Obj.Flag = _flag;
                                    Obj.IsoCode = _isoCode;
                                    Obj.WelcomeMsg = _welcomeMsg;
                                    Obj.save(function (err, Obj) {
                                        if (err)
                                            reject({
                                                code: 1,
                                                data: err
                                            });
                                        else
                                            resolve({
                                                code: 100,
                                                data:"Country data edited successfully"
                                            })
                                    })
                                }
                            }
                        })
                    }
                    else
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
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
                        if (lst.length == 1) reject({ code: 22, data: "Sorry,you can't delete this last country" })
                        else {
                            Category.find({ 'Country': _id}, '', function (err, lst) {
                                if (err)
                                    reject({ code: 1, data: err })
                                else {
                                    if (lst.length > 0) {
                                        Schema.findOneAndUpdate({ '_id': _id }, { $set: { 'Status': "deleted" } }, { new: true }, function (err, Obj) {
                                            if (err)
                                                reject({ code: 1, data: err })
                                            else {
                                                if (Obj) {
                                                    _.each(lst, function (category) {
                                                        Category.findOneAndUpdate({ '_id': category._id }, { $set: { 'Status': "deleted" } }, { new: true }, function (err, Obj) {
                                                            if (err)
                                                                reject({ code: 1, data: err })
                                                        })
                                                    })
                                                    resolve({
                                                        code: 100, data: "This country deleted successfuylly"
                                                    })
                                                }
                                                else
                                                    reject({ code: 21, data: "This filteration didn't resulted in any data" })
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
                                                    reject({ code: 21, data: "This filteration didn't resulted in any data" })
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
                            data: "This filteration didn't resulted in any data"
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
