var Schema = require('./schema/country');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    addCountry: function (_newcountry) {
        return new Promise(function (resolve, reject) {
            if (_newcountry.Imgs) {
                {
                    for (i = 0; i < _newcountry.Imgs.length; i++)
                    {
                        var Uploadedimg = Helper.postFile(_newcountry.Imgs[i], _newcountry._id+i+ ".png");
                        _newcountry.Imgs[i] = CDN + "egmpre/" + _newcountry._id + ".png";
                    }
                }
            }
            if (_newcountry.Flag) {
                var Uploadedimg = Helper.postFile(_newcountry.Flag, _newcountry._id + ".png");
                _newcountry.Flag = CDN + "egmpre/" + _newcategory._id + ".png";
            }
            _newcountry.save(function (err, _newcountry) {
                if (err)
                    reject(err);
                else 
                    resolve(_newcountry);
            })
        })
        }
}
        
