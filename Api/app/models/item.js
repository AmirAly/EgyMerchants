var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Item = new Schema({
    Name: { type: String, required: 'Name is required' },
    Description: { type: String },
    Pictures: [{
        Title: { type: String },
        URL: { type: String }
    }],
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