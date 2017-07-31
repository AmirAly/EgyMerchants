var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Comment = new Schema({
    Item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    Text: { type: String, required: 'Message text is required' },
    Date: { type: String, default: new Date() }
});
module.exports = Mongoose.model('Comment', Comment);