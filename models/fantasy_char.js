const mongoose = require("mongoose");

var fantasyCharSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  gender: String,
  weapon: String
});

module.exports = mongoose.model("fantasyChar", fantasyCharSchema);
