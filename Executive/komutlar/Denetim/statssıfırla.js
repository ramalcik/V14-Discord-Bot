const {
    MessageEmbed
} = require("discord.js");
require("moment-timezone")
let Stat = require("../../models/stats");
let sunucuayar = require("../../models/sunucuayar");
let xpData = require("../../models/stafxp");
let uyarıData = require("../../models/uyarı");
let puansystem = require("../../models/puansystem");
let taglıData = require("../../models/taglıUye");
let yetkiliDB = require("../../models/yetkili");
let ozelKomut = require("../../models/özelkomut");
let missionSystem = require("../../models/randomMission");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
       let sunucuData = await sunucuayar.findOne({
        guildID: message.guild.id
    }); 
    if (!sunucuData.GKV.includes(message.author.id) && !durum && !client.ayarlar.sahip.includes(message.author.id)) return;

    let sec = args[0];
    if (sec == "üye") {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        Stat.updateOne({
            userID: target.id,
            guildID: message.guild.id
        }, {
            $set: {
				["EtkinlikPuan"]: 0,
                ["yedi.Id"]: target.id,
                ["yedi.Voice"]: {},
                ["yedi.Chat"]: {},
                ["yedi.TagMember"]: 0,
                ["yedi.Invite"]: 0,
                ["yedi.Register"]: 0,
                ["yedi.Yetkili"]: 0,
            }
        }).exec();
        await xpData.updateOne({userID: target.id}, {$set: {currentXP: 0}}, {upsert: true}).exec();
        await ozelKomut.updateMany({guildID: message.guild.id, komutAd: {$exists: true}}, {$pull: {YetkiliData: {Author: target.id}}}).exec();
        await taglıData.deleteMany({Durum: "puan", authorID: target.id}).exec();
		await yetkiliDB.deleteMany({Durum: "puan", authorID: target.id}).exec();
        return message.reply("Başarılı bir şekilde " + target + " adlı kullanıcının puanlarını sıfırladınız.")
    }
    if (sec == "rol") {
        let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        rol.members.map(async target => {
            Stat.updateOne({
                userID: target.id,
                guildID: message.guild.id
            }, {
                $set: {
                    ["EtkinlikPuan"]: 0,
                    ["yedi.Id"]: target.id,
                    ["yedi.Voice"]: {},
                    ["yedi.Chat"]: {},
                    ["yedi.TagMember"]: 0,
                    ["yedi.Invite"]: 0,
                    ["yedi.Register"]: 0,
                    ["yedi.Yetkili"]: 0,
                }
            }).exec();
            await xpData.updateOne({userID: target.id}, {$set: {currentXP: 0}}, {upsert: true}).exec();
            await ozelKomut.updateMany({guildID: message.guild.id, komutAd: {$exists: true}}, {$pull: {YetkiliData: {Author: target.id}}}).exec();
            await taglıData.deleteMany({Durum: "puan", authorID: target.id}).exec();
			await yetkiliDB.deleteMany({Durum: "puan", authorID: target.id}).exec();
            
        })
        return message.reply("Başarılı bir şekilde <@&" + rol.id + "> adlı rolündeki üyelerin puanlarını sıfırladınız.")
    }
}
exports.conf = {
    aliases: ["stat-sıfırla"]
}
exports.help = {
    name: 'stats-sıfırla'
}