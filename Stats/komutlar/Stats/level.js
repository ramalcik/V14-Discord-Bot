const {
    Client,
    MessageEmbed,
    MessageAttachment
} = require('discord.js');
const {
    Canvas
} = require('canvas-constructor');
const {
    loadImage
} = require('canvas');
const {
    join
} = require("path");
require("moment-timezone")
let Stat = require("../../models/stats");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		let data = await Stat.findOne({userID: target.id, guildID: message.guild.id});
        let loading = await message.channel.send(`Veriler yükleniyor...`)
                
                const background = await loadImage("https://cdn.discordapp.com/attachments/852824522184065035/962439556249051206/owslarank.png")
				const avatar = await loadImage(target.user.avatarURL({
                    format: "jpg"
                }));
				// Default: 232;
                const image = new Canvas(478, 180)
                    image.printImage(background, 0, 0, 478, 180)
					image.printCircularImage(avatar, 100.5, 64.5, 58.5, 58.5, 5)
                    image.setColor("#fff")
					image.setTextFont('36px Impact Bold')
                    image.printText(`${target.user.tag}`, 8, 170, 150)
					
                    image.setColor("#fff")
					image.setTextFont('14px Arial Black')
                    image.printText(`${data.messageLevel} LvL.`, 380, 110, 150)
					
                    image.setColor("#fff")
					image.setTextFont('14px Arial Black')
                    image.printText(`${data.voiceLevel} LvL.`, 380, 150, 150)
					image.save()
					image.createRoundedClip(214.5, 114, getProgressBarWidth(data.messageXP, data.messageLevel*643, 232), 17, 25)
                    image.setColor("#901bff")
                    image.fill()
                    image.restore()
					image.setColor("#fff")
					image.setTextFont('12px LEMON MILK Bold')
                    image.printText(`${data.messageXP}/${data.messageLevel*643} XP`, 220, 128, 150)
					image.createRoundedClip(214.5, 153.5, getProgressBarWidth(data.voiceXP, data.voiceLevel*643, 232), 17, 25)
                    image.setColor("#901bff")
					image.fill()
					image.restore()
                    image.setColor("#fff")
					image.setTextFont('12px LEMON MILK Bold')
                    image.printText(`${data.voiceXP}/${data.voiceLevel*643} XP`, 220.5, 168, 150)
                const attachment = new MessageAttachment(image.toBuffer(), 'owsla-level.png');
                let embed = new MessageEmbed().setColor("0b7888").attachFiles(attachment).setImage('attachment://owsla-level.png')

        loading.delete();
        message.channel.send(`[ **${target.user.tag}** ] adlı kullanıcının level bilgileri:`, {embed: embed});

}
exports.conf = {
    aliases: ["Level","lvl","Lvl","LvL"]
}
exports.help = {
    name: 'level'
}

function getProgressBarWidth(currentXP, requiredXP, maxWidth) {
    if ((currentXP+0.1) > requiredXP) return maxWidth;

    let width = currentXP <= 0 ? 0 : ((currentXP+0.1) * maxWidth) / requiredXP;
    if (width > maxWidth) width = maxWidth;
    return width;
}