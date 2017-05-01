var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Store = new Schema({
    Email: { type: String, required: 'Email is required' },
    Password: { type: String, min: 6 },
    StoreName: { type: String, default: '-' },
    Description: { type: String, default: '-' },
    Category: { type: String, default: 'Furniture' },
    CountryISOCode: { type: String, default: 'EG' },
    Status: { type: String, default: 'Unconfirmed' },
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