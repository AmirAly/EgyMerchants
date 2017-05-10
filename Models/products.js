var Schema = require('./schema/item');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    getFeatured: function (_storeId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Store': _storeId, "Badges": { "$regex": "#Featured", "$options": "i" } }, '_id Name Rate Pictures Price', function (err, lst) {
                if (err)
                    reject('1:' + err);
                else {
                    if (lst)
                        resolve(lst)
                    else {
                        reject("This filteration didn't resulted in any data");
                    }
                }
            });
        })
    },
    getByBestSeller: function (_storeId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Store': _storeId }, '_id Name Rate Pictures Price', function (err, lst) {
                if (err)
                    reject('1:' + err);
                else {
                    if (lst)
                        resolve(lst)
                    else {
                        reject("This filteration didn't resulted in any data");
                    }
                }
            }).sort('-Sold').limit(5);
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id }, '', function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else {
                    if (Obj)
                        resolve(Obj);
                    else {
                        reject("This filteration didn't resulted in any data");
                    }
                }
            });
        })
    },
    getByGalleryId: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Gallery': _id }, '_id Name Badges Pictures Price PriceBeforeSale', function (err, lst) {
                if (err)
                    reject('1:' + err);
                else {
                    if (lst) 
                        resolve(lst);
                    else {
                        reject("This filteration didn't resulted in any data");
                    }
                }
            });
        })
    },
    add: function (_product) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ 'Name': _product.Name, 'Gallery': _product.Gallery }, '', function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else {
                    if (Obj)
                        reject("There is item with same name in this gallery");
                    else {
                        if (_product.Pictures) {
                            for (i = 0; i < _product.Pictures.length; i++) {
                                var Uploadedimg = Helper.postFile(_product.Pictures[i].URL, _product._id + i + ".png");
                                _product.Picture.URL[i] = CDN + "egmpre/" + _product._id + i + ".png";
                            }
                        }
                        _product.save(function (err, Obj) {
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
    edit: function (_id, _name, _description, _imgs) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id }, '', function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else {
                    Obj.Name = _name;
                    Obj.Description = _description;
                    if (_imgs) {
                        for (i = 0; i < _imgs; i++) {
                            var Uploadedimg = Helper.postFile(_imgs[i].URL, _id + i + ".png");
                            _imgs[i].URL = CDN + "egmpre/" + _id + i + ".png";
                        }
                    }
                    Obj.save(function (err, Obj) {
                        if (err)
                            reject('1:' + err);
                        else 
                            resolve(Obj);
                    })
                }
            })
        })
    }
}