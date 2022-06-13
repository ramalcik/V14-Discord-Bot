const { MessageEmbed, Discord } = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let zaman = new Map();
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
	if (zaman.get(message.author.id) >= 1) return message.reply("Bu komutu 4 saatte bir kullanabilirsin.");
	zaman.set(message.author.id, (zaman.get(message.author.id) || 1));
	setTimeout(() => {
		zaman.delete(message.author.id)
	}, 1000 * 60 * 60 * 4)

    let data = await sunucuayar.findOne({});

    let tag = data.TAG
    let tag2 = data.TAG2 || tag;
    let rol = data.BOOST;
    if (!message.member.roles.cache.has(rol) && !message.member.permissions.has(8)) return message.reply("Bu komutu kullanabilmek için gerekli izne sahip değilsin!");
    var isim = args.slice(0).join(" ");
    if(!isim) return message.reply("Yeni adını girmelisin.");
    message.member.setNickname(`${message.member.user.username.includes(tag) ? tag : tag2} ${isim}`).catch(() => {});
    message.react(`${client.emojis.cache.find(x => x.name === "axze_tik")}`);
}
exports.conf = {aliases: ["boostme", "bme", "booster","zengin"]}
exports.help = {name: 'boost'}
