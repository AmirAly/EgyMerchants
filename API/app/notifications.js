var Schema = require('./models/notification');
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
            Schema.find({ "User": _userId }, 'Text RedirectURL Status', function (err, Lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Lst.length > 0)
                        resolve({
                            code: 100,
                            data: Lst
                        });
                    else
                        reject({
                            code: 21,
                            data: "There is no notifications"
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
                        reject({
                            code: 21,
                            data: { "unread": false }
                        })
                }
            })
        })
    }
}
