var Schema = require('./models/category');
var Expo = require('./models/expo');
//var _ = require("underscore");
module.exports = {
    add: function (_newCategory) {
        return new Promise(function (resolve, reject) {
                        _newCategory.save(function (err, Obj) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else
                                resolve({
                                    code: 100,
                                    data: Obj
                                });
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
                                    Obj.Name = _name;
                                    Obj.Country = _country;
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
                                                data:Obj//"Category data edited successfully"
                                            })
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
    suspend: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Status': 'Active' }, '', function (err, lst) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if (lst.length > 0)
                    {
                        if (lst.length == 1) reject({ code: 22, data: "Sorry,you can't delete this last category" })
                        else
                        {
                            Expo.find({ 'Category': _id }, '', function (err, lst) {
                                if (err)
                                    reject({ code: 1, data: err })
                                else
                                {
                                    if (lst.length > 0)
                                    {
                                        //_.each(lst, function (expo) {
                                        //    Expo.findOneAndUpdate({ '_id': expo._id }, { $set: { 'Status': "Suspended" } }, { new: true }, function (err, Obj) {
                                        //        if (err)
                                        //            reject({ code: 1, data: err })
                                        //    })
                                        //})
                                        Schema.findOneAndUpdate({ '_id': _id }, { $set: { 'Status': "Suspended" } }, { new: true }, function (err, Obj) {
                                            if (err)
                                                reject({ code: 1, data: err })
                                            else {
                                                if (Obj)
                                                    resolve({
                                                        code: 100, data:"This category deleted successfuylly"
                                                    })
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
                                                    code: 100, data: "This category deleted successfuylly"
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
    getByCountry: function (_countryId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Country': _countryId, 'Status': 'Active' }, '', function (err, lst) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if(lst.length>0)
                        resolve({
                            code: 100, data: lst
                        })
                    else
                        reject({ code: 21, data: "This filteration didn't resulted in any data" })
                }
            })
        })
    }
}