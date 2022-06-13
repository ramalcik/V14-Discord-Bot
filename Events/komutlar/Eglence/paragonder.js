const {
    MessageEmbed
} = require("discord.js");
const Stat = require("../../models/stats");
let limit = new Map();
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
	let kanallar = ["coin-komut","coin-komut-2"]
	if (!kanallar.includes(message.channel.name)) return message.reply(`${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`).then(x => x.delete({timeout: 10000}));
	let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	if (!target) return message.reply("Lütfen bir kullanıcı etiketleyiniz.");
	let data = await Stat.findOne({userID: message.author.id, guildID: message.guild.id});
    if (data.para >= Number(args[1]) && Number(args[1]) > 0) {
		await Stat.updateOne({userID: message.author.id, guildID: message.guild.id}, {$inc: {["para"]: -Number(args[1])}});
		await Stat.updateOne({userID: target.id, guildID: message.guild.id}, {$inc: {["para"]: Number(args[1])}});
        message.channel.send(`:credit_card: | **${message.author.username}** adlı üye **${target.user.username}** adlı kişiye **${args[1]}** miktar para gönderdi `)
    } else {
        message.channel.send(`:no_entry: | **${message.author.username}**, Dostum paran yoktur ne yapıyon fakir misin eziQ AKSDGPOAKSDGOPADS!`)
    }

}
exports.conf = {aliases: ["paragonder","send","para-gönder","paragönder"]}
exports.help = {name: 'pgonder'}
