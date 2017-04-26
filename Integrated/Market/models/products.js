var Schema = require('./models/store');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    getStoreFeatured: function (_storeId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Store': _storeId, "Badges": { "$regex": "#Featured", "$options": "i" } }, '', function (err, lst) {
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
    getStoreBestSeller: function (_storeId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Store': _storeId }, '', function (err, lst) {
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
    getStoreById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id }, '', function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else {
                    if (Obj)
                        resolve(Obj)
                    else {
                        reject("This filteration didn't resulted in any data");
                    }
                }
            });
        })
    }
}