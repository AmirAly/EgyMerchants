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
            Schema.find({ 'Placement': _placement }, '_id StoreName FeaturedPhoto', function (err, lst) {
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
    }
}