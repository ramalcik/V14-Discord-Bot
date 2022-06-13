const Discord = require("discord.js");
const stat = require("../../models/stats");
let limit = new Map();
module.exports.run = async (client, message, args,durum, kanal) => {
    if (!message.guild) return;
	let kanallar = ["coin-komut","coin-komut-2"]
	if (!kanallar.includes(message.channel.name)) return message.reply(`${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`).then(x => x.delete({timeout: 10000}));
		if (limit.get(message.author.id) == "Aktif") return message.reply("10 saniye'de 1 kullanabilirin.");
	limit.set(message.author.id, "Aktif")
	setTimeout(() => {
		limit.delete(message.author.id)
	}, 1000*10)
	
    const data = await stat.findOne({
        userID: message.author.id,
        guildID: message.guild.id
    });

    let durums = ["Tebrikler Kazandın", "Üzgünüm Kaybettin"]

    durums = durums[Math.floor(Math.random() * durums.length)]

    let sec = args[0];



    if (!sec) return message.channel.send(`:no_entry: | **${message.author.username},** Lütfen bir bahis değeri giriniz!!`)
		
	if (sec == "all") {
		        await stat.updateOne({
            userID: message.author.id,
            guildID: message.guild.id
        }, {
            $inc: {
                ["para"]: data.para <= 50000 ? -data.para : -50000
            }
        }, {
            upsert: true
        })
        return message.channel.send(`**${message.author.username}**, **${data.para <= 50000 ? data.para : 50000}** ${client.emojis.cache.find(x => x.name === "reward")} para harcadı.\nMadeni para dönüyor... ${client.emojis.cache.find(x => x.name === "coinflip")}`).then(async mesaj => setTimeout(async () => {
            if (durums === "Tebrikler Kazandın") {
                await stat.updateOne({
                    userID: message.author.id,
                    guildID: message.guild.id
                }, {
                    $inc: {
                        ["para"]: data.para <= 50000 ? data.para*2 : 50000*2
                    }
                }, {
                    upsert: true
                });
                mesaj.edit(`**${message.author.username}**, **${data.para <= 50000 ? data.para : 50000}** ${client.emojis.cache.find(x => x.name === "reward")} para harcadı.\nMadeni para dönüyor... ${client.emojis.cache.find(x => x.name === "coin")} ve 2 katını kazandın!**`)
            } else {
                mesaj.edit(`**${message.author.username}**, **${data.para <= 50000 ? data.para : 50000}** ${client.emojis.cache.find(x => x.name === "reward")} para harcadı.\nMadeni para dönüyor... ${client.emojis.cache.find(x => x.name === "coin")} tüm paranı kaybettin... :c`)
            }
        }, 5000))
	}
	
    if (data.para > Number(args[0]) && Number(args[0]) <= 50000 && Number(args[0]) > 0) {
        await stat.updateOne({
            userID: message.author.id,
            guildID: message.guild.id
        }, {
            $inc: {
                ["para"]: -sec
            }
        }, {
            upsert: true
        })
        message.channel.send(`**${message.author.username}**, **${sec}** ${client.emojis.cache.find(x => x.name === "reward")} para harcadı.\nMadeni para dönüyor... ${client.emojis.cache.find(x => x.name === "coinflip")}`).then(async mesaj => setTimeout(async () => {
            if (durums === "Tebrikler Kazandın") {
                await stat.updateOne({
                    userID: message.author.id,
                    guildID: message.guild.id
                }, {
                    $inc: {
                        ["para"]: sec * 2
                    }
                }, {
                    upsert: true
                });
                mesaj.edit(`**${message.author.username}**, **${sec}** ${client.emojis.cache.find(x => x.name === "reward")} para harcadı.\nMadeni para dönüyor... ${client.emojis.cache.find(x => x.name === "coin")} ve 2 katını kazandın!**`)
            } else {
                mesaj.edit(`**${message.author.username}**, **${sec}** ${client.emojis.cache.find(x => x.name === "reward")} para harcadı.\nMadeni para dönüyor... ${client.emojis.cache.find(x => x.name === "coin")} tüm paranı kaybettin... :c`)
            }
        }, 5000))
    } else {
        message.channel.send(`:no_entry: | **${message.author.username}**, Yeterli miktar da paran yoktur! (Max: 50.000 Tutarında Oynayabilirsin)`)
    }
};



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["coinflip"],
    permLevel: 0
};

exports.help = {
    name: 'cf',
    description: 'Etiketlenen kullanıcıya belirli miktarda jail cezası vermektedir',
    usage: 'jail @etiket <sebep>',
    kategori: 'Moderasyon'
};