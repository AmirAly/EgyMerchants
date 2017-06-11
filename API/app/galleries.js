var Schema = require('./models/gallery');
var CDN = "https://egmpre.blob.core.windows.net/";
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
            Schema.findOne({ 'Title': _title ,'_id':{$ne:_id} }, '', function (err, Obj) {
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
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    Schema.findOne({ 'Title': _title,'Store':Obj.Store ,'_id':{$ne:_id} }, '', function (err, Obj) {
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
                            else {}
                    if (Obj) {

                        Obj.Title=_title;
                        Obj.Description = _description;
                        if(_img)
                        Obj.DisplayPicture = _img;
                        Obj.save(function(err,Obj){
                            if (err)
                                reject({
                                    code: 1,
                                    data:err
                                });
                            else
                                resolve({
                                    code: 100,
                                    data: "This gallery updated successfully"
                                });
                        })
                    }
                    else
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                }
            })
                    }
                }
            })
        })
    },
    add: function (_gallery) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $and: [{ 'Store': _gallery.Store }, { 'Title': _gallery.Title }] }, '', function (err, Obj) {
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
                        _gallery.save(function (err, gallery) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else 
                                resolve({
                                    code: 100,
                                    data: gallery//"This gallery added successfully"
                                });
                        })
                    }
                }
            })
        })
    },
    suspend: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id': _id }, { $set: { 'Status': "Suspended" } }, { new: true }, function (err, Obj) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if (Obj)
                        resolve({ code: 100, data: "This gallery deleted successfuylly" })
                    else
                        reject({ code: 21, data: "This filteration didn't resulted in any data" })
                }
            })
        })
    }
}