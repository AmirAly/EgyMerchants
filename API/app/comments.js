var Schema = require('./models/comment');
var Item = require('./models/item');
var User = require('./models/user');
module.exports = {
    add: function (_newComment) {
        return new Promise(function (resolve, reject) {
            Item.findOne({ "_id": _newComment.Item }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj) {
                        _newComment.save(function (err, comment) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                })
                            else
                                if (comment)
                                    resolve({
                                        code: 100,
                                        data: "Your comment added successfully"
                                    })
                        })
                    }
                    else {
                        reject({
                            code: 21,
                            data: "This item not exist any more"
                        })
                    }
                }
                })
        })
    },
    remove: function (_commentId,_userId) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ "_id": _commentId }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj) {
                        if (Obj.User == _userId) {
                            Schema.findOneAndRemove({ "_id": _commentId }, function (err, Obj) {
                                if (err)
                                    reject({
                                        code: 1,
                                        data: err
                                    })
                                else {
                                    if (Obj)
                                        resolve({
                                            code: 100,
                                            data: "Your comment deleted successfully"
                                        })
                                }
                            });

                        }
                        else {
                            User.findOne({ "_id": _userId }, '', function (err, user) {
                                if (err)
                                    reject({
                                        code: 1,
                                        data: err
                                    })
                                else {
                                    if (user) {
                                        if (user.Type == "master") {
                                            Schema.findOneAndRemove({ "_id": _commentId }, function (err, Obj) {
                                                if (err)
                                                    reject({
                                                        code: 1,
                                                        data: err
                                                    })
                                                else {
                                                    if (Obj)
                                                        resolve({
                                                            code: 100,
                                                            data: "Your comment deleted successfully"
                                                        })
                                                }
                                            });
                                        }
                                        else 
                                            reject({
                                                code: 21,
                                                data: "Sorry,you can't delete this comment"
                                            })
                                    }
                                    else
                                        reject({
                                            code: 22,
                                            data: "This filteration didn't resulted in any data"
                                        })
                                }
                            })
                        }
                    }
                    else
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        })
                    }
            })
        })
    }
}
