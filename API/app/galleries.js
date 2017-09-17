var Schema = require('./models/gallery');
var Item = require('./models/item');
var Helper = require('./helper');
var _ = require('underscore');
module.exports = {
    getByStore: function (_storeId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Store': _storeId, 'Status': 'Active' }, '_id Title DisplayPicture Description Badges Order', function (err, lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (lst.length > 0)
                    resolve({
                        code:100,
                        data: lst
                    });
                    else 
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                }
            }).sort({ Order: 1 });
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) 
                        resolve({
                            code: 100,
                            data:Obj
                        });
                    else 
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                }
            });
        })
    },
    edit: function (_id, _title, _description, _img) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, '', function (err, gallery) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (gallery) {
                        Schema.findOne({ 'Title': _title, 'Store': gallery.Store, '_id': { $ne: _id }, 'Status': 'Active' }, '', function (err, Obj) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else {
                                if (Obj)
                                    reject({
                                        code: 21,
                                        data: "There is gallery with the same title"
                                    });
                                else {
                                    gallery.DisplayPicture = "";
                                    gallery.Title = _title;
                                    gallery.Description = _description;
                                    if (_img) {
                                        Helper.uploadImage(_img, function (_url) {
                                            gallery.DisplayPicture = _url;
                                            gallery.save(function (err, Obj) {
                                                if (err)
                                                    reject({
                                                        code: 1,
                                                        data: err
                                                    });
                                                else
                                                    resolve({
                                                        code: 100,
                                                        data: "This gallery updated successfully"
                                                    });
                                            })
                                        })
                                    }
                                    else {
                                        gallery.save(function (err, Obj) {
                                            if (err)
                                                reject({
                                                    code: 1,
                                                    data: err
                                                });
                                            else
                                                resolve({
                                                    code: 100,
                                                    data: "This gallery updated successfully"
                                                });
                                        })
                                    }
                                }
                            }
                        })
                    }
                    else {
                        reject({ code: 21, data: "This filteration didn't resulted in any data" })
                    }
                }
            })
        })
    },
    add: function (_gallery) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $and: [{ 'Store': _gallery.Store }, { 'Title': _gallery.Title }, {'Status':'Active'}] }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if(Obj)
                        reject ({
                            code: 21,
                            data: "There is gallery with the same title"
                        });
                    else {
                        if (_gallery.DisplayPicture) {
                            Helper.uploadImage(_gallery.DisplayPicture, function (_url) {
                                _gallery.DisplayPicture = _url;
                                _gallery.save(function (err, gallery) {
                                    if (err)
                                        reject({
                                            code: 1,
                                            data: err
                                        });
                                    else
                                        resolve({
                                            code: 100,
                                            data: "This gallery added successfully"
                                        });
                                })
                            })
                        }
                        else{
                        _gallery.save(function (err, gallery) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else 
                                resolve({
                                    code: 100,
                                    data:"This gallery added successfully"
                                });
                        })
                    }
                    }
                }
            })
        })
    },
    remove: function (_id) {
    return new Promise(function (resolve, reject) {
        Schema.findOneAndRemove({ '_id': _id }, function (err, Obj) {
            if (err)
                reject({ code: 1, data: err })
            else {
                if (Obj) {
                    Item.remove({ 'Gallery': _id }, function (err,res) {
                        if(err)
                            reject({ code: 2, data: err })
                        else
                            resolve({
                                code: 100, data: "This gallery deleted successfuylly"
                            })
                    })
                }
                else
                    reject({ code: 22, data: "This gallery not exist" })
            }
        })
    })
},
    order: function (_galleries) {
        return new Promise(function (resolve, reject) {
            var i=0;
            _.each(_galleries, function (gallery) {
                i++;
                Schema.findOneAndUpdate({ '_id': gallery._id }, { $set: { Order: i } }, function (err, Obj) {
                    if (err)
                        reject({ code: 1, data: err })
                    else {
                        if(Obj.Order==_galleries.length)
                            resolve({
                                code: 100,
                                data: "Galleries ordered successfully"
                            });
                            }
                })
            })
           
        })
    }
}