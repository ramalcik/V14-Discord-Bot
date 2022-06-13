let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let banRole = Schema({
    guildID: String,
    BanRole: {type: Array, default: []}
});

module.exports = mongoose.model("banrol", banRole);