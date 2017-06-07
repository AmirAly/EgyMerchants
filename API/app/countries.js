var Schema = require('./models/country');
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
    },
    getAll: function () {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Status': 'Active' }, 'Name', function (err, lst) {
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
    },
}
