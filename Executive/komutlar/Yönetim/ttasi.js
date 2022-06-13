module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
    if (message.member.permissions.has(8) || durum) {
        let kanal_1 = message.guild.channels.cache.get(args[0]);
        let kanal_2 = message.guild.channels.cache.get(args[1]);
        if (kanal_1 && kanal_2) {
        kanal_1.members.array().forEach((member,index) => {
        setTimeout(async () => {
        await member.voice.setChannel(kanal_2)
        },index*1500)
        })
        message.channel.send(`**${kanal_1.members.size}** adet üyeyi başarılı bir şekilde ${kanal_2} kanalına taşıdınız!`)
        } else return message.reply(`Lütfen bir kanal ID'si belirtiniz!`);
    }
};
exports.conf = {aliases: ["ttasi", "ttaşı"]}
exports.help = {name: 'toplu-tasi'}
