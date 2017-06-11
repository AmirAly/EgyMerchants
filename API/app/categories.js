var Schema = require('./models/category');
module.exports = {
    getByCountry: function (_country) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Countries': _country, 'Status': 'Active' }, '', function (err, lst) {
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
    getAll: function () {
        return new Promise(function (resolve, reject) {
            Schema.find({'Status': 'Active'}, '', function (err, lst) {
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
    add: function (_newCategory) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({'Name': _newCategory.Name ,'Status':'Active'}, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        reject({
                            code: 21,
                            data: "This category already exist"
                        });
                    }
                    else {
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
                    }
                }
            })
        })
    },
    edit: function (_id, _name, _countries) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ 'Name': _name,'Status': 'Active','_id': { $ne: _id } }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        reject({
                            code: 21,
                            data: "This category already exist"
                        });
                    }
                    else {
                        Schema.findOne({ '_id': _id, 'Status': 'Active' }, '', function (err, Obj) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else {
                                if (Obj) {
                                    Obj.Name = _name;
                                    Obj.Countries = _countries;
                                    Obj.save(function (err, Obj) {
                                        if (err)
                                            reject({
                                                code: 1,
                                                data: err
                                            });
                                        else
                                            resolve({
                                                code: 100,
                                                data:"Category data edited successfully"
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
                    }
                }
            })
        })
    },
    suspend: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id': _id }, { $set: { 'Status': "Suspended" } }, { new: true }, function (err, Obj) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if (Obj)
                        resolve({
                            code: 100, data: "This category deleted successfuylly"
                        })
                    else
                        reject({ code: 21, data: "This filteration didn't resulted in any data" })
                }
            })
        })
    },
}