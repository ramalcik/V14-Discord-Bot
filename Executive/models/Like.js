const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  user: String,
  like: { type: Number, default: 0 }
});

module.exports = model("Like", schema);