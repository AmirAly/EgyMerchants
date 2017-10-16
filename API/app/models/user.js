var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var User = new Schema({
    Name: { type: String, min:2,max:50,required: 'Name is required' },
    Email: { type: String, required: 'Email is required', min: 6, match: /[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/  },
    Password: { type: String, required: 'Password is required',min:6},
    ProfilePicture: { type:String, min:2 },
    VisitedStores: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    RatedStores:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    FavouriteItems: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    CoverPhoto: { type: String, min:2 },
    Description: { type: String, default: '-',min:2},
    Badges: {
        Verified: { type: Boolean, default: false },
        HasFactory: { type: Boolean, default: false },
        Featured: { type: Boolean, default: false }
    },
    AdminNotifications: [{
        Admin: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required:true
        }, Text: { type: String }, Status: { type: Boolean, default: false }
    }],
    Category: {
        type: String
    },
    Country: {
        type: String
    },
    LastActivity: { type: Number },
    Imgs: [{ URL: { type: String } }],
    CreateDate: { type: String, default: new Date().getTime() },


    // Rate:[{
    //    Store: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
       
    //    },


       Rate:[{
       User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
       
       },


     Value:{type:Number }
   
    }],
    
    Contacts: 
      [ 
           {
            Label: { type: String },
            Value: { type: String }
       
        }
    ]
    ,
    City: { type: String, default: 'Cairo',min:2,max:25},
    

    Address: { type: String, default: '',min:2},
    Type:{type: String},
    Status: { type: String, default: 'Inactive' },
    Average:{type: Number , default:0}
});
module.exports = Mongoose.model('User', User);