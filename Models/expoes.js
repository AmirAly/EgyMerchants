var Schema = require('./schema/expo');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    getByCategory: function (_categoryid) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Category': _categoryid }, '_id Title Banner Sections').populate({
                path: 'Sections.Store',
                model: 'Store'
            }).exec(function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else {
                    if (Obj.length > 0) {
                        resolve(Obj);
                    }
                    else {
                        reject("This filteration didn't resulted in any data");
                    }
                }
            })
        })
    },
    getStores: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id }).populate({
                path: 'Sections.Store',
                model: 'Store'
            }).exec(function (err, stores) {
                if (err)
                    reject('1:' + err);
                else {
                    if (stores)
                        resolve(stores.length > 0);
                    else {
                        reject("This filteration didn't resulted in any data");
                    }
                }
            })
        })
    },
    //added for test 
    add: function (_expo) {
        return new Promise(function (resolve, reject) {
            _expo.save(function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else
                    resolve(Obj);
            })
        })
    }
}
