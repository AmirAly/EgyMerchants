var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Gallery = new Schema({
    Title: { type: String, required: 'Name is required' },
    Description: { type: String },
    DisplayPicture: { type: String },
    FeaturedPhoto: { type: String },
    Status: { type: String, default: 'Active' },
    Merchant: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant',
        required:"Please add merchant id"
    }
    
});
module.exports = Mongoose.model('Gallery', Gallery);