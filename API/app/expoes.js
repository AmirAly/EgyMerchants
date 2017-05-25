var Schema = require('./models/expo');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    getByCategory: function (_categoryId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Categories': _categoryId }, '_id Title Banner Sections').populate({
                path: 'Sections.Store',
                model: 'Store',
                select: { _id: 1, StoreName: 1 }
            }).exec(function (err, lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (lst.length > 0) {
                        var finalLst = [];
                        for (var i = 0 ; i < lst.length; i++) {
                            var obj = lst[i];
                            obj.floors = lst[i].Sections.length / 32;
                            obj.Sections = obj.Sections.splice(0, 32);
                            finalLst.push({
                                _id: obj._id,
                                Title: obj.Title,
                                Banner: obj.Banner,
                                Sections: obj.Sections,
                                Floors: obj.floors
                            });
                            resolve({
                                code: 100,
                                data: finalLst
                            });
                        }
                    }
                    else {
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                    }
                }
            })
        })
    },
    getSectionsByFloor: function (_storeId, _floor) {
        return new Promise(function (resolve, reject) {
            var skippedSections = (_floor - 1) * 32;
            Schema.findOne({ '_id': _storeId }, { _id: 1, Title: 1, Banner: 1, Sections: { $slice: [skippedSections, 32] } }).populate({
                path: 'Sections.Store',
                model: 'Store',
                select: { _id: 1, StoreName: 1 }
            }).exec(function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj)
                        resolve({
                            code: 100,
                            data: Obj
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
    getStores: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id }).populate({
                path: 'Sections.Store',
                model: 'Store',
                select: { _id: 1, StoreName: 1 }
            }).exec(function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        if (Obj.Sections.length > 0)
                            resolve({
                                code: 100,
                                data: Obj
                            });
                        else
                            reject({
                                code: 21,
                                data: "There is no stores in this expo yet"
                            });
                    }
                    else {
                        reject({
                            code: 22,
                            data: "This filteration didn't resulted in any data"
                        });
                    }
                }
            })
        })
    },
}
