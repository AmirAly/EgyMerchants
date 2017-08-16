var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Notification = new Schema({
    Text: { type: String, required: 'notification text is required' },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: "Please enter user id"
    },
    Date: { type: String, default: new Date().getTime() },
    Status: { type: String, default: 'un read' },
    RedirectURL: { type: String, required: 'redirect url is required' }
});
module.exports = Mongoose.model('Notification', Notification);