var Schema = require('./models/expo');
module.exports = {
    add: function (_newExpo) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ 'Title': _newExpo.Title, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        reject({
                            code: 21,
                            data: "There is another expo with this title"
                        });
                    }
                    else {
                        _newExpo.save(function (err, _newExpo) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else
                                resolve({
                                    code: 100,
                                    data: "This expo added successfully"
                                });
                        })
                    }
                }
            })
        })
    },
    setFloor: function (_id, _floor) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id': _id, 'Status': 'Active' }, { $addToSet: { 'Floors': _floor } }, { new: 'true' }).exec(function (err, expo) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (expo) {
                        resolve({
                            code: 100,
                            data: "This floor added successfully"
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
    edit: function (_id, _title, _banner, _category, _floors) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ 'Title': _title, '_id': { $ne: _id }, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        reject({
                            code: 21,
                            data: "There is another expo with this title"
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
                        Obj.Title = _title;
                        Obj.Banner = _banner;
                        Obj.Category = _category;
                        Obj.Floors = _floors;
                        Obj.save(function (err, expo) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else
                                resolve({
                                    code: 100,
                                    data: "Expo data edited successfully"
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
    getAll: function () {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Status': 'Active' }, 'Title Banner Category').populate('Category', '_id Name').exec(function (err, lst) {
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
    getByCategory: function (_categoryId) {
        var finalLst = [];
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Category': _categoryId, 'Status': 'Active' }, '_id Title Banner Floors').populate('Floors.Stores.Store','_id Name Type Badges').exec(function (err, lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (lst.length > 0) {
                        resolve({code:100,data:lst})
                    }
                    else {
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                    }
                }
            })
        })
    },
    getStores: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }).populate( 'Floors.Stores.Store','_id Name Type Badges').exec(function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        if (Obj.Floors.length > 0)
                            resolve({
                                code: 100,
                                data: Obj
                            });
                        else
                            reject({
                                code: 21,
                                data: "There is no stores in this expo yet"
                            });
                    }
                    else {
                        reject({
                            code: 22,
                            data: "This filteration didn't resulted in any data"
                        });
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
                        resolve({ code: 100, data: "This expo deleted successfully" })
                    else
                        reject({ code: 21, data: "This filteration didn't resulted in any data" })
                }
            })
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({'_id':_id, 'Status': 'Active' }, 'Title Banner Category').populate('Category', '_id Name').exec(function (err, Obj) {
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
                    else
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                }
            })
        })
    },
}
