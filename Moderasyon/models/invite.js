const mongoose = require('mongoose');

const inviterSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: {type: String, default: ""},
  userID: {type: String, default: ""},
  inviterID: {type: String, default: ""},
  regular: {type: Number, default:0},
  bonus: {type: Number, default: 0},
  fake: {type: Number, default: 0}
});

module.exports = mongoose.model("Invites", inviterSchema);