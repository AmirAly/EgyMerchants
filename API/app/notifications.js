var Schema = require('./models/notification');
var _ = require("underscore");
module.exports = {
    updateStatus: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id':_id }, { $set: { 'Status': "read" } }, { new: true }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if(Obj)
                        resolve({
                            code: 100,
                            data: "Notification status changed successfully"
                        });
                    else
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        })
                }
            })
        })
    },
    getAll: function (_userId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ "User": _userId }, '', function (err, Lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Lst.length>0) {
                        Schema.updateMany({ "User": _userId }, { $set: { Status: "read" } }).exec(function (err, data) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                })
                            else {
                                Lst.sort(function (a, b) {
                                    return a.Date - b.Date;
                                });
                                resolve({
                                    code: 100,
                                    data: Lst
                                })
                            }
                        })
                    }
                    else
                        resolve({
                        code: 100,
                        data: Lst
                    })
                }
            })
        })
    },
    getUnRead: function (_userId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ "User": _userId, "Status": "un read" }, '', function (err, Lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Lst.length > 0) {
                        resolve({
                            code: 100,
                            data: { "unread": true, "Count": Lst.length }
                        })
                    }
                    else
                        resolve({
                            code: 21,
                            data: { "unread": false, "Count":0 }
                        })
                }
            })
        })
    }
}
