var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var User = new Schema({
    DisplayName: { type: String, min: 2, required: 'Name is required' },
    Email: { type: String, required: 'Email is required' },
    Password: { type: String, min: 6 },
    ProfilePicture: { type: String, min: 2 },
    Status: { type: String, default: 'Unconfirmed' }
});
module.exports = Mongoose.model('User', User);