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
                        var _newnotification = new Notification();
                        _newnotification.Text = "There is new message for you from" + " " +Users[0].Name;
                        _newnotification.User = _newMessage.To;
                        _newnotification.RedirectURL = "/message/" + _newMessage.From;
                        _newnotification.save(function (err, notification) {
                            if(err)
                                reject({
                                    code: 10,
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
    getAll: function (_fromId,_toId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ $or: [{ "From": _fromId, "To": _toId }, { "From": _toId, "To": _fromId }] }, '').populate('From', '_id Name ProfilePicture').populate('To', '_id Name ProfilePicture').exec(function (err, Msgs) {
                if(err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Msgs.length > 0) {
                        var result = [];
                        result=_.each(Msgs, function (msg) {
                            if (msg.Status == "un read") {
                                Schema.findOneAndUpdate({ '_id': msg._id }, { $set: { 'Status': "read" } }, { new: true }, function (err, Obj) {
                                    if (err)
                                        reject({
                                            code: 1,
                                            data: err
                                        })
                                    else  return(Obj); 
                                })
                            }
                            else return(msg);
                        })
                        resolve({
                            code: 100,
                            data: result
                        });
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
                    var contacts = [];
                    if (Msgs.length > 0) {
                        _.each(Msgs, function (msg) {
                            contacts.push({ _id: msg.From._id, Name: msg.From.Name, ProfilePicture: msg.From.ProfilePicture }, { _id: msg.To._id, Name: msg.To.Name, ProfilePicture: msg.To.ProfilePicture });
                        })
                        var destinctArray = _.uniq(contacts, function (x) {
                            return (x._id).toString()
                        })
                        contacts = _.filter(destinctArray, function (obj) { return (obj._id != _userId) })
                        resolve({
                            code: 100,
                            data: contacts
                        })
                    }
                    else {
                        reject({
                            code: 21,
                            data: "There is no Contacts for this user"
                        })
                    }
                }
                
            })
        })
    },
    getUnRead: function (_userId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ "To": _userId, "Status": "un read" }, '', function (err, Msgs) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Msgs.length > 0) {
                        resolve({
                            code: 100,
                            data: { "unread": true, "Count": Msgs.length }
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