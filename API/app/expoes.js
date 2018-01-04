var Schema = require('./models/expo');
var Helper = require('./helper');
var _ = require("underscore");
module.exports = {
    add: function (_newExpo) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ 'Title': { $regex: new RegExp('^' + _newExpo.Title + "$", 'i') }, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        resolve({
                            code: 21,
                            data: "There is another expo with the same title"
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
                                        data: "This expo is added successfully"
                                    });
                            })
                        })
                    }
                }
            })
        })
    },
    setFloor: function (_id, _floor, _mobilefloor) {
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
                        var mobileResult = _mobilefloor;
                        var floorsLength = expo.Floors.length;
                        var mobileFloorsLength = expo.MobileFloors.length;
                        if (_floor.Coordinates) {
                            Helper.uploadMultipleImages(_floor.Coordinates, function (_url) {
                                var i = 0;
                                _.each(_url, function (imageurl) { if (i < _floor.Coordinates.length) { result.Coordinates[i].Img = imageurl; i++; } })//in if also result.Coordinates[i].ExpiryDate=new Date(result.Coordinates[i].ExpiryDate).getTime(); &&i edit too

                                expo.Floors.push(result);
                                if (expo.Floors.length == floorsLength + 1) {

                                    expo.save(function (err, _newExpo) {
                                        if (err)
                                            reject({
                                                code: 2,
                                                data: err
                                            });
                                        else {
                                            if (_mobilefloor.Coordinates) {
                                                Helper.uploadMultipleImages(_mobilefloor.Coordinates, function (_mobileurl) {
                                                    var i = 0;
                                                    _.each(_mobileurl, function (imageurl) { if (i < _mobilefloor.Coordinates.length) { mobileResult.Coordinates[i].Img = imageurl; i++; } })
                                                    expo.MobileFloors.push(mobileResult);
                                                    if (expo.Floors.length == floorsLength + 1 && expo.MobileFloors.length == mobileFloorsLength + 1) {
                                                        _newExpo.MobileFloors.slice(-1)[0].FloorID = _newExpo.Floors.slice(-1)[0]._id;
                                                        expo.save(function (err, _newExpo) {
                                                            if (err)
                                                                reject({
                                                                    code: 2,
                                                                    data: err
                                                                });
                                                            else {
                                                                resolve({
                                                                    code: 100,
                                                                    data: "This floor is added successfully"
                                                                })
                                                            }

                                                        })
                                                    }
                                                })
                                            }
                                            else {
                                                expo.MobileFloors.push(_mobilefloor);
                                                if (expo.Floors.length == floorsLength + 1 && expo.MobileFloors.length == mobileFloorsLength + 1) {
                                                    expo.MobileFloors.slice(-1)[0].FloorID = _newExpo.Floors.slice(-1)[0]._id;
                                                    expo.save(function (err, _newExpo) {
                                                        if (err)
                                                            reject({
                                                                code: 21,
                                                                data: err
                                                            });
                                                        else {
                                                            resolve({
                                                                code: 100,
                                                                data: "This floor is added successfully"
                                                            })
                                                        }
                                                    })
                                                }
                                            }
                                        }
                                    })
                                }
                            });
                        }
                        else {

                            resolve({
                                code: 21,
                                data: "Please enter floor sections"
                            })
                        }

                    }
                    else
                        resolve({
                            code: 21,
                            data: "This expo doesn't exist"
                        });
                }
            })
        })
    },
    removeFloor: function (_expoId, _floorID) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id': _expoId,'Status': 'Active'  }, { $pull: { "Floors": { "_id": _floorID } } }, function (err, Obj) {
                if (err) {
                    if (err)
                        reject({ code: 1, data: err });
                }
                else {
                    if (Obj) {
                        Schema.findOneAndUpdate({ '_id': _expoId,'Status': 'Active'  }, { $pull: { "MobileFloors": { "FloorID": _floorID } } }, function (err, _Obj) {
                            if (err) {
                                reject({ code: 1, data: err });
                            }
                            else {
                                if(_Obj)
                                {
                                resolve({ code: 100, data: "Removed successfully" });
                                }
                                else{
                                }
                                resolve({ code: 21, data: 'No result' });

                            }
                        });
                    }
                    else {
                        resolve({ code: 21, data: 'No result' });
                    }
                }
            });
        });
    },

    edit: function (_id, _title, _banner, _category, _Floors, _FlipTime, _MobileFloors) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ 'Title': { $regex: new RegExp('^' + _title + "$", 'i') }, '_id': { $ne: _id }, 'Status': 'Active' }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        reject({
                            code: 21,
                            data: "There is another expo with the same  title"
                        });
                    }
                    else {
                        Schema.findOne({ '_id': _id, 'Status': 'Active' }, '', function (err, Obj) {
                            if (err)
                                reject({
                                    code: 2,
                                    data: err
                                });
                            else {

                                if (Obj) {
                                    Obj.Title = _title;
                                    Obj.Category = _category;
                                    Obj.Floors = _Floors;
                                    Obj.MobileFloors = _MobileFloors;
                                    Obj.FlipTime = _FlipTime;
                                    Helper.uploadImage(_banner, function (_url) {
                                        Obj.Banner = _url;
                                        Obj.save(function (err, expo) {
                                            if (err)
                                                reject({
                                                    code: 3,
                                                    data: err
                                                });
                                            else
                                                resolve({
                                                    code: 100,
                                                    data: "Expo data is edited successfully"
                                                })
                                        })
                                    });
                                }
                                else
                                    resolve({
                                        code: 21,
                                        data: "No results"
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
                        var floor = _.filter(Obj.Floors, function (floor) {
                            return floor._id == _floor._id;
                        });
                        var mobileFloor = _.filter(Obj.MobileFloors, function (floor) {
                            return floor._id == _floor._id;
                        })
                        floor.length > 0 ? editedFloor = floor[0] : editedFloor = mobileFloor[0];
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
                                            code: 1,
                                            data: err
                                        });
                                    else
                                        resolve({
                                            code: 100,
                                            data: "Expo data is edited successfully"
                                        })
                                })
                            });
                        }
                        else {
                            Obj.save(function (err, expo) {
                                if (err)
                                    reject({
                                        code: 1,
                                        data: err
                                    });
                                else
                                    resolve({
                                        code: 100,
                                        data: "Expo data is edited successfully"
                                    })
                            })
                        }
                    }
                    else
                        resolve({
                            code: 21,
                            data: "No results"
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
    getStores: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        if (Obj.Floors) {
                            var expos = [];
                            var res = [];
                            expos.push(Obj);
                            module.exports.filterByExpiryDate(expos).then(function (data) {
                                if (data.code == 100) {
                                    Schema.findOne({ '_id': _id, 'Status': 'Active' }, 'Floors.Coordinates.Store').populate('Floors.Coordinates.Store', '_id Name Type Badges Status ProfilePicture').exec(function (err, expo) {
                                        if (err)
                                            reject({
                                                code: 2,
                                                data: err
                                            });
                                        else {
                                            var i = 0;
                                            _.each(expo.Floors, function (floor) {
                                                _.each(floor.Coordinates, function (coordinate) { i++; });
                                            });
                                            _.each(expo.Floors, function (floor) {
                                                _.each(floor.Coordinates, function (coordinate) {
                                                    res.push(coordinate.Store);
                                                    if (res.length == i) {
                                                        resolve({ code: 100, data: res });
                                                    }
                                                })
                                            })
                                        }
                                    })
                                }
                                else reject({
                                    code: 3,
                                    data: err
                                })
                            });
                        }
                        else resolve({ code: 100, data: res })
                    }
                    else {
                        reject({
                            code: 21,
                            data: "This expo doesn't exist"
                        });
                    }
                }
            })
        })
    },
    remove: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ '_id': _id }, { $set: { 'Status': "Deleted" } }, { new: true }, function (err, Obj) {
                if (err)
                    reject({ code: 1, data: err })
                else {
                    if (Obj)
                        resolve({ code: 100, data: "This expo is deleted successfully" })
                    else
                        reject({ code: 21, data: "This expo doesn't exist" })
                }
            })
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id, 'Status': 'Active' }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (Obj) {
                        if (Obj.Floors || Obj.MobileFloors) {
                            var expos = [];
                            expos.push(Obj);
                            module.exports.filterByExpiryDate(expos).then(function (data) {
                                if (data.code == 100) {
                                    module.exports.filterMobileFloorsByExpiryDate(expos).then(function (result) {
                                        if (result.code == 100) {
                                            Schema.findOne({ '_id': _id, 'Status': 'Active' }, '').populate('Category', '_id Name').populate('Floors.Coordinates.Store', '_id Name Status').populate('MobileFloors.Coordinates.Store', '_id FloorID  Name Status').exec(function (err, expo) {
                                                if (err)
                                                    reject({
                                                        code: 2,
                                                        data: err
                                                    });
                                                else {
                                                    resolve({ code: 100, data: expo })
                                                }
                                            })
                                        }
                                        else reject({
                                            code: 3,
                                            data: err
                                        })
                                    })

                                }

                                else reject({
                                    code: 3,
                                    data: err
                                })
                            });
                        }
                        else resolve({ code: 100, data: Obj })
                    }
                    else
                        reject({
                            code: 21,
                            data: "This expo doesn't exist"
                        });
                }
            })
        })
    },
    getByCategory: function (_categoryId) {
        return new Promise(function (resolve, reject) {
            Schema.find({ $or: [{ 'Floors.Coordinates.ExpiryDate': { '$lt': new Date().getTime() } }, { 'MobileFloors.Coordinates.ExpiryDate': { '$lt': new Date().getTime() } }], 'Category': _categoryId, 'Status': 'Active' }, function (err, lstexpos) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else {
                    if (lstexpos.length) {
                        module.exports.filterByExpiryDate(lstexpos).then(function (data) {
                            if (data.code == 100) {
                                module.exports.filterMobileFloorsByExpiryDate(lstexpos).then(function (result) {
                                    if (result.code == 100) {
                                        Schema.find({ 'Category': _categoryId, 'Status': 'Active' }, '_id Title Banner Floors MobileFloors').populate('Floors.Coordinates.Store', '_id Name Type Badges Status ProfilePicture').populate('MobileFloors.Coordinates.Store', '_id Name Type Badges Status ProfilePicture').exec(function (err, _lst) {
                                            if (err) {
                                                reject({
                                                    code: 2,
                                                    data: err
                                                });
                                            }
                                            else {
                                                resolve({
                                                    code: 100,
                                                    data: _lst
                                                });
                                            }
                                        })
                                    }
                                    else {
                                        reject({
                                            code: 3,
                                            data: err
                                        })
                                    }
                                })
                            }
                            else reject({
                                code: 3,
                                data: err
                            })
                        });
                    }
                    else {
                        Schema.find({ 'Category': _categoryId, 'Status': 'Active' }, '_id Title Banner Floors FlipTime MobileFloors').populate('Floors.Coordinates.Store', '_id Name Type Badges Status ProfilePicture').populate('MobileFloors.Coordinates.Store', '_id Name Type Badges Status ProfilePicture').exec(function (err, lst) {
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
    filterByExpiryDate: function (lstexpos) {
        return new Promise(function (resolve, reject) {
            var coordinatesfiltered = [];
            //added to determine the last coordinate will updated so that used in if condition that resolve after ensure all updates finished
            _.each(lstexpos, function (expo) { _.each(expo.Floors, function (floor) { _.each(floor.Coordinates, function (coordinate) { if (coordinate.ExpiryDate < new Date().getTime()) coordinatesfiltered.push(coordinate); }) }) });
            if (coordinatesfiltered.length) {
                _.each(lstexpos, function (expo) {
                    _.each(expo.Floors, function (floor) {
                        _.each(floor.Coordinates, function (coordinate) {
                            if (coordinate.ExpiryDate < new Date().getTime()) {
                                Schema.findOneAndUpdate({ '_id': expo._id, "Floors._id": floor._id },
                                    { $pull: { 'Floors.$.Coordinates': { "_id": coordinate._id } } },
                                    { new: true }, function (err, Obj) {
                                        if (err) { reject({ code: 2, data: err }) }
                                        else {
                                            if (expo._id == lstexpos[lstexpos.length - 1]._id && coordinate._id == coordinatesfiltered[coordinatesfiltered.length - 1]._id) {
                                                resolve({ code: 100 });
                                            }
                                        }
                                    })
                            }
                        })
                    })
                })
            }
            else { resolve({ code: 100 }); }
        })
    },
    filterMobileFloorsByExpiryDate: function (lstexpos) {
        return new Promise(function (resolve, reject) {
            var coordinatesfiltered = [];
            //added to determine the last coordinate will updated so that used in if condition that resolve after ensure all updates finished
            _.each(lstexpos, function (expo) { _.each(expo.MobileFloors, function (mobilefloor) { _.each(mobilefloor.Coordinates, function (coordinate) { if (coordinate.ExpiryDate < new Date().getTime()) coordinatesfiltered.push(coordinate); }) }) });
            if (coordinatesfiltered.length) {
                _.each(lstexpos, function (expo) {
                    _.each(expo.MobileFloors, function (mobilefloor) {
                        _.each(mobilefloor.Coordinates, function (coordinate) {
                            if (coordinate.ExpiryDate < new Date().getTime()) {
                                Schema.findOneAndUpdate({ '_id': expo._id, "MobileFloors._id": mobilefloor._id },
                                    { $pull: { 'MobileFloors.$.Coordinates': { "_id": coordinate._id } } },
                                    { new: true }, function (err, Obj) {
                                        if (err) { reject({ code: 2, data: err }) }
                                        else {
                                            if (expo._id == lstexpos[lstexpos.length - 1]._id && coordinate._id == coordinatesfiltered[coordinatesfiltered.length - 1]._id) {
                                                resolve({ code: 100 });
                                            }
                                        }
                                    })
                            }
                        })
                    })
                })
            }
            else { resolve({ code: 100 }); }
        })
    },
}
