// Importing mongoose library
const mongoose = require("mongoose");

// 'sample' should be the collection name in MongoDB
module.exports = mongoose.model('sample',{ //exporting a mongoose model named sample
    // Define Schema of the model
    name: { type: String, required: true },
    college: { type: String, required: true },
    building: { type: String, required: true },
});