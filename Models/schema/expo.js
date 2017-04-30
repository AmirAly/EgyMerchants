var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Expo = new Schema({
    Category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: "Please add proper id"
    }],
    Title: { type: String, min: 2 },
    Banner: { type: String, min: 2 },
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