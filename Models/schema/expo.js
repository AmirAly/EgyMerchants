var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Expo = new Schema({
    Categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: "Please add category id"
    }],
    Title: { type: String, min: 2 },
    Banner: { type: String, min: 2 },
    Status: { type: String, default: 'Active' },
    Sections: [
        {
            Store: {
                type: Schema.Types.ObjectId,
                ref: 'Store'
            },
            Img: { type: String, min: 2 },
        }
    ],
});
module.exports = Mongoose.model('Expo', Expo);