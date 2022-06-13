const mongoose = require("mongoose");
const ms = require("ms");
const statsData = mongoose.Schema({
    sunucuid: {type: String,required: true},
    uyeid: {type: String,required: true},
    Day: {type: Number, default: 0},
    NextUpdate: { type: Number, default: new Date().setHours(24, 0, 0, 0) },
    ses: {type: Object,default: {}},
    mesaj: {type: Object,default: {}},
    mikrofon: {type: Number, default: 0},
    kulaklık: {type: Number, default: 0},
    streamer: {type: Number, default: 0},
    puan: {type: Number,default: 0},
    sesDetay: {type: Object,default: {}},
    mesajDetay: {type: Object,default: {}},
    coin: {type: Number, default: 0},
    para: {type: Number, default: 0},
    xp: {type: Number, default: 0},
    level: {type: Number, default: 0},
    vxp: {type: Number, default: 0},
    vlevel: {type: Number, default: 0},
    dailyCoinTime: {type: Number, default: 0},
    Burç: {type: String, default: ""},
    Oyunlar: {type: Array, default: []},
});

module.exports = mongoose.model("yetkili-stat", statsData);
