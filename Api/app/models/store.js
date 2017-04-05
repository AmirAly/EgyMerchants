var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Store = new Schema({
    Email: { type: String, required: 'Name is required' },
    Password: { type: String, min: 6 },
    StoreName: { type: String, default: '-' },
    Fullname: { type: String, default: '-' },
    Category: { type: String, default: 'Furniture' },
    CountryISOCode: { type: String, default: 'EG' },
    Status: { type: String, default: 'Unconfirmed' },
    LastActivity: { type: Number }
});
module.exports = Mongoose.model('Store', Store);