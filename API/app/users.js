var Schema = require('./models/user');
var Helper = require('./helper');

module.exports = {
    register: function (_newUser) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Email': {$regex: new RegExp('^' + _newUser.Email+"$" , 'i')} }, { 'Name':  {$regex: new RegExp('^' + _newUser.Name+"$" , 'i')} }] }, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj) {
                        reject({
                            code: 21,
                            data: "This email or name already exist"
                        });
                    }
                    else {
                        _newUser.Type = 'user';
                        Helper.uploadImage(_newUser.ProfilePicture, function (_url) {
                            _newUser.ProfilePicture = _url;
                            _newUser.save(function (err, _newuser) {
                                    if (err)
                                        reject({
                                            code: 1,
                                            data: err
                                        });
                                    else {
                                        var link ="http://localhost:8007/User/SetToActive/"+_newuser._id
                                        console.log(_newUser._id);
                                        var data = {
                                            to: _newUser.Email,
                                            subject: "Please confirm your e-mail address ",
                                            html: 'Dear '+_newuser.Name+'<br />'+
                                            'Welcome to EgyMerchant'+'<br />'+
                                           ' You are almost ready to start interacting with our web site...'+'<br />'
                                         +'  Please confirm your email address by clicking the link below'+'<br />'+
                                         '<a href='+link+'>Confirm your e-mail</a>'
                                        }
                                       
                                                Helper.sendEmail(data);
                                                console.log(data)
                                        resolve({
                                            code: 100,
                                            data: { _id: _newuser._id, Name: _newuser.Name, Type: _newuser.Type , Email: _newuser.Email }
                                        });
                                    }
                                })
                            })
                    }
                }
            })
        })
    },
    login: function (_user) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $and: [{ 'Email':{$regex: new RegExp('^' + _user.Email+"$" , 'i')} }, { 'Password':{$regex: new RegExp('^' + _user.Password+"$" , 'i')}}] }, '_id Name Type FavouriteItems VisitedStores ProfilePicture Rate.Store', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    });
                else if (!Obj)
                    reject({
                        code: 21,
                        data: "This email or password incorrect"
                    });
                else if (Obj.Status == "Suspended")
                    reject({
                        code: 22,
                        data: "This account is suspended "
                    });
                else if (Obj.Status == "Deleted")
                    reject({
                        code: 23,
                        data: "This account is deleted"
                    });
                else 
                    resolve({
                        code: 100,
                        data: Obj
                    });
                    // Rate:[{
                    //     Store: {
                    //      type: Schema.Types.ObjectId,
                    //      ref: 'User',
                        
                    //     }
            })
        })
    },
    editProfile: function (_id, _name, _profilePicture) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ $or: [{ 'Name': {$regex: new RegExp('^' + _name+"$" , 'i')}}] , '_id': { $ne: _id }}, '', function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj) {
                      
                        reject({
                            code: 21,
                            data: "This name already exists"
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
                        console.log(`obj is ${Obj}`)
                        Obj.Name = _name;
                        console.log(`name is  ${_name}`)
                        Helper.uploadImage(_profilePicture, function (_url) {
                            Obj.ProfilePicture = _url;
                            console.log(`Obj.ProfilePicture is  ${ Obj.ProfilePicture}`)
                            console.log(`img is  ${_url}`)
                            Obj.save(function (err, _newuser) {
                                    if (err)
                                        reject({
                                            code: 1,
                                            data: err
                                        });
                                    else {
                                        resolve({
                                            code: 100,
                                            data: "Your profile is updated successfully"
                                        });
                                    }
                                })
                            })
                    }
                    else 
                        reject({
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
    addToFavourites: function (_userId,_itemId) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ "_id": _userId, "Status": "Active" }, { $addToSet: { FavouriteItems: _itemId } }, { new: true, fields: '_id Name Type FavouriteItems VisitedStores ProfilePicture' }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj)
                        resolve({
                            code: 100,
                            data: Obj
                        });
                    else
                        reject({
                        code: 21,
                        data: "No results"
                    });
                }
            })
        })
    },
    removeFromFavourites: function (_userId, _itemId) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ "_id": _userId, "Status": "Active" }, { $pull: { FavouriteItems: _itemId } }, { new: true, fields: '_id Name Type FavouriteItems VisitedStores ProfilePicture' }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj)
                        resolve({
                            code: 100,
                            data: Obj
                        });
                    else
                        reject({
                            code: 21,
                            data: "No results"
                        });
                }
            })
        })
    },
    addToVisited: function (_userId, _storeId) {
        return new Promise(function (resolve, reject) {
            Schema.findOneAndUpdate({ "_id": _userId }, { $addToSet: { VisitedStores: _storeId } }, { new: true, fields: '_id Name Type FavouriteItems VisitedStores ProfilePicture' }, function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj)
                        resolve({
                            code: 100,
                            data: Obj
                        });
                    else
                        reject({
                            code: 21,
                            data: "No result"
                        });
                }
            })
        })
    },
    getFavourites: function (_userId) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ "_id": _userId, "Status": "Active" }, 'FavouriteItems').populate('FavouriteItems',{Name:1, Pictures: { $slice: 1 }}).exec(function (err, Obj) {
                if (err)
                    reject({
                        code: 1,
                        data: err
                    })
                else {
                    if (Obj){
                        resolve({
                            code: 100,
                            data: Obj
                        });
                    }
                    else
                        reject({
                            code: 21,
                            data: "This user doesn't exist"
                        });
                }
            })
        })
    },
    getById: function (_id) {
        return new Promise(function (resolve, reject) {
            Schema.findOne({ '_id': _id}, { "Password": 0 }, function (err, Obj) {
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
                    else
                        reject({
                            code: 21,
                            data: "No results"
                        });
                }
            })
        })
    },

