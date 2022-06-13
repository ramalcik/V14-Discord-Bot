const {
	MessageEmbed,
	Discord
} = require("discord.js");
let sunucuayar = require("../../models/sunucuayar");
let uyarı = require("../../models/uyarı");
let moment = require("moment");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
	let data = await sunucuayar.findOne({});
	if (durum) {
		

		if (args[0] === "bak") {
			let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			if (!target) return message.reply("Lütfen bir kullanıcı belirleyiniz");
			let miktar = await uyarı.find({userID: target.id})
			let embed = new MessageEmbed()
			.setColor("RANDOM")
			.setTimestamp()
			.setAuthor(target.user.tag, target.user.avatarURL({dynamic: true}))
			.setFooter(client.ayarlar.footer)
			.setDescription(`
${target} adlı kişinin son 10 uyarıları (Toplam: **${miktar.length}** uyarı almış!)

${miktar.reverse().map(veri => `[\`${moment(veri.Type.Tarih).locale("tr").format("LLL")}\`] <@!${veri.Type.Yetkili}> yetkili tarafından **${veri.Type.Sebep}** sebebiyle uyarı aldı!`).slice(0,10).join("\n")}
		 	`)
			 return message.channel.send(embed)
		}

		let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		let reason = args.splice(1).join(" ");
		if (!target) return message.reply("Lütfen bir kullanıcı belirleyiniz");
		if (!reason) return message.reply("Lütfen bir uyarı sebebi belirtiniz.")
		let miktar = await uyarı.find({userID: target.id})
		miktar = miktar.length;
		let newData = uyarı({
			userID: target.id,
			Type: {Sebep: reason, Tarih: Date.now(), Yetkili: message.author.id}
		})
		newData.save().then(data => {
			if (!data) return;
			message.channel.send(`Başarılı bir şekilde <@${data.userID}> adlı üye ${data.Type.Sebep} sebebiyle ${moment(data.Type.Tarih).locale("tr").format("LLL")} tarihinde ${miktar+1} adet uyarı aldı`)
		})
	} else return client.Embed(message.channel.id, `Bu komutu kullanabilmek için Yönetici ya da Jail Sorumlusu olmalısınız!`)
}
exports.conf = {
	aliases: ["uyar"]
}
exports.help = {
	name: 'uyarı'
}