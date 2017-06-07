var Schema = require('./models/expo');
module.exports = {
    //added for test
    add: function (_newExpo) {
        console.log(_newExpo);
        return new Promise(function (resolve, reject) {
                    _newExpo.save(function (err, _newExpo) {
                        if (err)
                            reject(err);
                        else
                            resolve(_newExpo);
                    })
        })
    },
    getAll: function () {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Status': 'Active' }, 'Title', function (err, lst) {
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
                        resolve({ code: 100, data: "This expo deleted successfuylly" })
                    else
                        reject({ code: 21, data: "This filteration didn't resulted in any data" })
                }
            })
        })
    },
}
