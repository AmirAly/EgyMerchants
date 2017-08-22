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
                        _newnotification.RedirectURL = "Inbox/" + _newMessage.To + "/" + _newMessage.From;
                        _newnotification.NotificationDate = new Date().getTime();
                        _newnotification.save(function (err, notification) {
                            if(err)
                                reject({
                                    code: 1,
                                    data: err
                                })
                        })
                        _newMessage.MessageDate = new Date().getTime();
                        _newMessage.save(function (err, Msg) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                })
                            else {
                                
                                resolve({
                                    code: 100,
                                    data: Msg
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
            Schema.updateMany({ Status:"un read",To:_userId,From:_toId}, { $set: { Status: "read" } }).exec(function (err, lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    Schema.find({ $or: [{ "From": _userId, "To": _toId }, { "From": _toId, "To": _userId }] }, '').populate('From', 'Name ProfilePicture').populate('To', 'Name ProfilePicture').exec(function (err, Msgs) {
                        if(err)
                            reject({
                                code: 1,
                                data: err
                            })
                        else {
                            Msgs.sort(function (a, b) {
                                return a.MessageDate - b.MessageDate;
                            });
                            var res = Msgs.slice(-10);
                                resolve({
                                    code: 100,
                                    data: res
                                });
                        }
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
                            Allcontacts.push({ _id: msg.From._id, Name: msg.From.Name, ProfilePicture: msg.From.ProfilePicture }, { _id: msg.To._id, Name: msg.To.Name, ProfilePicture: msg.To.ProfilePicture });
                            if(msg.To._id.toString()==_userId.toString()&&msg.Status=='un read')
                                unreadcontacts.push({ _id: msg.From._id, Name: msg.From.Name, ProfilePicture: msg.From.ProfilePicture })
                        })
                        var destinctArrayOfAll = _.uniq(Allcontacts, function (x) {
                            return (x._id).toString()
                        })
                        var destinctArrayOfUnRead = _.uniq(unreadcontacts, function (x) {
                            return (x._id).toString()
                        })
                        Allcontacts = _.filter(destinctArrayOfAll, function (obj) { return (obj._id != _userId) });
                        var ids = [];
                        _.each(_.pluck(destinctArrayOfUnRead, "_id"), function (item) { ids.push(item.toString()) })
                        var AllcontactsFiltered = _.filter(Allcontacts, function (el) { return !_.contains(ids, el._id.toString()); })
                        Allcontacts = _.map(AllcontactsFiltered, function (contact) {
                            return _.pick(_.extend(contact, { UnRead: false }), '_id', 'Name', 'ProfilePicture', 'UnRead');
                        })
                        unreadcontacts = _.map(destinctArrayOfUnRead, function (contact) {
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
    updateStatus: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id': _id }, { $set: { 'Status': "read" } }, { new: true }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj)
                        resolve({
                            code: 100,
                            data: "Message status changed successfully"
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
}