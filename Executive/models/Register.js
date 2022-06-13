const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  user: String,
  name: String,
  age: String,
  about: String,
  burç: String,
  instagram: String,
});

module.exports = model("Register", schema);