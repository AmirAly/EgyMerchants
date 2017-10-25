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
                            data: "No results"
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
                            data: "No results"
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
                        Schema.findOne({ 'Title': {$regex: new RegExp('^' + _title+"$" , 'i')}, 'Store': gallery.Store, '_id': { $ne: _id }, 'Status': 'Active' }, '', function (err, Obj) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else {
                                
                                if (Obj){
                                
                                    reject({
                                        code: 21,
                                        data: "There is a gallery with the same title"
                                    });
                                }
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
                                                        data: "This gallery is  updated successfully"
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
                                                    data: "This gallery is updated successfully"
                                                });
                                        })
                                    }
                                }
                            }
                        })
                    }
                    else {
                        reject({ code: 21, data: "No gallery with this name"})
                    }
                }
            })
        })
    },
    add: function (_gallery) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $and: [{ 'Store': _gallery.Store }, { 'Title':  {$regex: new RegExp('^' + _gallery.Title+"$" , 'i')} }, {'Status':'Active'}] }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if(Obj)
                        reject ({
                            code: 21,
                            data: "There is a gallery with the same title"
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
                                            data: "This gallery is added successfully"
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
                                    data:"This gallery is added successfully"
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
                                code: 100, data: "This gallery is deleted successfully"
                            })
                    })
                }
                else
                    reject({ code: 22, data: "This gallery doesn't exist" })
            }
        })
    })
},
    order: function (_galleries) {
        return new Promise(function (resolve, reject) {
            var i=0;
            _.each(_galleries, function (gallery) {
                i++;
                Schema.findOneAndUpdate({ '_id': gallery._id }, { $set: { Order: i } },{new:true}, function (err, Obj) {
                    if (err)
                        reject({ code: 1, data: err })
                    else {
                        if(Obj.Order==_galleries.length)
                            resolve({
                                code: 100,
                                data: "Galleries are ordered successfully"
                            });
                            }
                })
            })
           
        })
    }
}