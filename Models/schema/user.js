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
    Description: { type: String, default: '-' },
    Badges: {
        Verified: { type: String, default: "False" },
        Flag: { type: String, default:"False" },
        HasFactory: { type: String, default: "False" },
        Featured:{type:String,default:"False"}
    },
    Category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: "Please select category"
    },
    Country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: "Please select country"
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