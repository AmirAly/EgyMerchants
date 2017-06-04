var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Country = new Schema({
    Name: { type: String, min: 2 ,required:"please enter name"},
    IsoCode: { type: String, min: 2, required: "please enter Isocode" },
    Flag: { type: String, min: 2, required: "please enter flag" },
    WelcomeMsg: { type: String, min: 2, required: "please enter welcome message" },
    Status: { type: String, default: "Active" }
});
module.exports = Mongoose.model('Country', Country);