setToActive:function(_userId){
return new Promise(function (resolve, reject) {
    console.log(_userId);
Schema.findOneAndUpdate({"_id":_userId },{$set:{'Status':'Active'}},{ new: true},function(err,Obj){
    console.log(Obj)
if (err) {
    reject({
        code: 1,
        data: err
    });
}
else{
    resolve({
        code: 100,
        data: Obj
    });

}
});
})
},

addRating:function(_userId,_storeId,_value){
    
   return new Promise(function (resolve, reject) {
    Schema.findOne({"_id":_userId, "Status":"Active"},function(err,_obj){
    
    if(!_obj){
        console.log(_obj)
        resolve({ code: 21, data:"No user found"});
        
    }
    else{
      Schema.findOne({"_id":_userId,"Rate.Store":_storeId },function(err,_user){
    
            if(err)
            reject({ code: 1, data: err});
            else  if(_user)
            resolve({ code: 100, data: "You can't rate twice"});
            else{
            
                Schema.findOne({"_id":_userId  },function(err,Obj){
                                            
                                if(err)
                                reject({ code: 1, data: err});
                                else
                                {
                                var _object={"Store":_storeId,"Value":_value};
                            
                                Obj.Rate.push(_object);

                                    Obj.save(function(err,res){
                                if(err)  

                                reject({ code: 1, data: err});
                                else{
                                    Schema.find({"Rate.Store":_storeId},'Rate Name',function(err,_lst){
                                        
                                        if(err)
                                        reject({ code: 1, data: err});

                                        else{
                                        var sum=[]; 
                                        var constant=0;
                                        
                                        
                                        for (var i=0 ; i< _lst.length; i++){
                                            for(var f = 0 ;f<_lst[i].Rate.length; f++)
                                            {
                                                if(_lst[i].Rate[f].Store==_storeId)
                                                sum =(_lst[i].Rate[f].Value);
                                            }
                                            constant+=sum;
                                        }
                                        
                                        var average = constant/_lst.length;
                                        average=   average .toFixed(1) ;                      
                                        resolve({ code: 100, data: average});
                                        console.log(average)
                                        
                                        }
                            }) ;
                                
                                resolve({ code: 100, data:res});
                                }
                                })
                                }
                })
                }
    })
}
})

})
},


getAllRatedStores:function(_userId){
    return new Promise(function (resolve, reject) {
  Schema.findOne({"_id":_userId},'Rate.Store',function(err,_lst){
    

    if(err)
    reject({ code: 1, data: err });
    else
    resolve({ code: 100, data: _lst });

  });
});
}
};
