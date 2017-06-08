var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Gallery = new Schema({
    Title: { type: String, required: 'Title is required' },
    Description: { type: String },
    DisplayPicture: { type: String },
    Status: { type: String, default: 'Active' },
    Store: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:"Please add store id"
    }
    
});
module.exports = Mongoose.model('Gallery', Gallery);