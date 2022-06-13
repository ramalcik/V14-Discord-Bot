const {
    MessageEmbed
} = require("discord.js");
const Stat = require("../../models/stats");
const market = require("../../models/market");
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
    const data = await Stat.findOne({userID: message.author.id, guildID: message.guild.id});
    
    if (data.para > 0) {
        await Stat.updateOne({userID: message.author.id, guildID: message.guild.id}, {$inc: {["coin"]: data.para*0.1/100}, $set: {["para"]: 0}})
        message.channel.send(`Başarılı bir şekilde ${data.para} miktar paranızı ${data.para*0.1/100} Coin'e çevirdiniz`);
    }


}
exports.conf = {aliases: ["Bozdur"]}
exports.help = {name: 'bozdur'}