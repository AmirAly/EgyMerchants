var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Expo = new Schema({
    Category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: "Please enter category id"
    },
    Title: { type: String, min: 2,required:"please enter title" },
    Banner: { type: String, min: 2 },
    Status: { type: String, default: 'Active' },
    Floors:[{
        Name: { type: String },
        Sections: [{}],
        Coordinates: [{
            Store: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: "Please enter store id"
            }
        }],
    }]
});
module.exports = Mongoose.model('Expo', Expo);