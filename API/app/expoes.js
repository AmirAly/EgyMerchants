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
                        resolve({
                            code: 21,
                            data: "There is another expo with this title"
                        });
                    }
                    else {
                        Helper.uploadImage(_newExpo.Banner, function (_url) {
                            _newExpo.Banner = _url;
                            _newExpo.save(function (err, _newExpo) {
                                if (err)
                                    reject({
                                        code: 2,
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
                                _.each(_url, function (imageurl) { if (i < _floor.Coordinates.length) { result.Coordinates[i].Img = imageurl; i++; } })//in if also result.Coordinates[i].ExpiryDate=new Date(result.Coordinates[i].ExpiryDate).getTime(); &&i edit too
                                expo.Floors.push(result);
                                expo.save(function (err, _newExpo) {
                                    if (err)
                                        reject({
                                            code: 2,
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
                                        code: 3,
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
                            data: "This expo not exist"
                        });
                }
            })
        })
    },
    edit: function (_id, _title, _banner, _category, _Floors) {
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
                                    Obj.Title = _title;
                                    Obj.Category = _category;
                                    Obj.Floors = _Floors;
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
    editFloor: function (_expoId, _floor) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _expoId, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        var editedFloor;
                        var result = _floor.Coordinates;
                        for (var i = 0; i < Obj.Floors.length; i++) {
                            if (Obj.Floors[i]._id == _floor._id) {
                                editedFloor = Obj.Floors[i];
                                editedFloor.Coordinates = [];
                                editedFloor.Sections = [];
                                editedFloor.Name = _floor.Name;
                                editedFloor.Sections = _floor.Sections;
                                if (_floor.Coordinates) {
                                    Helper.uploadMultipleImages(_floor.Coordinates, function (_url) {
                                        var i = 0;
                                        _.each(_url, function (imageurl) { if (i < _floor.Coordinates.length) { result[i].Img = imageurl; i++; } })
                                        editedFloor.Coordinates = editedFloor.Coordinates.concat(result);
                                        Obj.save(function (err, expo) {
                                            if (err)
                                                reject({
                                                    code: 10,
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
                                    Obj.save(function (err, expo) {
                                        if (err)
                                            reject({
                                                code: 11,
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
                    resolve({
                        code: 100,
                        data: lst
                    });
                }
            })
        })
    },
    getByCategory: function (_categoryId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ 'Category': _categoryId, 'Status': 'Active', 'Floors.Coordinates.ExpiryDate': { '$lt': new Date().getTime() } }, function (err, lstexpos) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (lstexpos.length) {
                        _.each(lstexpos, function (expo) {
                            _.each(expo.Floors, function (floor) {
                                _.each(floor.Coordinates, function (coordinate) {
                                    if (coordinate.ExpiryDate < new Date().getTime()) {
                                        Schema.findOneAndUpdate({ '_id': expo._id, "Floors._id": floor._id },
                                                        { $pull: { 'Floors.$.Coordinates': { "_id": coordinate._id } } },
                                                      { new: true }, function (err, Obj) {
                                                          if (err) { reject({ code: 2, data: err }) }
                                                          else {
                                                              if (expo._id == lstexpos[lstexpos.length - 1]._id) {
                                                                  Schema.find({ 'Category': _categoryId, 'Status': 'Active' }, '_id Title Banner Floors').populate('Floors.Coordinates.Store', '_id Name Type Badges Status').exec(function (err, lst) {
                                                                      if (err)
                                                                          reject({
                                                                              code: 2,
                                                                              data: err
                                                                          });
                                                                      else {
                                                                          resolve({ code: 100, data: lst })
                                                                      }
                                                                  })
                                                              }
                                                          }
                                                      })
                                    }
                                })
                            })
                        })
                    }
                    else {
                        Schema.find({ 'Category': _categoryId, 'Status': 'Active' }, '_id Title Banner Floors').populate('Floors.Coordinates.Store', '_id Name Type Badges Status').exec(function (err, lst) {
                            if (err)
                                reject({
                                    code: 2,
                                    data: err
                                });
                            else {
                                resolve({ code: 100, data: lst })
                            }
                        })
                    }
                }
            })
        })
    },
    getStores: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }).populate('Floors.Coordinates.Store', '_id Name Type Badges Status').exec(function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        resolve({
                            code: 100,
                            data: Obj
                        });
                    }
                    else {
                        reject({
                            code: 21,
                            data: "This expo not exist"
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
                        reject({ code: 21, data: "This expo not exist" })
                }
            })
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, '').populate('Category', '_id Name').exec(function (err, Obj) {
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
                            data: "This expo not exist"
                        });
                }
            })
        })
    },
}
