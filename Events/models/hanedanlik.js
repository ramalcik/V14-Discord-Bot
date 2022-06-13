const mongoose = require("mongoose");

const data = mongoose.Schema({
    userID: String,
    Lider: String,
    guildID: String,
    channel: Object,
    Mesaj: Number,
    Taglı: Number,
    Yetkili: Number,
    Davet: Number,
    Like: Number
});


module.exports = mongoose.model("hanedanlik", data);