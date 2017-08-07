var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Category = new Schema({
    Name: { type: String, min:2,max:50, required: "please enter name" },
    Country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: "Please enter country id"
    },
    Status: {type:String,default:"Active"}
});
module.exports = Mongoose.model('Category', Category);