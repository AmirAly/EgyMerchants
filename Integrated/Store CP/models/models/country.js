var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Country = new Schema({
<<<<<<< HEAD
    Name: { type: String, min: 2, max: 50, required: "please enter name" },
    IsoCode: { type: String, min: 2, max: 3, required: "please enter Isocode" },
    Flag: { type: String, min: 2, required: "please enter flag" },
    WelcomeMsg: { type: String, min: 2, max: 50, required: "please enter welcome message" },
=======
    Name: { type: String, min:2,max:50,required:"please enter name"},
    IsoCode: { type: String, min:2,max:3, required: "please enter Isocode" },
    Flag: { type: String, min:2, required: "please enter flag" },
    WelcomeMsg: { type: String, min:2,max:50, required: "please enter welcome message" },
>>>>>>> 8c81e9edf18d987302795c7d1f2a25fca82758a7
    Status: { type: String, default: "Active" }
});
module.exports = Mongoose.model('Country', Country);