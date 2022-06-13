const {
    MessageEmbed
} = require("discord.js");
const Stat = require("../../models/stats");
let datas = new Map();
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

    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!target) return message.reply("Lütfen bir kullanıcı etiketleyiniz.").then(x => x.delete({
        timeout: 5000
    }));
    if (target.id === message.author.id) return message.reply(":D?");
    if (!args[1]) return message.reply("Lütfen bir para miktarı giriniz (`Girdiğiniz değer 0'dan büyük olması gerekiyor`)");
    if (args[1] <= 0) return message.reply("Lütfen bir para miktarı giriniz (`Girdiğiniz değer 0'dan büyük olması gerekiyor`)");
    if ((datas.get(target.id) == "Aktif")) return message.reply("Bu kişinin şuan da aktif bir isteği var lütfen bekleyiniz!")
    datas.set(target.id, "Aktif");
    datas.set(message.author.id, "Aktif");
    setTimeout(() => {
        if (datas.get(target.id) == "Savaşta") return;
        datas.delete(target.id)
        datas.delete(message.author.id)
    },1000*30)
    let data_1 = await Stat.findOne({
        userID: message.author.id,
        guildID: message.guild.id
    });
    let data_2 = await Stat.findOne({
        userID: target.id,
        guildID: message.guild.id
    });
    if (data_1.para > args[1] && data_2.para > args[1]) {
        message.channel.send(`${target} merhaba dostum ${message.author} sana **${args[1]}** değerinde düello meydanı yolladı kabul etmek istiyorsan emojiye dokun ve savaşa başla!`).then(async mesaj => {
            await mesaj.react("✅")
            await mesaj.react("🛑")
            const bir = (reaction, user) => reaction.emoji.name === "✅" && user.id == target.id;
            const birID = mesaj.createReactionCollector(bir, {
                max: 1,
                time: 30000,
                error: ['time']
            });
            const iki = (reaction, user) => reaction.emoji.name === "🛑" && user.id == target.id;
            const ikiID = mesaj.createReactionCollector(iki, {
                max: 1,
                time: 30000,
                error: ['time']
            });
            birID.on("collect", async (r, user) => {
                datas.set(target.id, "Savaşta");
                datas.set(message.author.id, "Savaşta");
                mesaj.delete({
                    timeout: 100
                })
                await Stat.updateOne({
                    userID: message.author.id,
                    guildID: message.guild.id
                }, {
                    $inc: {
                        ["para"]: -args[1]
                    }
                });
                await Stat.updateOne({
                    userID: target.id,
                    guildID: message.guild.id
                }, {
                    $inc: {
                        ["para"]: -args[1]
                    }
                });
                let embed = new MessageEmbed()
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setAuthor("Düello", message.guild.iconURL({
                        dynamic: true
                    }))
                let msg = await message.channel.send(embed.setDescription("Düello 5 saniye içerisinde başlıyor..."))
                let can = 230;
                let can2 = 230;
                let arr = [true, false];
                let check = arr[Math.floor(Math.random() * arr.length)]
                let veri = setInterval(async () => {
                    if (can <= 0) {
                        msg.edit(embed.setDescription(`
**Ödül**
${args[1]*2} ${client.emojis.cache.find(x => x.name == "dcoin")}

${target} => ${can} 💜
${message.author} => ${can2} 💜

Savaş sona erdi ${message.author} kazandı! Ödül **${args[1]*2}** ${client.emojis.cache.find(x => x.name == "dcoin")}
`))
                        await Stat.updateOne({
                            userID: message.author.id,
                            guildID: message.guild.id
                        }, {
                            $inc: {
                                ["para"]: args[1] * 2
                            }
                        });
                        clearInterval(veri);
                        msg.delete({timeout: 15000})
                        return;
                    }
                    if (can2 <= 0) {
                        msg.edit(embed.setDescription(`
**Ödül**
${args[1]*2} ${client.emojis.cache.find(x => x.name == "dcoin")}

${target} => ${can} 💜
${message.author} => ${can2} 💜

Savaş sona erdi ${target} kazandı! Ödül **${args[1]*2}** ${client.emojis.cache.find(x => x.name == "dcoin")}
`))
                        await Stat.updateOne({
                            userID: target.id,
                            guildID: message.guild.id
                        }, {
                            $inc: {
                                ["para"]: args[1] * 2
                            }
                        });
                        clearInterval(veri);
                        msg.delete({timeout: 15000})
                        return;
                    }
                    if (check) {
                        const dmg = Math.floor(Math.random() * 85) + 1
                        can -= dmg
                        msg.edit(embed.setDescription(`
**Ödül**
**${args[1]*2}** ${client.emojis.cache.find(x => x.name == "dcoin")}

${message.author} adlı üye ${target} adlı üyeye **${dmg}** hasar verdi!

${target} => ${can} 💜
${message.author} => ${can2} 💜

Savaş devam ediyor...
`));
                        check = false;
                    } else {
                        const dmg = Math.floor(Math.random() * 85) + 1
                        can2 -= dmg
                        msg.edit(embed.setDescription(`
**Ödül**
**${args[1]*2}** ${client.emojis.cache.find(x => x.name == "dcoin")}

${target} adlı üye ${message.author} adlı üyeye **${dmg}** hasar verdi!

${target} => ${can} 💜
${message.author} => ${can2} 💜

Savaş devam ediyor...
`));
                        check = true
                    }
                }, 2500);
            });
            ikiID.on("collect", async (r, user) => {
                datas.delete(target.id);
                datas.delete(message.author.id);
                mesaj.delete({
                    timeout: 100
                })
                return message.channel.send(`${target} adlı kişi ${message.author} adlı kişinin düellosunu reddetti! **KORKAK**`);
            });
        });

    } else return message.reply(`Sizin veya teklif ettiğiniz kişinin hesabında **${args[1]}** miktar para bulunmamakta. Lütfen teklif değerini düşürün veya para kazanınca oynayın!`);
}
exports.conf = {
    aliases: ["duello"]
}
exports.help = {
    name: 'Duello'
}