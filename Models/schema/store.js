var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Store = new Schema({
    Email: { type: String, required: 'Email is required' },
    Password: { type: String, min: 6 },
    StoreName: { type: String, default: '-' },
    Description: { type: String, default: '-' },
    Category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: "Please select category"
    },
    CountryISOCode: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: "Please select country"
    },
    Status: { type: String, default: 'Active' },
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
});
module.exports = Mongoose.model('Store', Store);