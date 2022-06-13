const {
    Schema,
    model
  } = require("mongoose");
  
  const data = Schema({
    user: {type: String,required: true},
    guild: {type: String,required: true},
    level: {type: Object,default: {}}, // level.message.xp - level.voice.xp - level.message.level - level.message.nextLevel
  });
  
  module.exports = model("profilmanager", data);