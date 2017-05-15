var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Item = new Schema({
    Name: { type: String, required: 'Name is required' },
    Description: { type: String },
    Pictures: [{
        Title: { type: String },
        URL: { type: String }
    }],
    Price: { type: Number },
    PriceBeforeSale: { type: Number },
    Rate: { type: Number },
    Sold: { type: Number },
    Tags: { type: String },
    Badges: { type: String },
    Store: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: "Please add store id"
    },
    Gallery: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: "Please add gallery id"
    }

});
module.exports = Mongoose.model('Item', Item);