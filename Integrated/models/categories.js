var Schema = require('./schema/category');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    getByCountry: function (_country) {
        console.log('Im right');
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Countries': _country }, '', function (err, lst) {
                if (err)
                    reject(err);
                else {
                    if (lst.length > 0)
                        resolve(lst);
                    else
                        reject("This filteration didn't resulted in any data");
                }
            })
        })
    }
}