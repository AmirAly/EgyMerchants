var Schema = require('./models/comment');
module.exports = {
    add: function (_comment) {
        return new Promise(function (resolve, reject) {
            var newComment = new Schema(_comment);
            newComment.save(function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else
                    resolve({
                        code: 100,
                        data: "This comment added successfully"
                    });
            })
        })
    },
    getByItem: function (_itemId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Item': _itemId }, '').populate('User', 'DisplayName').populate('Item', 'Name').exec(function (err, lst) {
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
