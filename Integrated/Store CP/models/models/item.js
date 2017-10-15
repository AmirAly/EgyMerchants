var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Item = new Schema({
    Name: { type: String, required: 'Name is required',min:2,max:50 },
    Description: { type: String,min:2},
    Pictures: [{
        Title: { type: String },
        URL: { type: String }
    }],
    Price: { type: Number,default:0},
    PriceBeforeSale: { type: Number, default:0},
    Rate: { type: Number },
    Sold: { type: Number },
    Tags: [{ type: String }],
    Badges: { type: String },
    Status: { type: String, default: 'Active' },
    Gallery: {
        type: Schema.Types.ObjectId,
        ref: 'Gallery',
        required: "Please add gallery id"
    },
    Store: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: "Please add store id"
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: "Please add store id"
    }

});
module.exports = Mongoose.model('Item', Item);