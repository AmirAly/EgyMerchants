var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Comment = new Schema({
    Item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: "Please enter item id"
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: "Please enter user id"
    },
    Text: { type: String, required: 'comment text is required' },
    Date: { type: String, default: new Date().getTime() }
	//Date:{ type : Date, default: Date.now }
});
module.exports = Mongoose.model('Comment', Comment);