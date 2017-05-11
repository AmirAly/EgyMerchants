var Schema = require('./schema/gallery');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    getByStore: function (_storeId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Store': _storeId, 'Status': 'Active' }, '_id Title DisplayPicture Badges', function (err, lst) {
                if (err)
                    reject('1:' + err);
                else {
                    if (lst.length > 0)
                        resolve(lst);
                    else 
                        reject("This filteration didn't resulted in any data");
                }
            });
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else {
                    if (Obj) 
                        resolve(Obj);
                    else 
                        reject("This filteration didn't resulted in any data");
                }
            });
        })
    },
    edit: function (_id, _title, _description, _img) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else {
                    if (Obj) {
                        Obj.Title=_title;
                        Obj.Description = _description;
                        if(_img)
                        Obj.DisplayPicture = _img;
                        Obj.save(function(err,Obj){
                            if (err)
                                reject('1:' + err);
                            else
                                resolve(Obj);
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
                { reject('1:' + err); }
                else {
                    if(Obj)
                        reject("There is gallery with the same title");
                    else {
                        _gallery.save(function (err, gallery) {
                            if (err)
                            { reject('1:' + err); }
                            else 
                                resolve(gallery);
                        })
                    }
                }
            })
        })

    }
}