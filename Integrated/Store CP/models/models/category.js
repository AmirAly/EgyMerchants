var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Category = new Schema({
<<<<<<< HEAD
    Name: { type: String, min: 2, max: 50, required: "please enter name" },
=======
    Name: { type: String, min:2,max:50, required: "please enter name" },
>>>>>>> 8c81e9edf18d987302795c7d1f2a25fca82758a7
    Country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    Status: { type: String, default: "Active" }
});
module.exports = Mongoose.model('Category', Category);