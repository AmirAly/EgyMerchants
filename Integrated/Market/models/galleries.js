var Schema = require('./models/gallery');
var Helper = require('./helper');
module.exports = {
    getByStore: function (_storeId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Store': _storeId, 'Status': 'Active' }, '_id Title DisplayPicture Description Badges', function (err, lst) {
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
            });
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
    }
  

}