const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let teyit = require("../../models/teyit");
let sunucuayar = require("../../models/sunucuayar");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;

   if (durum || message.member.permissions.has(8)) {
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let teyitData = await teyit.findOne({
        userID: target.id
    }) || {
        userName: []
    };
    
    let embed = new MessageEmbed()
        .setAuthor(target.displayName, target.user.displayAvatarURL({
            dynamic: true
        }))
        .setColor("RANDOM")
        .setDescription(`
${teyitData.userName.length <=0 ? `İsim Geçmişi Bulunamadı.` : `${target} kişisinin toplamda ${teyitData.userName.length} isim kayıtı bulundu.`} 

${teyitData.userName.reverse().splice(0, 10).join("\n")}`)
    message.channel.send(embed)

   }

}
exports.conf = {
    aliases: ["İsimler", "names"]
}
exports.help = {
    name: 'isimler'
}