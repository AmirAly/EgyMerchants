var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var User = new Schema({
    Name: { type: String, min: 2, required: 'Name is required' },
    Email: { type: String, required: 'Email is required' },
    Password: { type: String, min: 6, required: 'Password is required' },
    ProfilePicture: { type: String, min: 2 },
    VisitedStores: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    CoverPhoto: { type: String, min: 2 },
    Description: { type: String, default: '-' },
    Badges: {
        Verified: { type: Boolean, default: false },
        HasFactory: { type: Boolean, default: false },
        Featured:{type:Boolean,default:false}
    },
    Category: {
        type: String
    },
    Country: {
        type: String
    },
    LastActivity: { type: Number },
    Imgs: [{ URL: { type: String } }],
    CreateDate: { type: String, default: new Date().getTime() },
    Rate: { type: Number },
    Contacts: [
        {
            Label: { type: String },
            Value: { type: String }
        }
    ],
    City: { type: String, default: 'Cairo' },
    Address: { type: String, default: '' },
    Type:{type: String},
    Status: { type: String, default: 'Active' },
});
module.exports = Mongoose.model('User', User);