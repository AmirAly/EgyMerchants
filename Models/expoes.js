var Schema = require('./schema/expo');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    getByCategory: function (_categoryid) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Categories': _categoryid }, '_id Title Banner Sections').populate({
                path: 'Sections.Store',
                model: 'Store'
            }).exec(function (err, lst) {
                if (err)
                    reject('1:' + err);
                else {
                    if (lst.length > 0) {
                        resolve(lst);
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
            }).exec(function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else {
                    if (Obj) {
                        if (Obj.Sections.length> 0)
                            resolve(Obj);
                        else
                            resolve("Ther is no stores in this expo yet");
                    }
                    else {
                        reject("This filteration didn't resulted in any data");
                    }
                }
            })
        })
    },
}
