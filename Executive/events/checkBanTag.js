let sunucuayar = require("../models/sunucuayar");
let conf = client.ayarlar
let stat = require("../models/stats");
let Database = require("../models/invite");
let TaglıData = require("../models/taglıUye");
let ozelKomut = require("../models/özelkomut");
let {
    MessageEmbed
} = require("discord.js");
let moment = require("moment");
module.exports = async client => {
return;
    // TEYİT DATA
    let data = await stat.find({});
    let guild = client.guilds.cache.get(client.ayarlar.sunucuId);
    teyitData = data.map(veri => {
        return {
            Id: veri.userID,
            Total: veri.Man + veri.Woman,
            Erkek: veri.Man,
            Kadin: veri.Woman
        }
    }).sort((a, b) => b.Total - a.Total).map((user, index) => `\`${index+1}.\` **${guild.members.cache.get(user.Id) ? guild.members.cache.get(user.Id).displayName : "@undefined"}** (\`Erkek: ${user.Erkek} Kadin: ${user.Kadin} Toplam: ${user.Total}\`)`).splice(0, 30).join("\n")
    let teyitEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(conf.footer)
        .setTitle("Teyit Tablosu")
        .setDescription(`${teyitData}\n\nBu veriler ${moment(Date.now()).locale("tr").format("LLL")} tarihinde yenilenmiştir.`)
    client.channels.cache.get(conf.leaderboard.KanalID).messages.fetch(conf.leaderboard.mesajID).then(m => m.edit(teyitEmbed))
    // DAVET DATA
    let inviteData = await Database.find({});
    davetGoster = inviteData.map(user => {
        return {
            Id: user.userID,
            Total: user.bonus + user.regular,
            Regular: user.regular,
            Bonus: user.bonus,
            Fake: user.fake
        }
    }).sort((a, b) => b.Total - a.Total).map((data, index) => `\`${index+1}.\` **${guild.members.cache.get(data.Id) ? guild.members.cache.get(data.Id).displayName : "Undefined"}** (\`Toplam: ${data.Total} Regular: ${data.Regular}\`)`).splice(0, 30).join("\n")
    let davetEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(conf.footer)
        .setTitle("Davet Tablosu")
        .setDescription(`${davetGoster}\n\nBu veriler ${moment(Date.now()).locale("tr").format("LLL")} tarihinde yenilenmiştir.`)
    client.channels.cache.get(conf.leaderboard.KanalID).messages.fetch(conf.leaderboard.mesajID_2).then(m => m.edit(davetEmbed))
    // TAGLI DATA

    let tagData = await TaglıData.find({
        Durum: "stat"
    })
    let kayitcilar = {};
    tagData.forEach((value) => {
        if (kayitcilar[value.authorID]) kayitcilar[value.authorID] += 1;
        else kayitcilar[value.authorID] = 1
    })
    let tagGoster = Object.keys(kayitcilar).sort((a, b) => kayitcilar[b] - kayitcilar[a]).map(e => ({
        User: e,
        Value: kayitcilar[e]
    }))
    tagGoster = tagGoster.map((user, index) => `\`${index+1}.\` **${guild.members.cache.get(user.User) ? guild.members.cache.get(user.User).displayName : "Undefined"}** \`${user.Value} Taglı.\``).splice(0, 30)
    let tagEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(conf.footer)
        .setTitle("Taglı Tablosu")
        .setDescription(`${tagGoster.length > 0 ? tagGoster.join("\n") : "Veri yoktur"}\n\nBu veriler ${moment(Date.now()).locale("tr").format("LLL")} tarihinde yenilenmiştir.`)
    client.channels.cache.get(conf.leaderboard.KanalID).messages.fetch(conf.leaderboard.mesajID_3).then(m => m.edit(tagEmbed))
    // TAGLI BİTİŞ
            // YETKİLİ TOP
        
            let göster = await ozelKomut.find({guildID: client.ayarlar.sunucuId, YetkiliROL: true})
            let arr = []
            let ozelKomutVeri = göster.map(x => x.YetkiliData)
            ozelKomutVeri.forEach(v => v.forEach(x => arr.push(x)));
            let yetkiliciler = {};
            arr.forEach((value) => {
              if (yetkiliciler[value.Author]) yetkiliciler[value.Author] += 1;
              else yetkiliciler[value.Author] = 1
            })
            let yetkiliGoster = Object.keys(yetkiliciler).sort((a, b) => yetkiliciler[b] - yetkiliciler[a]).splice(0, 30).map(e => ({
              User: e,
              Value: yetkiliciler[e]
            }))
            yetkiliGoster = yetkiliGoster.map((user, index) => `\`${index+1}.\` **${guild.members.cache.get(user.User) ? guild.members.cache.get(user.User).displayName : "Undefined"}** \`${user.Value} Yetkili.\``).join("\n")
            let yetkiliEmbed = new MessageEmbed()
              .setColor("RANDOM")
              .setTimestamp()
              .setFooter(conf.footer)
              .setTitle("Yetkili Alım Tablosu")
              .setDescription(`${yetkiliGoster.length > 0 ? yetkiliGoster : "Veri yoktur"}\n\nBu veriler ${moment(Date.now()).locale("tr").format("LLL")} tarihinde yenilenmiştir.`)
              client.channels.cache.get(conf.leaderboard.KanalID).messages.fetch(conf.leaderboard.mesajID_4).then(m => m.edit(yetkiliEmbed))
    
            // YETKİLİ BİTİŞ
    setInterval(async () => {
        // TEYİT DATA
        let data = await stat.find({});
        let guild = client.guilds.cache.get(client.ayarlar.sunucuId);
        teyitData = data.map(veri => {
            return {
                Id: veri.userID,
                Total: veri.Man + veri.Woman,
                Erkek: veri.Man,
                Kadin: veri.Woman
            }
        }).sort((a, b) => b.Total - a.Total).map((user, index) => `\`${index+1}.\` **${guild.members.cache.get(user.Id) ? guild.members.cache.get(user.Id).displayName : "@undefined"}** (\`Erkek: ${user.Erkek} Kadin: ${user.Kadin} Toplam: ${user.Total}\`)`).splice(0, 30).join("\n")

        let teyitEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(conf.footer)
            .setTitle("Teyit Tablosu")
            .setDescription(`${teyitData}\n\nBu veriler ${moment(Date.now()).locale("tr").format("LLL")} tarihinde yenilenmiştir.`)
        client.channels.cache.get(conf.leaderboard.KanalID).messages.fetch(conf.leaderboard.mesajID).then(m => m.edit(teyitEmbed))
        // DAVET DATA
        let inviteData = await Database.find({});
        davetGoster = inviteData.map(user => {
            return {
                Id: user.userID,
                Total: user.bonus + user.regular,
                Regular: user.regular,
                Bonus: user.bonus,
                Fake: user.fake
            }
        }).sort((a, b) => b.Total - a.Total).map((data, index) => `\`${index+1}.\` **${guild.members.cache.get(data.Id) ? guild.members.cache.get(data.Id).displayName : "Undefined"}** (\`Toplam: ${data.Total} Regular: ${data.Regular}\`)`).splice(0, 30).join("\n")
        let davetEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(conf.footer)
            .setTitle("Davet Tablosu")
            .setDescription(`${davetGoster}\n\nBu veriler ${moment(Date.now()).locale("tr").format("LLL")} tarihinde yenilenmiştir.`)
        client.channels.cache.get(conf.leaderboard.KanalID).messages.fetch(conf.leaderboard.mesajID_2).then(m => m.edit(davetEmbed))
        // TAGLI DATA

        let tagData = await TaglıData.find({
            Durum: "stat"
        })
        let kayitcilar = {};
        tagData.forEach((value) => {
            if (kayitcilar[value.authorID]) kayitcilar[value.authorID] += 1;
            else kayitcilar[value.authorID] = 1
        })
        let tagGoster = Object.keys(kayitcilar).sort((a, b) => kayitcilar[b] - kayitcilar[a]).map(e => ({
            User: e,
            Value: kayitcilar[e]
        }))
        tagGoster = tagGoster.map((user, index) => `\`${index+1}.\` **${guild.members.cache.get(user.User) ? guild.members.cache.get(user.User).displayName : "Undefined"}** \`${user.Value} Taglı.\``).splice(0, 30)
        let tagEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(conf.footer)
            .setTitle("Taglı Tablosu")
            .setDescription(`${tagGoster.length > 0 ? tagGoster.join("\n") : "Veri yoktur"}\n\nBu veriler ${moment(Date.now()).locale("tr").format("LLL")} tarihinde yenilenmiştir.`)
        client.channels.cache.get(conf.leaderboard.KanalID).messages.fetch(conf.leaderboard.mesajID_3).then(m => m.edit(tagEmbed))
        // TAGLI BİTİŞ
        // YETKİLİ TOP
        
        let göster = await ozelKomut.find({guildID: client.ayarlar.sunucuId, YetkiliROL: true})
        let arr = []
        let ozelKomutVeri = göster.map(x => x.YetkiliData)
        ozelKomutVeri.forEach(v => v.forEach(x => arr.push(x)));
        let yetkiliciler = {};
        arr.forEach((value) => {
          if (yetkiliciler[value.Author]) yetkiliciler[value.Author] += 1;
          else yetkiliciler[value.Author] = 1
        })
        let yetkiliGoster = Object.keys(yetkiliciler).sort((a, b) => yetkiliciler[b] - yetkiliciler[a]).splice(0, 30).map(e => ({
          User: e,
          Value: yetkiliciler[e]
        }))
        yetkiliGoster = yetkiliGoster.map((user, index) => `\`${index+1}.\` **${guild.members.cache.get(user.User) ? guild.members.cache.get(user.User).displayName : "Undefined"}** \`${user.Value} Yetkili.\``).join("\n")
        let yetkiliEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setTimestamp()
          .setFooter(conf.footer)
          .setTitle("Yetkili Alım Tablosu")
          .setDescription(`${yetkiliGoster.length > 0 ? yetkiliGoster : "Veri yoktur"}\n\nBu veriler ${moment(Date.now()).locale("tr").format("LLL")} tarihinde yenilenmiştir.`)
          client.channels.cache.get(conf.leaderboard.KanalID).messages.fetch(conf.leaderboard.mesajID_4).then(m => m.edit(yetkiliEmbed))

        // YETKİLİ BİTİŞ
    }, 1000 * 60 * 60)


}