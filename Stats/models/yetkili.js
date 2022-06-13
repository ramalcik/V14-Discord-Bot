let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let yetkiliData = Schema({

    Tarih: {type: Number, default: Date.now()},
    userID: {type: String, default: ""},
    authorID: {type: String, default: ""},
    Durum: {type: String, default: "puan"}

});

module.exports = mongoose.model("yetkiliData", yetkiliData)