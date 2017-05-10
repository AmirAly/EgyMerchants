var Schema = require('./schema/category');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    add: function (_newcategory) {
        return new Promise(function (resolve, reject) {
            Schema.find({ $and: [{ 'Name': _newcategory.Name }, { 'Country': _newcategory.Country }] }, '', function (err, Obj) {
                if (err)
                    reject(err);
                else {
                    if (Obj.length > 0) 
                        reject("this category already exist in this country");
                    else {
                        if (_newcategory.Img) {
                            var Uploadedimg = Helper.postFile(_newcategory.Img, _newcategory._id + ".png");
                            _newcategory.Img = CDN + "egmpre/" + _newcategory._id + ".png";
                        }
                        _newcategory.save(function (err, _newcategory) {
                            if (err)
                                reject(err);
                            else 
                                resolve(_newcategory);
                        })
                    }
                }
            })
        })
    },
    getByCountry: function (_country) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Country': _country }, '', function (err, Obj) {
                if (err)
                    reject(err);
                else {
                    if(Obj)
                        resolve(Obj);
                    else 
                        reject("This filteration didn't resulted in any data");
                }
            })
        })
    }
}