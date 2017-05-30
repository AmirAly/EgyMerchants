var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Message = new Schema({
    Text: { type: String },
    Date: { type: String, default: new Date().getTime() },
    //From: {
    //    type: Schema.Types.ObjectId,
    //    ref: 'User',
    //},
    //To: {
    //    type: Schema.Types.ObjectId,
    //    ref: 'Store',
    //},
});
module.exports = Mongoose.model('Message', Message);
