var Schema = require('./models/item');
var _ = require("underscore");
var Helper= require('./helper');
module.exports = {
    getFeatured: function (_storeId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Store': _storeId, "Badges": { "$regex": "Featured", "$options": "i" }, 'Status': 'Active' }, '_id Name Rate Pictures Price Description', function (err, lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (lst.length > 0)
                        resolve({
                            code: 100,
                            data: lst
                        });
                    else {
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                    }
                }
            });
        })
    },
    getByStore: function (_storeId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Store': _storeId,'Status': 'Active' }, '_id Name Pictures Price Description Gallery').populate('Gallery','Title').exec(function(err, lst){
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (lst.length > 0)
                    {
                        var result = _.chain(lst)
                         .groupBy("Gallery").pairs()
                         .map(function (currentItem) {
                          return _.object(_.zip(["gallery", "items"], currentItem));
                          }).value();
                        resolve({
                            code: 100,
                            data: result
                        });
                    }
                    else {
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                    }
                }
            })
        })
    },
    getByBestSeller: function (_storeId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Store': _storeId, 'Status': 'Active' }, '_id Name Rate Pictures Price', function (err, lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (lst.length > 0)
                        resolve({
                            code: 100,
                            data: lst
                        });
                    else {
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                    }
                }
            }).sort('-Sold').limit(5);
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, '').populate({ path: 'Gallery',select:'Store _id', populate: { path: 'Store', model: 'User', select: 'Name' } }).exec(function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj)
                        resolve({
                            code: 100,
                            data: Obj
                        });
                    else {
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                    }
                }
            });
        })
    },
    getByGalleryId: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Gallery': _id, 'Status': 'Active' }, '_id Name Badges Pictures Price PriceBeforeSale Description', function (err, lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (lst.length > 0)
                        resolve({
                            code: 100,
                            data: lst
                        });
                    else {
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                    }
                }
            });
        })
    },
    add: function (_product) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ 'Name': _product.Name, 'Gallery': _product.Gallery, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj)
                        reject({
                            code: 21,
                            data: "There is item with same name in this gallery"
                        });
                    else {
                        if (_product.Pictures.length) {
                            Helper.uploadMultipleImages(_product.Pictures, function (_url) {
                                var i = 0;
                                _.each(_url, function (imageurl) { if (i < _product.Pictures.length) { _product.Pictures[i].URL = imageurl; i++; } });
                                _product.save(function (err, Obj) {
                                    if (err)
                                        reject({
                                            code: 1,
                                            data: err
                                        });
                                    else {
                                        resolve({
                                            code: 100,
                                            data:"This item added successfully"
                                        });
                                    }
                                })
                            });
                        }
                        else {
                        _product.save(function (err, Obj) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else {
                                resolve({
                                    code: 100,
                                    data: "This item added successfully"
                                });
                            }
                            })
                        }
                    }
                }
            })

        })
    },
    edit: function (_id, _name, _description, _imgs, _price, _priceBeforeSale, _badges, _tags) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, '', function (err, item) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (item) {
                        Schema.findOne({ 'Name': _name, 'Gallery': item.Gallery, '_id': { $ne: _id }, 'Status': 'Active' }, '', function (err, Obj) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else {
                                if (Obj)
                                    reject({
                                        code: 21,
                                        data: "There is item with the same name in this gallery"
                                    });
                                else {
                                    item.Pictures = [];
                                    if (_imgs.length) {
                                        Helper.uploadMultipleImages(_imgs, function (_url) {
                                            var i = 0;
                                            var result = _imgs;
                                            _.each(_url, function (imageurl) { if (i < _imgs.length) { result[i].URL = imageurl; i++; } });
                                            item.Pictures = item.Pictures.concat(result);
                                            item.Name = _name;
                                            item.Description = _description;
                                            item.Price = _price;
                                            item.PriceBeforeSale = _priceBeforeSale;
                                            item.Badges = _badges;
                                            item.Tags = _tags;
                                            item.save(function (err, Obj) {
                                                if (err)
                                                    reject({
                                                        code: 1,
                                                        data: err
                                                    });
                                                else
                                                    resolve({
                                                        code: 100,
                                                        data: "This item updated successfully"
                                                    });
                                            })
                                        });
                                    }
                                    else {
                                        item.Name = _name;
                                        item.Description = _description;
                                        item.Price = _price;
                                        item.PriceBeforeSale = _priceBeforeSale;
                                        item.Badges = _badges;
                                        item.Tags = _tags;
                                        item.save(function (err, Obj) {
                                            if (err)
                                                reject({
                                                    code: 1,
                                                    data: err
                                                });
                                            else
                                                resolve({
                                                    code: 100,
                                                    data: "This item updated successfully"
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
    remove: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndRemove({ '_id': _id }, function (err, Obj) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if (Obj)
                        resolve({
                            code: 100, data: "This item deleted successfuylly"
                        })
                    else
                        reject({ code: 22, data: "This item not exist" })
                }
            })
        })
    },
    removeImage: function (_itemid,_imageid) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _itemid }, 'Pictures', function (err, Obj) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if (Obj)
                    {
                        if (Obj.Pictures.length > 1)
                        {
                            Schema.update({ '_id': _itemid }, { $pull: { "Pictures": { "_id": _imageid } } }, function (err, Obj) {
                                if (err)
                                    reject({ code: 2, data: err })
                                else
                                    resolve({code: 100, data: "This item image deleted successfuylly"})
                            })
                        }
                        else
                            resolve({ code: 101, data: "Sorry not allowed to delete the last item image" })
                    }
                    else
                        reject({ code: 22, data: "This item not exist" })
                        }
            })
            //Schema.findOneAndUpdate({ '_id': _itemid }, { $pull: { "Pictures": { "_id": _imageid } } }, function (err, Obj) {
            //    if (err)
            //        reject({ code: 1, data: err })
            //    else {
            //        if(Obj)
            //            resolve({
            //                code: 100, data: "This item image deleted successfuylly"
            //            })
            //        else
            //            reject({ code: 22, data: "This item not exist" })
            //    }
            //})
        })
    }
}