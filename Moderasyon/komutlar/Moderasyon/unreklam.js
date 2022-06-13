const {
	MessageEmbed,
	Discord
} = require("discord.js");
const conf = client.ayarlar
let jailInterval = require("../../models/jailInterval");
let sunucuayar = require("../../models/sunucuayar");
const ceza = require("../../models/ceza");
const otologin = require("../../models/otokayit");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    if (kanal) return;
	let data = await sunucuayar.findOne({guildID: message.guild.id});
	let jailRol = data.JAIL;
	let booster = data.BOOST
	let kayitsizUyeRol = data.UNREGISTER
	let tag = data.TAG;
	let tag2 = data.TAG2
	if (await client.permAyar(message.author.id, message.guild.id, "jail") || durum) {
		let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!target) return message.reply("Lütfen bir kullanıcı belirleyiniz");
		if (!target.roles.cache.get(jailRol)) return message.reply("Etiketlediğiniz kullanıcı zaten jailsiz ?")
		await target.roles.set(kayitsizUyeRol)
		await target.setNickname("• İsim | Yaş")
		message.channel.send(`Başarılı bir şekilde <@${target.id}> adlı kullanıcının jailini kaldırdınız.`)
		await ceza.updateMany({ "userID": target.id, "Ceza": "JAIL" }, { Sebep: "AFFEDILDI", Bitis: Date.now() });
		await jailInterval.deleteOne({userID: target.id})
	} else return
}
exports.conf = {
	aliases: ["Unjail", "cezalıkaldır", "kaldırcezalı", "UNJAİL", "UNJAIL"]
}
exports.help = {
	name: 'unjail'
}