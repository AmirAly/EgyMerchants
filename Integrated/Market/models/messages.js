var Schema = require('./models/message');
var User = require('./models/user');
var Comment = require('./models/comment');
var Notification = require('./models/notification');
var _ = require("underscore");
module.exports = {
    send: function (_newMessage) {
        return new Promise(function (resolve, reject) {
            User.find({ _id: { $in: [_newMessage.From, _newMessage.To] } }, 'Name', function (err, Users) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Users.length == 2)
                    {
                        var sender = _.find(Users, function (user) { if (user._id.toString() == _newMessage.From.toString()) return user }).Name;
                        var _newnotification = new Notification();
                        _newnotification.Text = "There is new message for you from" + " " +sender;
                        _newnotification.User = _newMessage.To;
                        _newnotification.RedirectURL = "/message/" + _newMessage.To +"/"+ _newMessage.From;
                        _newnotification.save(function (err, notification) {
                            if(err)
                                reject({
                                    code: 1,
                                    data: err
                                })
                        })
                        _newMessage.save(function (err, Msg) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                })
                            else {
                                
                                resolve({
                                    code: 100,
                                    data: "Message sent successfully"
                                });
                            }
                        })
                    }
                    else {
                        reject({
                            code: 21,
                            data: "This user not exist"
                        })
                    }
                }

            })
        })
    },
    getAll: function (_userId,_toId) {
        return new Promise(function (resolve, reject) { 
            Schema.find({ $or: [{ "From": _userId, "To": _toId }, { "From": _toId, "To": _userId }] }, '').populate('From', 'Name ProfilePicture').populate('To', 'Name ProfilePicture').exec(function (err, Msgs) {
                if(err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Msgs.length > 0) {
                        var result = [];
                        _.each(Msgs, function (msg) {
                            if (msg.Status == "un read" && msg.To._id.toString() == _userId.toString()) {
                                Schema.findOneAndUpdate({ '_id': msg._id }, { $set: { 'Status': "read" } }, { new: true }).populate('From', 'Name ProfilePicture').populate('To', 'Name ProfilePicture').exec(function (err, Obj) {
                                    if (err)
                                        reject({
                                            code: 1,
                                            data: err
                                        })
                                    else {
                                        result.push(Obj);
                                        if (result.length == Msgs.length) {
                                            result.sort(function (a, b) {
                                            return new Date(b.date) - new Date(a.date);
                                        });
                                            resolve({
                                                code: 100,
                                                data: result
                                            });
                                        }
                                    };
                                })
                            }
                            else {
                                result.push(msg);
                                if (result.length == Msgs.length) {
                                    result.sort(function (a, b) {
                                        return new Date(b.date) - new Date(a.date);
                                    });
                                    resolve({
                                        code: 100,
                                        data: result
                                    });
                                }
                            }
                            })
                    }
                    else
                        reject({
                            code: 21,
                            data: "There is no messages"
                        })
                }
            })

        })
    },
    getAllContacts: function (_userId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ $or: [{ "From": _userId }, { "To": _userId }] }, '').populate('From', '_id Name ProfilePicture').populate('To', '_id Name ProfilePicture').exec(function (err, Msgs) {
                if(err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    var Allcontacts = [],
                        unreadcontacts = [];
                    if (Msgs.length > 0) {
                        _.each(Msgs, function (msg) {
                            Allcontacts.push({ _id: msg.From._id, Name: msg.From.Name, ProfilePicture: msg.From.ProfilePicture, Status: msg.Status, To: msg.To }, { _id: msg.To._id, Name: msg.To.Name, ProfilePicture: msg.To.ProfilePicture, Status: msg.Status, To: msg.To });
                        })
                        var destinctArray = _.uniq(Allcontacts, function (x) {
                            return (x._id).toString()
                        })
                        Allcontacts = _.filter(destinctArray, function (obj) { return (obj._id != _userId) });
                        unreadcontacts = _.filter(Allcontacts, function (status) { return (status.To._id.toString() == _userId.toString() && status.Status == 'un read') });
                        Allcontacts = _.difference(Allcontacts, unreadcontacts);
                        Allcontacts=_.map(Allcontacts,function(contact){
                            return _.pick(_.extend(contact, { UnRead: false }), '_id', 'Name', 'ProfilePicture', 'UnRead');
                        })
                        unreadcontacts = _.map(unreadcontacts, function (contact) {
                            return _.pick(_.extend(contact, { UnRead: true }), '_id', 'Name', 'ProfilePicture', 'UnRead');
                        })
                        Allcontacts = Allcontacts.concat(unreadcontacts);
                        resolve({
                            code: 100,
                            data: Allcontacts
                        })
                    }
                    else {
                        resolve({
                            code: 100,
                            data: []
                        })
                    }
                }
                
            })
        })
    },
    //getUnRead: function (_userId) {
    //    return new Promise(function (resolve, reject) {
    //        Schema.find({ "To": _userId, "Status":"un read" }, '', function (err, Msgs) {
    //            if (err)
    //                reject({
    //                    code: 1,
    //                    data: err
    //                })
    //            else {
    //                if (Msgs.length > 0) {
    //                    resolve({
    //                        code: 100,
    //                        data: { "unread": true, "Count": Msgs.length }
    //                    })
    //                }
    //                else
    //                    reject({
    //                        code: 21,
    //                        data: { "unread": false }
    //                    })
    //            }
    //        })
    //    })
    //}
}