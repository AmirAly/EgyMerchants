var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var Country = new Schema({
    Name: { type: String, min: 2 },
    IsoCode: { type: String, min: 2 },
    Flag: { type: String, min: 2 },
    Imgs: [{ type: String, min: 2 }]
});
module.exports = Mongoose.model('Country', Country);