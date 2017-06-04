var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Category = new Schema({
    Countries: [{
        type: Schema.Types.ObjectId,
        ref: 'Country'
    }],
    Name: { type: String, min: 2 ,required:"please enter name" },
    Status: {type:String,default:"Active"}
});
module.exports = Mongoose.model('Category', Category);