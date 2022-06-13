const {
    MessageEmbed
} = require("discord.js");
const Stat = require("../../models/stats");
let limit = new Map();
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
		let kanallar = ["coin-komut","coin-komut-2"]
	if (!kanallar.includes(message.channel.name)) return message.reply(`${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`).then(x => x.delete({timeout: 10000}));
	if (limit.get(message.author.id) == "Aktif") return message.reply("10 saniye'de 1 kullanabilirin.");
	limit.set(message.author.id, "Aktif")
	setTimeout(() => {
	limit.delete(message.author.id)
	}, 1000*10)
    let data = await Stat.findOne({userID: message.author.id});
    return message.channel.send(`${message.author}, ${client.emojis.cache.find(x => x.name === "coin")} **${data.para.toFixed(0)}**  paran var bozdurmak için \`.bozdur\` yazarak coin'e çevirebilirsiniz`);
}
exports.conf = {aliases: []}
exports.help = {name: 'para'}
