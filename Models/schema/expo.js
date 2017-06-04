var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Expo = new Schema({
    Category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: "Please add category id"
    },
    Title: { type: String, min: 2,required:"please enter title" },
    Banner: { type: String, min: 2 },
    Status: { type: String, default: 'Active' },
    Floors: {
        Name: { type: String },
        Stores: [
    {
        Store: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        Width: { type: Number },
        High: { type: Number },
        Position: { type: Number },
        Img: { type: String, min: 2 },
    }
        ]
    }
});
module.exports = Mongoose.model('Expo', Expo);