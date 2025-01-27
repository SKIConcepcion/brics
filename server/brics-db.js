const mongoose = require("mongoose");
require("dotenv").config({path: "../.env"});
const uri = process.env.BRICS_DB_URI;
// connecting to MongoDB database
module.exports = () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};