const { MessageEmbed, Discord } = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
  
    if (message.member.permissions.has(8) || durum) {
        const Role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if (!Role) return message.reply("Lütfen bir rol etiketleyiniz veya Rol ID'si belirtiniz")
         const veri = Role.members.filter(User => !User.voice.channel && User.presence.status !== "offline").map(x => `<@${x.id}>`).join(",");
        message.channel.send(`${veri}`, {code: "md", split: { char: "," }})
      } else return;

}
exports.conf = {aliases: ["sessay", "ses-say", "seslisay"]}
exports.help = {name: 'Sessay'}
