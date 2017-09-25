var Schema = require('./models/category');
var Expo = require('./models/expo');
var Country = require('./models/country');
var _ = require("underscore");
module.exports = {
    getAll: function () {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Status': 'Active' }, '').populate('Country', '_id Name Flag').exec(function(err, lst) {
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
    add: function (_newCategory) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ 'Name': _newCategory.Name, 'Country': _newCategory.Country,"Status":"Active" }, '', function (err, Obj) {
                if (err)
                    reject({ code: 1, data: err });
                else {
                    if (Obj)
                        resolve({ code: 21, data: 'This category already exist in this country' })
                    else {
                        _newCategory.save(function (err, Obj) {
                            if (err)
                                reject({
                                    code: 2,
                                    data: err
                                });
                            else
                                resolve({
                                    code: 100,
                                    data: Obj
                                });
                        })
                    }
                }
            })
                    
        })
    },
    edit: function (_id, _name,_country) {
        return new Promise(function (resolve, reject) {
                        Schema.findOne({ '_id': _id, 'Status': 'Active' }, '', function (err, Obj) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else {
                                if (Obj) {
                                    Schema.findOne({ 'Name': _name, 'Country': _country, 'Status': 'Active', '_id': { $ne: _id } }, '', function (err, Objexist) {
                                        if (err)
                                            reject({
                                                code: 2,
                                                data: err
                                            });
                                        else {
                                            if (Objexist)
                                                resolve({ code: 22, data: 'This category already exist in this country' })
                                            else {
                                                Obj.Name = _name;
                                                Obj.Country = _country;
                                                Obj.save(function (err, Obj) {
                                                    if (err)
                                                        reject({
                                                            code: 3,
                                                            data: err
                                                        });
                                                    else
                                                        resolve({
                                                            code: 100,
                                                            data:"Category data is edited successfully"
                                                        })
                                                })
                                            }
                                        }
                                    })
                                }
                                else
                                    reject({
                                        code: 21,
                                        data: "This category doesn't exist"
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
                    if (lst.length > 0)
                    {
                        if (lst.length == 1) resolve({ code: 22, data: "Sorry,you can't delete the last category" })
                        else
                        {
                            Expo.find({ 'Category': _id ,"Status":"Active"}, '', function (err, lst) {
                                if (err)
                                    reject({ code: 2, data: err })
                                else
                                {
                                    if (lst.length >0)
                                    {
                                        Schema.findOneAndUpdate({ '_id': _id}, { $set: { 'Status': "Deleted" } }, { new: true }, function (err, Obj) {
                                            if (err)
                                                reject({ code: 3, data: err })
                                            else {
                                                if (Obj) {
                                                    _.each(lst, function (expo) {
                                                        Expo.findOneAndUpdate({ '_id': expo._id }, { $set: { 'Status': "Deleted" } }, { new: true }, function (err, Obj) {
                                                            if (err)
                                                                reject({ code: 4, data: err })
                                                        })
                                                    })
                                                    resolve({
                                                        code: 100, data: "This category is deleted successfuylly"
                                                    })
                                                }
                                                else
                                                    reject({ code: 21, data: "This category doesn't exist" })
                                            }
                                        })
                                    }
                                    else {
                                        Schema.findOneAndRemove({ '_id': _id }, function (err, Obj) {
                                            if (err)
                                                reject({ code: 5, data: err })
                                            else
                                            {
                                                if (Obj)
                                                    resolve({
                                                    code: 100, data: "This category is deleted successfuylly"
                                                })
                                                else
                                                    reject({ code: 22, data: "This category doesn't exist" })
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
    getByCountry: function (_countryIsocode) {
        return new Promise(function (resolve, reject) {
            Country.findOne({ 'IsoCode': _countryIsocode }, '', function (err, Obj) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    
                    if (Obj) {
                        Schema.find({ 'Country': Obj._id, 'Status': 'Active' }, '', function (err, lst) {
                            if (err)
                                reject({ code: 2, data: err })
                            else {
                                    resolve({
                                        code: 100, data: lst
                                    })
                            }
                        })
                    }
                    else {
                        resolve({ code: 21, data: "There is no country with this iso code" })
                    }
                }
            })
        })
    }
}