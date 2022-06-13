const mongoose = require("mongoose");

const data = mongoose.Schema({
    Spotify: Array,
    Netflix: Array,
    Exxen: Array,
    BluTV: Array,
    Nitro: Array,
    Boost: Array
})

module.exports = mongoose.model("market", data);