
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
    if (durum) {
        if (!message.member.voice.channel) return message.reply("Lütfen bir ses kanalına gir");
    let member = message.member.voice.channel.members.array();
    for (let i = 0; i < member.length; i++) {
        const user = member[i];
        if (user.id != message.author.id && !user.permissions.has(268435456)) {
            args[0] == "aç" ? user.voice.setMute(false).catch(() => {}) : user.voice.setMute(true).catch(() => {});
        }
    }
    message.channel.send("Başarılı bir şekilde bulunduğun kanaldaki herkesi susturdum.")
}
}
exports.conf = {aliases: ["herkesi-sustur"]}
exports.help = {name: 'allmute'}
