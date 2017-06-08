var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Item = new Schema({
    Name: { type: String, required: 'Name is required' },
    Description: { type: String },
    Pictures: [{
        Title: { type: String },
        URL: { type: String }
    }],
    Price: { type: Number,default:0},
    PriceBeforeSale: { type: Number, default: 0 },
    Rate: { type: Number },
    Sold: { type: Number },
    Tags: { type: String },
    Badges: { type: String },
    Status: { type: String, default: 'Active' },
    Gallery: {
        type: Schema.Types.ObjectId,
        ref: 'Gallery',
        required: "Please add gallery id"
    }

});
module.exports = Mongoose.model('Item', Item);