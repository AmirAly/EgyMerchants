var Schema = require('./models/category');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    getByCountry: function (_country) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Countries': _country }, '', function (err, lst) {
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
                    else
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                }
            })
        })
    }
}