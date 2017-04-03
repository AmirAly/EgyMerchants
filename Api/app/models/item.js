var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Item = new Schema({
    Name: { type: String, required: 'Name is required' },
    Description: { type: String },
    Pictures: [{
        Title: { type: String },
        URL: { type: String }
    }],
    Merchant: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant',
        required: "Please add merchant id"
    },
    Gallery: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant',
        required: "Please add merchant id"
    }

});
module.exports = Mongoose.model('Item', Item);