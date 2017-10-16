var Schema = require('./models/comment');
var Item = require('./models/item');
var User = require('./models/user');
var Notification = require('./models/notification');
var _ = require("underscore");
module.exports = {
    add: function (_newComment) {
        return new Promise(function (resolve, reject) {
            Item.findOne({ "_id": _newComment.Item }, 'Store Name').populate('Store', 'Name').exec(function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj) {
                        if (Obj.Store._id.toString() == _newComment.User.toString()) {
                            Schema.find({ "Item": _newComment.Item }, 'User', function (err, usersLst) {
                                if (err)
                                    reject({
                                        code: 1,
                                        data: err
                                    })
                                else {
                                    if (usersLst.length > 0) {
                                        var ids = [];
                                        _.each(usersLst, function (comment) {
                                            if (comment.User.toString() != Obj.Store._id.toString() && !_.contains(ids, comment.User.toString())) {
                                                ids.push(comment.User.toString());
                                                var _newnotification = new Notification();
                                                _newnotification.Text = "Store " + Obj.Store.Name + " commented  on " + "item " + Obj.Name;
                                                _newnotification.User = comment.User;
                                                _newnotification.RedirectURL = "Product/" + Obj.Name + "/" + Obj._id;
                                                _newnotification.NotificationDate = new Date().getTime();
                                                _newnotification.save(function (err, notification) {
                                                    if (err)
                                                        reject({
                                                            code: 1,
                                                            data: err
                                                        })
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        }
                        else {
                            var _newnotification = new Notification();
                            _newnotification.Text = "you have new comment on item " + Obj.Name;
                            _newnotification.User = Obj.Store._id;
                            _newnotification.RedirectURL = "Product/" + Obj.Name + "/" + Obj._id;
                            _newnotification.NotificationDate = new Date().getTime();
                            _newnotification.save(function (err, notification) {
                                if (err)
                                    reject({
                                        code: 1,
                                        data: err
                                    })
                            })
                        }
                        _newComment.CommentDate = new Date().getTime();
                        _newComment.save(function (err, comment) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                })
                            else {
                                Schema.findOne({ "_id": comment._id }, '').populate('User', 'Type Name ProfilePicture').exec(function (err, Obj) {
                                    if (err)
                                        reject({
                                            code: 1,
                                            data: err
                                        })
                                    else {
                                        if (Obj) {
                                            resolve({
                                                code: 100,
                                                data: Obj
                                            })
                                        }
                                        else
                                            reject({
                                                code: 21,
                                                data: "No results"
                                            })
                                    }
                                })

                            }
                        })
                    }
                    else {
                        reject({
                            code: 21,
                            data: "This item doesn't exist"
                        })
                    }
                }
            })
        })
    },
    remove: function (_commentId, _userId) {
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
                                            data: "Your comment is deleted successfully"
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
                                                            data: "Your comment is deleted successfully"
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
                                            data: "This user doesn't  exist "
                                        })
                                }
                            })
                        }
                    }
                    else
                        reject({
                            code: 21,
                            data: "No results"
                        })
                }
            })
        })
    },
    getByItem: function (_itemId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ "Item": _itemId }, '').populate('User', 'Type Name ProfilePicture').exec(function (err, lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    lst.sort(function (a, b) {
                        return b.CommentDate - a.CommentDate;
                    });
                    var res = lst.slice(0, 10);
                    resolve({
                        code: 100,
                        data: res
                    })
                }
            })
        })
    },
    getTenItems: function (_itemId, _key) {
        return new Promise(function (resolve, reject) {
            Schema.find({ "Item": _itemId }, function (err, lst) {
                // console.log(`list ${lst.length}`)
                if (err) {
                    reject({
                        code: 1,
                        data: err
                    });

                }
                else {


                    var _tenItems = [];

                    _tenItems = lst.slice(_key * 10, (_key + 1) * 10);

                    if (_tenItems.length <= 0) {

                        resolve({
                            code: 101,
                            data: "No comments here"
                        });
                    }
                    else {
                        resolve({
                            code: 100,
                            data: _tenItems
                        });

                    }

                }

            }).sort({ CommentDate: -1 });

        });
    }
}