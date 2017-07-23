var Schema = require('./models/expo');
var Helper = require('./helper');
var _ = require("underscore");
module.exports = {
    add: function (_newExpo) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ 'Title': _newExpo.Title, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        reject({
                            code: 21,
                            data: "There is another expo with this title"
                        });
                    }
                    else {
                        if (_newExpo.Banner) {
                            _newExpo.Banner = Helper.uploadImage(_newExpo.Banner, function (_url) {
                                _newExpo.Banner = _url;
                                _newExpo.save(function (err, _newExpo) {
                                    if (err)
                                        reject({
                                            code: 1,
                                            data: err
                                        });
                                    else
                                        resolve({
                                            code: 100,
                                            data: "This expo added successfully"
                                        });
                                })
                            })
                        }
                        else {
                            _newExpo.save(function (err, _newExpo) {
                                if (err)
                                    reject({
                                        code: 1,
                                        data: err
                                    });
                                else
                                    resolve({
                                        code: 100,
                                        data: "This expo added successfully"
                                    });
                            })
                        }
                    }
                }
            })
        })
    },
    setFloor: function (_id, _floor) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, '', function (err, expo) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (expo) {
                        var result = _floor;
                        if (_floor.Coordinates) {
                            Helper.uploadMultipleImages(_floor.Coordinates, function (_url) {
                                var i = 0;
                                _.each(_url, function (imageurl) { if (i < _floor.Coordinates.length) { result.Coordinates[i].Img = imageurl; i++; } })
                                expo.Floors.push(result);
                                expo.save(function (err, _newExpo) {
                                    if (err)
                                        reject({
                                            code: 1,
                                            data: err
                                        });
                                    else
                                        resolve({
                                            code: 100,
                                            data: "This floor added successfully"
                                        })
                                })

                            });
                        }
                        else {
                            expo.Floors.push(_floor);
                            expo.save(function (err, _newExpo) {
                                if (err)
                                    reject({
                                        code: 1,
                                        data: err
                                    });
                                else
                                    resolve({
                                        code: 100,
                                        data: "This floor added successfully"
                                    })
                            })
                        }
                    }
                    else
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                }
            })
        })
    },
    edit: function (_id, _title, _banner, _category) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ 'Title': _title, '_id': { $ne: _id }, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        reject({
                            code: 21,
                            data: "There is another expo with this title"
                        });
                    }
                    else {
                        Schema.findOne({ '_id': _id, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        if (_banner) {
                            Helper.uploadImage(_banner, function (_url) {
                                Obj.Title = _title;
                                Obj.Banner = _url;
                                Obj.Category = _category;
                                Obj.save(function (err, expo) {
                                    if (err)
                                        reject({
                                            code: 1,
                                            data: err
                                        });
                                    else
                                        resolve({
                                            code: 100,
                                            data: "Expo data edited successfully"
                                        })
                                })
                            });
                        }
                        else {
                            Obj.Title = _title;
                            Obj.Banner = "";
                            Obj.Category = _category;
                            Obj.save(function (err, expo) {
                                if (err)
                                    reject({
                                        code: 1,
                                        data: err
                                    });
                                else
                                    resolve({
                                        code: 100,
                                        data: "Expo data edited successfully"
                                    })
                            })
                        }
                     
                    }
                    else
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                }
            })
                    }
                }
            })
        })
    },
    editFloor: function (_expoId, _floorId,_floor) {
        return new Promise(function (resolve, reject) {
           // Schema.findOne({ '_id': _expoId, 'Status': 'Active' }, '', function (err, Obj) {
            Schema.findOne({ '_id': _expoId, "Floors._id": _floorId, 'Status': 'Active' }, { "Floors.$": true }, function (err, Obj) {
               // console.log(JSON.stringify(Obj));
                var coord = JSON.parse(JSON.stringify(Obj));
                console.log(coord.Floors);
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                       // coord = [];
                        Obj.Floors.Coordinates=[];
                        if (_floor.Coordinates) {
                            Helper.uploadMultipleImages(_floor.Coordinates, function (_url) {
                                var i = 0;
                                var result = _floor.Coordinates;
                                _.each(_url, function (imageurl) { if (i < _floor.Coordinates.length) { result[i].Img = imageurl; i++; } })
                            });
                            Obj.Floors.Coordinates.push(result);
                            Obj.save(function (err, expo) {
                                if (err)
                                    reject({
                                        code: 1,
                                        data: err
                                    });
                                else
                                    resolve({
                                        code: 100,
                                        data: "Expo data edited successfully"
                                    })
                            })
                        }
                        else {
                            console.log(Obj.Floors.Coordinates);
                            Obj.save(function (err, expo) {
                                if (err)
                                    reject({
                                        code: 1,
                                        data: err
                                    });
                                else
                                    resolve({
                                        code: 100,
                                        data: "Expo data edited successfully"
                                    })
                            })
                        }
                    }
                    else
                        reject({
                            code: 21,
                            data: "This filteration didn't resulted in any data"
                        });
                }
            })
        })
    },
    getAll: function () {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Status': 'Active' }, 'Title Banner Category').populate('Category', '_id Name').exec(function (err, lst) {
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
    getByCategory: function (_categoryId) {
        var finalLst = [];
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Category': _categoryId, 'Status': 'Active' }, '_id Title Banner Floors').populate('Floors.Coordinates.Store', '_id Name Type Badges').exec(function (err, lst) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (lst.length > 0) {
                        resolve({code:100,data:lst})
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
    getStores: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }).populate('Floors.Coordinates.Store', '_id Name Type Badges').exec(function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        if (Obj.Floors.length > 0)
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
    remove: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id': _id }, { $set: { 'Status': "deleted" } }, { new: true }, function (err, Obj) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if (Obj)
                        resolve({ code: 100, data: "This expo deleted successfully" })
                    else
                        reject({ code: 21, data: "This filteration didn't resulted in any data" })
                }
            })
        })
    },
    getById: function (_id) { 
        return new Promise(function (resolve, reject) {
            Schema.findOne({'_id':_id, 'Status': 'Active' }, '').populate('Category', '_id Name').exec(function (err, Obj) {
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
}
