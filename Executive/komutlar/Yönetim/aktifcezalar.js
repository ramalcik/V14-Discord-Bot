
let jailInterval = require("../../models/jailInterval");
let muteInterval = require("../../models/muteInterval");
let vmuteInterval = require("../../models/vmuteInterval");
let reklamInterval = require("../../models/reklamInterval");
let dcInterval = require("../../models/dcInterval");
let vkInterval = require("../../models/vkInterval");
let stInterval = require("../../models/stInterval");
let sunucuayar = require("../../models/sunucuayar");
let otologin = require("../../models/otokayit");
const moment = require("moment");
let { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    if (durum) {
        let sdata = await sunucuayar.findOne({guildID: message.guild.id});
        
        let sec = args[0];

        if (!sec) {
            let muted = await muteInterval.find({});
            let vmuted = await vmuteInterval.find({});
            let jailed = await jailInterval.find({});
            let reklam = await reklamInterval.find({});
            let dc = await dcInterval.find({});
            let vk = await vkInterval.find({});
            let st = await stInterval.find({});
            let karantina = message.guild.members.cache.filter(member => Date.now() - member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7).size

            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
            .setTimestamp()
            .setFooter(client.ayarlar.footer)
            .setDescription(`
Sunucuda toplam da **${(muted.length)+(vmuted.length)+(jailed.length)+(reklam.length)+(dc.length)+(vk.length)+(st.length)}** ceza-i işlem yapılmış.

Mute cezası alan **${muted.length}** kişi görünmektedir.
Ses Mute cezası alan **${vmuted.length}** kişi görünmektedir.
Jail cezası alan **${jailed.length}** kişi görünmektedir. Bu kişilerden **${jailed.filter(x => x.endDate == null).length}** kişi kalıcı olarak cezalandırılmıştır.
Reklam cezası alan **${reklam.length}** kişi görünmektedir.
DC-Cezalı cezası alan **${dc.length}** kişi görünmektedir.
VK-Cezalı cezası alan **${vk.length}** kişi görünmektedir.
Streamer-Cezalı cezası alan **${st.length}** kişi görünmektedir.
Toplamda **${karantina}** kişi hesabını **7 Gün**'den önce açılmış.
            `)
            return message.channel.send(embed)
        }

        if (sec == "mute") {
            let muted = await muteInterval.find({"muted": true});
            message.channel.send(`${muted.length > 0 ? muted.map(x => `<@${x.userID}> - Bitiş Süresi ${moment(x.endDate).locale("tr").format("LLL")}`).join("\n") : "Aktif Mute Cezası Görüntülenemiyor"}`, {split: true})
        }
        if (sec == "vmute") {
            let muted = await vmuteInterval.find({"muted": true});
            message.channel.send(`${muted.length > 0 ? muted.map(x => `<@${x.userID}> - Bitiş Süresi ${moment(x.endDate).locale("tr").format("LLL")}`).join("\n") : "Aktif Mute Cezası Görüntülenemiyor"}`, {split: true})
        }
        if (sec == "jail") {
            let jailed = await jailInterval.find({"jailed": true});
            message.channel.send(`${jailed.length > 0 ? jailed.filter(x => x.endDate != null).map(x => `<@${x.userID}> - Bitiş Süresi ${x.endDate == null ? "KALICI" : moment(x.endDate).locale("tr").format("LLL")}`).join("\n") : "Aktif Mute Cezası Görüntülenemiyor"}`, {split: true})
        }
        if (sec == "kaldır") {
            let muted = await muteInterval.find({
                "muted": true,
                "endDate": {
                    $lte: Date.now()
                }
            });
            let vmuted = await vmuteInterval.find({
                "muted": true,
                "endDate": {
                    $lte: Date.now()
                }
            });
            let jailed = await jailInterval.find({
                "jailed": true,
                "endDate": {
                    $lte: Date.now()
                }
            });
            muted.forEach(async (data, index) => {
                let member = message.guild.members.cache.get(data.userID);
                if (!member) return message.channel.send(`(\`${data.userID}\`) adlı üyenin süresi dolduğu için verileri sıfırlandı`);muteInterval.deleteOne({userID: data.userID}).exec();
                setTimeout(async () => {
                    muteInterval.deleteOne({userID: data.userID}).exec();
                    message.channel.send(`<@${data.userID}> (\`${data.userID}\`) adlı üyenin süresi dolduğu için verileri sıfırlandı`);
                    await member.roles.remove(sdata.MUTED);
                }, index*1000);
            });
            vmuted.forEach(async (data, index) => {
                let member = message.guild.members.cache.get(data.userID);
                if (!member) return message.channel.send(`(\`${data.userID}\`) adlı üyenin süresi dolduğu için verileri sıfırlandı`);vmuteInterval.deleteOne({userID: data.userID}).exec();
                setTimeout(async () => {
                    vmuteInterval.deleteOne({userID: data.userID}).exec();
                    message.channel.send(`<@${data.userID}> (\`${data.userID}\`) adlı üyenin süresi dolduğu için verileri sıfırlandı`);
                    await member.roles.remove(sdata.VMUTED);
                }, index*1000);
            });
            jailed.forEach(async (data, index) => {
                let member = message.guild.members.cache.get(data.userID);
                if (!member) return message.channel.send(`(\`${data.userID}\`) adlı üyenin süresi dolduğu için verileri sıfırlandı`);jailInterval.deleteOne({userID: data.userID}).exec();
                setTimeout(async () => {
                    jailInterval.deleteOne({userID: data.userID}).exec();
                    message.channel.send(`<@${data.userID}> (\`${data.userID}\`) adlı üyenin süresi dolduğu için verileri sıfırlandı`);
                    await member.roles.set(member.roles.cache.get(sdata.BOOST) ? sdata.UNREGISTER.push(sdata.BOOST) : sdata.UNREGISTER);
                }, index*1000);
            });
        };



    }
    
};

exports.conf = {
    aliases: ["Aktifcezalar"]
};
exports.help = {
    name: 'aktifcezalar'
};