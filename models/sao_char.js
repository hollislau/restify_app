const mongoose = require("mongoose");

var saoCharSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  gender: String,
  weapon: String
});

module.exports = mongoose.model("saoChar", saoCharSchema);
