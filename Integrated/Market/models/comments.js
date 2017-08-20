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
                                        code: 2,
                                        data: err
                                    })
                                else {
                                        var ids = [];
                                        _.each(usersLst, function (comment) {
                                            if (comment.User.toString() != Obj.Store._id.toString() && !_.contains(ids, comment.User.toString())) {
                                                ids.push(comment.User.toString());
                                                var _newnotification = new Notification();
                                                _newnotification.Text = "Store " + Obj.Store.Name + " commented  on " + "item " + Obj.Name;
                                                _newnotification.User = comment.User;
                                                _newnotification.RedirectURL = "Product/" + Obj.Name +"/"+ Obj._id;
                                                _newnotification.save(function (err, notification) {
                                                    if (err)
                                                        reject({
                                                            code: 3,
                                                            data: err
                                                        })
                                                })
                                            }
                                        })
										_newComment.save(function (err, comment) {
                            if (err)
                                reject({
                                    code: 4,
                                    data: err
                                })
                            else {
                                Schema.findOne({ "_id": comment._id }, '').populate('User','Type Name ProfilePicture').exec(function (err, Obj) {
                                    if (err)
                                        reject({
                                            code: 5,
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
                                                data: "This comment not exist any more"
                                            })
                                    }
                                })
                                   
                            }
                        })
                                }
                            })
                        }
                        
                    }
                    else {
                        reject({
                            code: 22,
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
							// module.exports.schemaRemove(_commentId);
                            Schema.findOneAndRemove({ "_id": _commentId }, function (err, Obj) {
                                if (err)
                                    reject({
                                        code: 2,
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
                            User.findOne({ "_id": _userId ,'Type':'master','Status':'Active'}, '', function (err, user) {
                                if (err)
                                    reject({
                                        code: 3,
                                        data: err
                                    })
                                else {
                                    if (user) {
										 // module.exports.schemaRemove(_commentId);
                                            Schema.findOneAndRemove({ "_id": _commentId }, function (err, Obj) {
                                                if (err)
                                                    reject({
                                                        code: 4,
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
                                            resolve({
                                                code: 22,
                                                data: "Sorry,you can't delete this comment"
                                            })
                                }
                            })
                        }
                    }
                    else
                        reject({
                            code: 21,
                            data: "This comment not exist"
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
                        resolve({
                            code: 100,
                            data: lst
                        })
                }
            })
        })
    },
	// schemaRemove:function(_commentId ){
		 // return new Promise(function (resolve, reject) {
		 // Schema.findOneAndRemove({ "_id": _commentId }, function (err, Obj) {
			 // console.log("query");
                                                // if (err)
                                                   // return reject({
                                                        // code: 4,
                                                        // data: err
                                                    // })
                                                // else {
													// console.log("else");
                                                    // if (Obj){
														// console.log("resolve");
                                                     // return  resolve({
                                                            // code: 100,
                                                            // data: "Your comment deleted successfully"
                                                        // })
													// }
                                                // }
                                            // });
											// });
		
	// }
}
