var Schema = require('./schema/expo');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    getByCategory: function (_categoryid) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Category': _categoryid}, '', function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else {
                    if (Obj) 
                        resolve(Obj);
                    else {
                        reject("This filteration didn't resulted in any data");
                    }
                }
            })
        })
    },
    getStores: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id }).populate('Sections.Store').exec(function (err, stores) {
                if (err)
                    reject('1:' + err);
                else {
                    if (stores) 
                        resolve(stores);
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
