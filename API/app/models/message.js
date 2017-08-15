var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Message = new Schema({
    Text: { type: String, required: 'Message text is required' },
    From: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: "Please enter user id"
    },
    To: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: "Please enter user id"
    },
    Date: { type: String, default: new Date().getTime() },
    Status: { type: String, default: 'un read' }
});
module.exports = Mongoose.model('Message', Message);
