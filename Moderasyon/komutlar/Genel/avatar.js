
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    let user = args.length > 0 ? message.mentions.users.first() || await this.client.users.fetch(args[0]) || message.author : message.author
    message.channel.send(`${user.tag} ${user.displayAvatarURL({ dynamic: true, size: 4096 })}`)

}
exports.conf = {aliases: ["Avatar", "pp"]}
exports.help = {name: 'avatar'}
