const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const data = Schema({

    guildID: String,
    Katılanlar: {type: Array, default: []},
    Katılmayanlar: {type: Array, default: []},

});

module.exports = mongoose.model("yoklama", data);