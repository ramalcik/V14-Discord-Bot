const mongoose = require("mongoose");

let sorumlulukData = mongoose.Schema({
guildID: {type: String, default: ""},
Ad: {type: String, default: ""},

Kişiler: Array,
});
module.exports = mongoose.model("sorumluluk", sorumlulukData);
