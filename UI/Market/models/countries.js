var Schema = require('./schema/country');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    add: function (_newcountry) {
        return new Promise(function (resolve, reject) {
           
            _newcountry.save(function (err, _newcountry) {
                if (err)
                    reject(err);
                else 
                    resolve(_newcountry);
            })
        })
        }
}
        
