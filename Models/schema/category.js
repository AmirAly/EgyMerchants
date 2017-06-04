var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Category = new Schema({
    Countries: [{
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: "Please add proper id"
    }],
    Name: { type: String, min: 2 },
    Img: { type: String, min: 2 },
    Status: {type:String,default:"Active"}
});
module.exports = Mongoose.model('Category', Category);