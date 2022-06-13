const stat = require("../../models/stats");
let ms = require("parse-ms");
module.exports.run = async (client, message, args, durum, kanal) => {
if (!message.guild) return;
	let kanallar = ["coin-komut","coin-komut-2"]
	if (!kanallar.includes(message.channel.name)) return message.reply(`${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`).then(x => x.delete({timeout: 10000}));
	let data = await stat.findOne({userID: message.author.id, guildID: message.guild.id});
    let timeout = 1000*60*60*24
    const sayi = Math.floor(Math.random() * 99999) + 1
    let gunluk = data.dailyCoinTime
    if (gunluk !== null && timeout - (Date.now() - gunluk) > 0) {
        let time = ms(timeout - (Date.now() - gunluk));
        message.channel.send(`:stopwatch: **|** Hata! **${message.author.username}** Bu komutu ${time.hours} saat ${time.minutes} dakika ${time.seconds} saniye sonra kullanabilirsin.`)
    } else {
        await stat.updateOne({userID: message.author.id, guildID: message.guild.id}, {$inc: {para: sayi}, $set: {dailyCoinTime: Date.now()}}, {upsert: true})
        message.channel.send(`${client.emojis.cache.find(x => x.name === "reward")} **|** Başarılı bir şekilde günlük ödülünü aldın. (Ödülün: **${sayi}** ${client.emojis.cache.find(x => x.name === "boostcoin")} )`)
    }
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'daily',
    description: 'Etiketlenen kullanıcıya belirli miktarda jail cezası vermektedir',
    usage: 'jail @etiket <sebep>',
    kategori: 'Moderasyon'
  };
