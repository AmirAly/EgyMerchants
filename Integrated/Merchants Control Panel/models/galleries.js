var Schema = require('./models/gallery');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    getGalleries: function (_storeId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Store': _storeId, 'Status': 'Active' }, '_id Title Description DisplayPicture Badges', function (err, lst) {
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
    getGallery: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, '_id Title Description DisplayPicture Badges Store', function (err, Obj) {
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