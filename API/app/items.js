var Schema = require('./models/item');
var _ = require("underscore");
module.exports = {
    getFeatured: function (_storeId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Store': _storeId, "Badges": { "$regex": "#Featured", "$options": "i" }, 'Status': 'Active' }, '_id Name Rate Pictures Price', function (err, lst) {
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
        var galleries = [],
            res = [];
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Store': _storeId, "Badges": { "$regex": "#Featured", "$options": "i" }, 'Status': 'Active' }, '_id Name Pictures Price Description Gallery').populate('Gallery','Title').exec(function(err, lst){
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (lst.length > 0)
                    {
                        _.each(lst, function (item) { galleries.push({ "_id": item.Gallery._id, "Title": item.Gallery.Title, "Type": "galleries" }) });
                        res = _.map(lst, function (item) {
                            return _.pick(_.extend({}, item, { Type: "items" }), '_id', 'Name', 'Pictures', 'Type', 'Description');
                        });
                        
                        resolve({
                            code: 100,
                            data: _.groupBy(_.uniq(galleries.concat(res), function (x) {
                                return (x._id).toString();
                            }), 'Type')
                            
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
                        _product.save(function (err, Obj) {
                            if (err)
                                reject({
                                    code: 1,
                                    data: err
                                });
                            else
                                resolve({
                                    code: 100,
                                   data: "This item added successfully"
                                });
                        })
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
                                    item.Name = _name;
                                    item.Description = _description;
                                    item.Price = _price;
                                    item.PriceBeforeSale = _priceBeforeSale;
                                    item.Badges = _badges;
                                    item.Tags = _tags;
                                    if (_imgs)
                                        item.Pictures = _imgs;
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
                        })
                    }
                    else {
                        reject({ code: 21, data: "This filteration didn't resulted in any data" })
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
                        resolve({ code: 100, data: "This item deleted successfuylly" })
                    else
                        reject({ code: 21, data: "This filteration didn't resulted in any data" })
                }
            })
        })
    },
   
}