var Schema = require('./models/store');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    getStoreByName: function (_name) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ 'StoreName': _name }, '_id StoreName FeaturedPhoto', function (err, Obj) {
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
    },
    getStoreByPlacement: function (_placement) {
        return new Promise(function (resolve, reject) {
            Schema.find({}, '_id StoreName Placement FeaturedPhoto Description', function (err, lst) {
                if (err)
                    reject('1:' + err);
                else {
                    if (lst) {
                        var _ = require('underscore');
                        var _lst = _.groupBy(lst, 'Placement');
                        resolve(_lst)
                    }
                    else {
                        reject("This filteration didn't resulted in any data");
                    }
                }
            });
        })
    }
}