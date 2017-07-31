var Schema = require('./models/notification');
module.exports = {
    updateStatus: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id':_id }, { $set: { 'Status': "read" } }, { new: true }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if(Obj)
                        resolve({
                            code: 100,
                            data: "Notification status changed successfully"
                        });
                    else
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        })
                }
            })
        })
    }
}
