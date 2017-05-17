var Schema = require('./schema/expo');
var CDN = "https://egmpre.blob.core.windows.net/";
module.exports = {
    getByCategory: function (_categoryId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Categories': _categoryId }, '_id Title Banner Sections').populate({
                path: 'Sections.Store',
                model: 'Store'
            }).exec(function (err, lst) {
                if (err)
                    reject('1:' + err);
                else {
                    if (lst.length > 0) {
                        var finalLst = [];
                        for (var i = 0 ; i < lst.length; i++) {
                            var obj = lst[i];
                            obj.floors = lst[i].Sections.length / 25;
                            obj.Sections = obj.Sections.splice(0, 25);
                            finalLst.push({
                                _id: obj._id,
                                Title: obj.Title,
                                Banner: obj.Banner,
                                Sections: obj.Sections,
                                Floors: obj.floors
                            });
                            resolve(finalLst);
                        }
                    }
                    else {
                        reject("This filteration didn't resulted in any data");
                    }
                }
            })
        })
    },
    getSectionsByFloor: function (_storeId, _floor) {
        return new Promise(function (resolve, reject) {
            var skippedSections = (_floor - 1) * 25;
            Schema.findOne({ '_id': _storeId }, { _id: 1, Title: 1, Banner: 1, Sections: { $slice: [skippedSections, 25] } }).populate({
                path: 'Sections.Store',
                model: 'Store'
            }).exec(function (err, Obj) {
                if (err)
                    reject('1:' + err);
                else {
                    if (Obj)
                        resolve(Obj);
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
                            resolve("There is no stores in this expo yet");
                    }
                    else {
                        reject("This filteration didn't resulted in any data");
                    }
                }
            })
        })
    },
}
