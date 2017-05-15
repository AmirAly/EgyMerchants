var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Country = new Schema({
    Name: { type: String },
    Message: { type: String },
    Flag: { type: String }
});
module.exports = Mongoose.model('Country', Country);