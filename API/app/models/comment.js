var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Comment = new Schema({
    Text: { type: String, min: 2 },
    Date:{ type: String, default: new Date().getTime() },
    User:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    Item:{
        type: Schema.Types.ObjectId,
        ref: 'Item',
    },
});
module.exports = Mongoose.model('Comment', Comment);