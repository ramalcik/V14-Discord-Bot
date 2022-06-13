const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let yetkiDATA = require("../../models/yetkili");
const hanedan = require("../../models/hanedanlik");
let Stat2 = require("../../models/stats");
let limit = new Map();
const moment = require("moment");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    
	let sdata = await sunucuayar.findOne({guildID: message.guild.id});
    if (durum) {
        if (args[0] == "top") {
            let data = await yetkiDATA.find({
                Durum: "stat"
            });
            let kayitcilar = {};
            data.forEach((value) => {
                if (kayitcilar[value.authorID]) kayitcilar[value.authorID] += 1;
                else kayitcilar[value.authorID] = 1
            })
            let sirali = Object.keys(kayitcilar).sort((a, b) => kayitcilar[b] - kayitcilar[a]).map(e => ({
                User: e,
                Value: kayitcilar[e]
            }))
            sirali = sirali.map((user, index) => `**${index+1}.** <@${user.User}> \`${user.Value} Yetkili.\``).splice(0, 30)
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter(conf.footer)
                .setAuthor(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setDescription(`Top 25 Yetki aldırma sıralaması aşağıda belirtilmiştir.\n\n${sirali.length > 0 ? sirali.join("\n") : "Veri yoktur"}`)
            return message.channel.send(embed)
        }
		  if (args[0] == "bak") {
			  
			  let kisi = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			  if (!kisi) return message.reply("Lütfen bir kişi etiketleyiniz.");
			  
			  
            let data = await yetkiDATA.find({
				authorID: kisi.id,
                Durum: "stat"
            });
			let embed = new MessageEmbed()
			.setColor("RANDOM")
			.setTimestamp()
			.setFooter(client.ayarlar.footer)
			.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
			.setDescription(`
${data.filter(veri => message.guild.members.cache.get(veri.userID) && message.guild.members.cache.get(veri.userID).user.username.includes(sdata.TAG)).map((veri, index) => `<@!${veri.userID}>: ${moment(veri.Tarih).locale("tr").format("LLL")}`).join("\n")}
`)
			
            return message.channel.send(embed)
        }
		
				  if (args[0] == "sorgula") {
			  
			  let kisi = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			  if (!kisi) return message.reply("Lütfen bir kişi etiketleyiniz.");
			  
			  
            let data = await yetkiDATA.findOne({
				userID: kisi.id,
                Durum: "stat"
            });
			if (!data) return message.reply("Etiketlediğin kullanıcı komut ile yetkiye alınmamış.")

            return message.channel.send(`${kisi} (\`${kisi.id}\`) adlı yetkili; ${moment(data.Tarih).locale("tr").format("LLL")} tarihinde <@${data.authorID}> (\`${data.authorID}\`) adlı yetkili tarafından yetkiye alınmış.`)
        }
		
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply("Lütfen bir kullanıcı etiketleyiniz!");
        if (target.id === message.author.id) return message.react(client.emojis.cache.find(x => x.name === "axze_iptal"))
        if ((limit.get(target.id) || 0) >= 3) return message.reply("Bu kullanıcıya sadece 1 kişi yetki aldırabilir.")
        if (Date.now() - target.user.createdAt <= 1000*60*60*24*7) return message.reply("Lütfen 7 günden kısa sürede açılan hesapları yetkili yapmayı deneyiniz.").then(x => x.delete({timeout: 5000}));
        limit.set(target.id, (limit.get(target.id) || 0)+1);
		setTimeout(() => {
			limit.delete(target.id)
		}, 1000*60);
        await yetkiDATA.findOne({
            userID: target.id,
            Durum: "stat"
        }, async (err, res) => {
            if (!res)
                return message.reply(`Bu komutu sadece 5 dakika içerisinde yetki verilen kullanıcılara kullanabilirsiniz.`);
            if (res.authorID != "x")
                return message.reply(`Yetki aldırmaya çalıştığın üye farklı bir yetkili tarafından zaten yetkiye alınmış!`);
                    await message.channel.send(`${message.author}, Başarılı bir şekilde ${target} adlı üyeye yetki aldırdığınızı doğruladınız.`);
                    message.react(client.emojis.cache.find(x => x.name === "axze_tik"));
                    client.channels.cache.get(client.ayarlar.YETKI_VER_LOG).send(`${message.author} adlı yetkili ${target} adlı üyeye başarılı bir şekilde yetki aldırdı.`)
                    res.authorID = message.author.id, res.save();
                    hanedan.findOne({userID: message.author.id, guildID:client.ayarlar.sunucuId}, (err, hanedanData) => {
                        if (!hanedanData) return;
                        hanedan.updateOne({userID: message.author.id, guildID: client.ayarlar.sunucuId}, {
                          $inc: {
                            [`Yetkili`]: 1,
                          }
                        }, {upsert: true}).exec()
                    });
					if (sdata.Etkinlik === true) {
						await Stat2.updateOne({userID: message.author.id}, {$inc: {["puan"]: 30}})
					}
                    await yetkiDATA.updateMany({userID: target.id}, {$set: {authorID: message.author.id}}, {upsert: true})
                    await Stat2.updateOne({userID: message.author.id}, {$inc: {["coin"]:45}})

        });
    } else return message.reply("Bu Komutu Kullanabilmek için Yönetici ya da Kayıt Sorumlusu olman gerekiyor!")
}
exports.conf = {
    aliases: ["Yetkili"]
}
exports.help = {
    name: 'yetkili'
}
