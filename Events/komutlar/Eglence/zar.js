const {
    MessageEmbed
} = require("discord.js");
const Stat = require("../../models/stats");
let limit = new Map();
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
	const random = Math.floor(Math.random()*99)+1;
    let data = await Stat.findOne({userID: message.author.id});
    return message.channel.send(`${message.author} :game_die: Zar attı ve çıkan sayı **${random}**`);
}
exports.conf = {aliases: ["Zar"]}
exports.help = {name: 'zar'}
