const {
    MessageEmbed
} = require("discord.js");
let easyMiss = require("../../models/easyMission");
let ms = require("ms");
let moment = require("moment");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    let sec = args[0];
            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(client.ayarlar.footer)
            .setAuthor(message.guild.name, message.guild.iconURL({
                dynamic: true
            }))
    if (message.member.permissions.has(8) || durum) {

        

        if (["ver", "oluştur", "ekle"].includes(sec)) {
            let arr = ["davet", "mesaj", "ses", "taglı", "teyit"];
            let rols = args[1].replace("<@&","").replace(">","")
            let rol = message.guild.roles.cache.get(rols);
            if (!rol) return message.reply("Lütfen görev vermek istediğiniz rolü etiketleyiniz veya ID'sini giriniz");
            if (!arr.includes(args[2])) return message.reply("Lütfen bir görev türü belirleyiniz. `" + arr.map(x => `${x}`).join(" - ") + "` şeklinde seçim yapabilirsiniz.")
            if (!Number(args[3])) return message.reply("Lütfen bir miktar belirleyiniz.");
            if (!args[4]) return message.reply("Lütfen bir süre belirleyiniz. `1h (saat) - 1d (gün) - 1w (hafta) - 1M (ay)`");
           rol.members.map(async target => {
            easyMiss.updateOne({
                userID: target.id
            }, {
                $set: {
                    userID: target.id,
                    Check: 0,
                    Mission: {
                        Author: message.author.id,
                        Type: args[2],
                        Amount: args[2] == "ses" ? Number((1000 * 60 * args[3])) : Number(args[3])
                    },
                    Time: Number(Date.now() + ms(args[4]))
                }
            }, {
                upsert: true
            }).exec();
            message.channel.send(`Başarılı bir şekilde ${target} adlı üyeye **${args[2]}** adlı görevi **${args[4].replace("h", " Saat").replace("d", " Gün").replace("w"," Hafta").replace("m"," Dakika")}** zaman içerisinde yapması için görevlendirdin.`)
           })

        }
        if (["bilgi", "bak", "Bak", "info"].includes(sec)) {
            let target = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.author;
            if (!target) return message.reply("Lütfen görev vermek istediğiniz kullanıcıyı etiketleyiniz veya ID'sini giriniz");
            let data = await easyMiss.findOne({
                userID: target.id
            });
            if (!data) return message.reply("Bakmaya çalıştığınız üye görevlendirilmemiş");
            message.channel.send(embed.setDescription(`
${message.guild.members.cache.get(data.userID)} (\`${data.userID}\`) adlı kullanıcının görevi aşağıda belirtilmiştir.

Görevi Veren Yetkili: <@!${data.Mission.Author}> (\`${data.Mission.Author}\`)
Görev Durumu: \`${data.Check >= data.Mission.Amount ? "Bitti": "Devam Ediyor"}\`
Görev Türü: \`${data.Mission.Type}\`
Yapılan Miktar: \`${data.Mission.Type == "ses" ? (data.Check/(1000*60*60)).toFixed(0)+" saat" : data.Check}\`
İstenilen Miktar: \`${data.Mission.Type == "ses" ? (data.Mission.Amount/(1000*60*60)).toFixed(0)+" saat" : data.Mission.Amount}\`
Görev Süresi: \`${moment(data.Time).locale("tr").fromNow()} bitiyor\`
Görev Bitiş Tarihi: \`${moment(data.Time).locale("tr").format("LLL")}\`

${client.emojis.cache.find(x => x.name == "yildiz")} **İlerleme**
- Yapılan: \`${data.Mission.Type == "ses" ? (data.Check/(1000*60*60)).toFixed(0) : data.Check}\` Yapılması Gereken: \`${data.Mission.Type == "ses" ? (data.Mission.Amount/(1000*60*60)).toFixed(0) : data.Mission.Amount}\`
${progressBar(data.Check, data.Mission.Amount, 8)} \`${data.Mission.Type == "ses" ? (data.Check/(1000*60*60)).toFixed(0) : data.Check} / ${data.Mission.Type == "ses" ? (data.Mission.Amount/(1000*60*60)).toFixed(0) : data.Mission.Amount}\`
`))
        }
        if (["yapanlar", "tamamlayanlar", "durum", "top"].includes(sec)) {
            let data = await easyMiss.find({});

            let görevYapanlar = data.filter(data => data.Check >= data.Mission.Amount).map((user, index) => `\`${index+1} -\` <@!${user.userID}> - **${user.Mission.Type}** - \`${user.Mission.Type == "ses" ? (user.Check/(1000*60*60)).toFixed(0) : user.Check} / ${user.Mission.Type == "ses" ? (user.Mission.Amount).toFixed(0)+" saat" : user.Mission.Amount}\``).join("\n");
            let devamEdenGörev = data.filter(data => data.Check < data.Mission.Amount).map((user, index) => `\`${index+1} -\` <@!${user.userID}> - **${user.Mission.Type}** - \`${user.Mission.Type == "ses" ? (user.Check/(1000*60*60)).toFixed(0) : user.Check} / ${user.Mission.Type == "ses" ? (user.Mission.Amount).toFixed(0)+"  saat" : user.Mission.Amount}\``).join("\n");
            message.channel.send(embed.setDescription(`
Toplam da **${data.length}** aktif görev bulunmakta.
Bu görevlerin **${data.filter(x => x.Check >= x.Mission.Amount).length}** tanesi yapılmış. **${data.length-data.filter(x => x.Check >= x.Mission.Amount).length}** tane görev de hala devam etmektedir.
`)
.addField(`Görev Yapanlar`, `${görevYapanlar ? görevYapanlar : "Yapılan görev bulunmamakta"}`)
.addField(`Devam Eden Görevler`, `${devamEdenGörev}`))

        }
        if (["sil"].includes(sec)) {
            let data = await easyMiss.find({});
            let sec2 = args[1];
            if (["hepsi","tümü"].includes(sec2)) {
                data.filter(data => data.Check >= data.Mission.Amount || Date.now() >= data.Time).map(data => {
                    easyMiss.deleteOne({
                        userID: data.userID
                    }).exec();
                });
                return message.reply("Başarılı.")
            }
        }
    }

    if (!sec) {
        let data = await easyMiss.find({});
        let authorGörev = await easyMiss.findOne({userID: message.author.id});
        message.channel.send(embed.setDescription(`
Toplam da **${data.length}** aktif görev bulunmakta.
Bu görevlerin **${data.filter(x => x.Check >= x.Mission.Amount).length}** tanesi yapılmış. **${data.length-data.filter(x => x.Check >= x.Mission.Amount).length}** tane görev de hala devam etmektedir.
${authorGörev ? `\n**Senin Görevin**

Görevi Veren Yetkili: <@!${authorGörev.Mission.Author}> (\`${authorGörev.Mission.Author}\`)
Görev Durumu: \`${authorGörev.Check >= authorGörev.Mission.Amount ? "Bitti": "Devam Ediyor"}\`
Görev Türü: \`${authorGörev.Mission.Type}\`
Yapılan Miktar: \`${authorGörev.Mission.Type == "ses" ? (authorGörev.Check/(1000*60*60)).toFixed(0)+" saat" : authorGörev.Check}\`
İstenilen Miktar: \`${authorGörev.Mission.Type == "ses" ? (authorGörev.Mission.Amount/(1000*60*60)).toFixed(0)+" saat" : authorGörev.Mission.Amount}\`
Görev Süresi: \`${moment(authorGörev.Time).locale("tr").fromNow()} bitiyor\`
Görev Bitiş Tarihi: \`${moment(authorGörev.Time).locale("tr").format("LLL")}\`

${client.emojis.cache.find(x => x.name == "yildiz")} **İlerleme**
- Yapılan: \`${authorGörev.Mission.Type == "ses" ? (authorGörev.Check/(1000*60*60)).toFixed(0) : authorGörev.Check}\` Yapılması Gereken: \`${authorGörev.Mission.Type == "ses" ? (authorGörev.Mission.Amount/(1000*60*60)).toFixed(0) : authorGörev.Mission.Amount}\`
${progressBar(authorGörev.Check, authorGörev.Mission.Amount, 8)} \`${authorGörev.Mission.Type == "ses" ? (authorGörev.Check/(1000*60*60)).toFixed(0) : authorGörev.Check} / ${authorGörev.Mission.Type == "ses" ? (authorGörev.Mission.Amount/(1000*60*60)).toFixed(0) : authorGörev.Mission.Amount}\`
` : ""}`))


        return;
    }
}
exports.conf = {
    aliases: ["görev"]
}
exports.help = {
    name: 'Görev'
}

function progressBar(value, maxValue, size) {
    const percentage = value >= maxValue ? 100 / 100 : value / maxValue;
    const progress = Math.round((size * percentage));
    const emptyProgress = size - progress;
    const progressText = `${client.emojis.cache.find(x => x.name == "axze_ortabar")}`.repeat(progress);
    const emptyProgressText = `${client.emojis.cache.find(x => x.name == "axze_griortabar")}`.repeat(emptyProgress);
    const bar = `${value ? client.emojis.cache.find(x => x.name == "axze_solbar") : client.emojis.cache.find(x => x.name == "axze_baslangicbar")}` + progressText + emptyProgressText + `${emptyProgress == 0 ? `${client.emojis.cache.find(x => x.name === "axze_bitisbar")}` : `${client.emojis.cache.find(x => x.name === "axze_gribitisbar")}`}`;
    return bar;
};