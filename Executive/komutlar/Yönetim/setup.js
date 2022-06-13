const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
    if (message.guild.owner.id === message.author.id || conf.sahip.some(member => message.author.id === member) || durum) {

        let sec = args[0]
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setFooter(conf.footer)
            .setTimestamp() // ramal ADAMDIR 
            .setDescription(`
\`\`\`Server Bilgileri\`\`\`
Sunucu Tagı \`${conf.prefix[0]}setup tag <serverTAG>\`
Sunucu Untagı \`${conf.prefix[0]}setup tag2 <serverTAG2>\`
Sunucu urlsi \`${conf.prefix[0]}setup link <serverLINK>\`
Güvenli Kişiler \`${conf.prefix[0]}setup gkv @safedMember\`
Güvenli Roller \`${conf.prefix[0]}setup grv @safedRoles\`
\`\`\`Sunucu İçi Kanal Ayarları\`\`\`
Genel Sohbet \`${conf.prefix[0]}setup chat #Kanal/ID\`
Teyit Kanalı \`${conf.prefix[0]}setup register #Kanal/ID\`
invite Kanalı \`${conf.prefix[0]}invite kanal #Kanal/ID\`
Tag Log \`${conf.prefix[0]}setup taglog #Kanal/ID\`
Kurallar \`${conf.prefix[0]}setup rules #Kanal/ID\`
Afk Odası \`${conf.prefix[0]}setup sleep #Kanal/ID\`
Kategori İd \`${conf.prefix[0]}setup category ID\`
Rol Log \`${conf.prefix[0]}setup rol-ver-log #Kanal/ID\`
\`\`\`Sunucu İçi Rol Ayarları\`\`\`
Vk Yöneticisi Rolü \`${conf.prefix[0]}setup vkauthor @Rol/ID\`
Kayıtsız Rolleri \`${conf.prefix[0]}setup unregister @Rol/ID\`
Erkek Rolleri \`${conf.prefix[0]}setup man @Rol/ID\`
Kadın Rolleri \`${conf.prefix[0]}setup woman @Rol/ID\`
Taglı Rolü \`${conf.prefix[0]}setup team @Rol/ID\`
Booster Rolü \`${conf.prefix[0]}setup boost @Rol/ID\`
Cezalı Rolü \`${conf.prefix[0]}setup jail @Rol/ID\`
Reklam cezalı Rolü \`${conf.prefix[0]}setup reklam @Rol/ID\`
Şüpheli Hesap Rolü \`${conf.prefix[0]}setup supheli @Rol/ID\`
Yasaklı Tag Rolü \`${conf.prefix[0]}setup bantag @Rol/ID\`
Mute Rolü \`${conf.prefix[0]}setup mute @Rol/ID\`
Vmute Rolü \`${conf.prefix[0]}setup vmute @Rol/ID\`
Vk Cezalı Rolü \`${conf.prefix[0]}setup vkcezalı @Rol/ID\`
Dc Cezalı Rolü \`${conf.prefix[0]}setup dccezalı @Rol/ID\`
Yayıncı Cezalı Rolü \`${conf.prefix[0]}setup stcezalı @Rol/ID\`
Register \`${conf.prefix[0]}setup registerauthorized @Rol/ID\`
Global Rolleri \`${conf.prefix[0]}setup globalrol @Rol/ID\`
En Alt Yetkili Rolü\`${conf.prefix[0]}setup enaltrol @Rol/ID\`
Yonetim Rolleri \`${conf.prefix[0]}setup ustytler @Rol/ID\`
Yonetim1 \`${conf.prefix[0]}setup ust1 @Rol/ID\`
Yonetim2 \`${conf.prefix[0]}setup ust2 @Rol/ID\`
Yonetim3 \`${conf.prefix[0]}setup ust3 @Rol/ID\`
`)

        await sunucuayar.findOne({guildID: conf.sunucuId}, async (err, data) => {
            if (err) console.log(err)


            if (["TAG", "tag", "Tag"].some(y => y === sec)) {
                let select = args[1];
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.TAG = select, data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["TAG2", "tag2", "Tag2"].some(y => y === sec)) {
                let select = args[1];
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.TAG2 = select, data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["Link", "link", "lınk", "LINK", "LİNK"].some(y => y === sec)) {
                let select = args[1];
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.LINK = select, data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["GKV", "güvenlikişi", "güvenlikullanıcı", "guvenlikisi", "guvenliKisi", "gkv"].some(y => y === sec)) {
                let select = message.mentions.members.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                let arr = [];
                arr = data.GKV
                if (arr.some(x => x == select.id)) {
                    removeItemOnce(arr, select.id)
                    return data.GKV = arr, data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
                }
                return await data.GKV.push(`${select.id}`), await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));

            };
            if (["category", "Category", "kategori", "Kategori"].some(y => y === sec)) {
                let select = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                let arr = [];
                arr = data.PUBCategory
                if (arr.some(x => x == select.id)) {
                    removeItemOnce(arr, select.id)
                    return data.PUBCategory = arr, data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
                }
                return await data.PUBCategory.push(`${select.id}`), await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            
            if (["GRV", "guvenlirol", "güvenlirol", "grv"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                await data.GRV.push(`${select.id}`), await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["sohbet-kanal", "chat", "sohbetkanal", "genelchat"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.CHAT = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["register-kanal", "register", "registerchat", "register-chat"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.REGISTER = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            }
            if (["rol-ver-log"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.ROLEChannel = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            }
            if (["taglog-kanal", "taglog", "tagbilgi", "Taglog"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.TAGLOG = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["kurallar-kanal", "kurallar", "kurallarkanal", "kurallarchat", "rules", "rule"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.RULES = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["sleep-kanal", "sleep", "sleeproom", "sleepingroom"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.SLEEP = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };

            if (["vkyonetici", "vkyönetici", "vk-yönetici", "vampirköylü"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.VKAuthor = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["erkek", "Erkek", "erkekROL", "man", "Man"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.MAN = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["kadın", "kız", "kızROL", "kadınROL", "woman"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.WOMAN = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["kayıtsız", "unregister", "kayıtsızüye", "uregister", "kayitsiz"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.UNREGISTER = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["ekip", "teamrol", "ekiprol", "taglırol", "taglı", "team", "takım"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.TEAM = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["boost", "booster", "boostrol", "boosterrol"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.BOOST = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["jail", "jailed", "cezalı", "Jail", "Jailed", "Cezalı"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.JAIL = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["reklam", "Reklam", "reklamrol", "Reklamrol", "ReklamRol", "REKLAM"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.REKLAM = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["mute", "muted", "Mute", "Muted"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.MUTED = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["vmute", "vmuted", "VMute", "VMuted", "VoiceMute", "sesmute", "SesMute", "Sesmute"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.VMUTED = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["yasaklıtag", "yasaklıtagrol", "bantag", "ban-tag", "yasaklı-tag", "ytag"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.BANTAG = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["şüpheli", "supheli", "şüphelihesap", "suphelihesap", "Şüpheli", "Supheli"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.SUPHELI = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["enaltyetkilirol", "en-alt-yetkili-rol", "enaltrol"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.EnAltYetkiliRol = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["genelrol", "genel-rol", "ozelrol", "globalrol"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.COMMANDAuthorized = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["kayıtsorumlusu", "kayit-sorumlusu", "kayıt-sorumlusu", "registerauthorized", "Kayıtçı", "kayitci"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.REGISTERAuthorized = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };

            if (["ustytler"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.UstYetkiliRol = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["ust1"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.Ust1YetkiliRol = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["ust2"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.Ust2YetkiliRol = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["ust3"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.Ust3YetkiliRol = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["vkcezalı"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.VKCEZALI = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["dccezalı"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.DCCEZALI = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };
            if (["stcezalı"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "axze_iptal"));
                data.STCEZALI = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "axze_tik"));
            };

            let arr = [];
            if (["panel", "ayar", "settings"].some(y => y === sec)) {
                arr.push(data)
                let embed = new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL({
                        dynamic: true
                    }))
                    .setColor("RANDOM")
                    .setTimestamp()
                    .setFooter(conf.footer)
                    .setDescription(`
${arr.map(y => `
\`\`\`SUNUCU AYARLARI\`\`\`
Sunucu ID (${y.guildID})
Tag (${y.TAG ? y.TAG : "\`Kapalı\`"}) / (${y.TAG2 ? y.TAG2 : "\`Kapalı\`"})
URL (${y.LINK ? y.LINK : "\`Kapalı\`"})
Güvenli Kişiler (${y.GKV.length > 0 ? y.GKV.map(x => `<@${x}>`).slice(0, 5).join(","): "\`Kapalı\`"})
Güvenli Roller (${y.GRV.length > 0 ? y.GRV.map(x => `<@&${x}>`).slice(0, 5).join(",") : "\`Kapalı\`"})
\`\`\`Sunucu İçi Kanal Ayarları\`\`\`
Genel Sohbet (${y.CHAT != "1" ? `<#${y.CHAT}>` : "\`Kapalı\`"})
Teyit Kanalı (${y.REGISTER != "1" ? `<#${y.REGISTER}>` : "\`Kapalı\`"})
Taglog (${y.TAGLOG != "1" ? `<#${y.TAGLOG}>` : "\`Kapalı\`"})
Kurallar (${y.RULES != "1" ? `<#${y.RULES}>` : "\`Kapalı\`"})
Sleep (${y.SLEEP != "1" ? `<#${y.SLEEP}>` : "\`Kapalı\`"})
Rollog (${y.ROLEChannel != "1" ? `<#${y.ROLEChannel}>`: "\`Kapalı\`"})
\`\`\`Sunucu İçi Rol Ayarları\`\`\`
Vk yöneticisi ${y.VKAuthor != "1" ? `<@&${y.VKAuthor}>` : "\`Kapalı\`"}
Kayıtsız Rolü ${y.UNREGISTER.length > 0 ? `${y.UNREGISTER.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
Erkek Rolleri ${y.MAN.length > 0 ? `${y.MAN.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
Kadın Rolleri ${y.WOMAN.length > 0 ? `${y.WOMAN.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
Taglı Rolü ${y.TEAM != "1" ? `<@&${y.TEAM}>` : "\`Kapalı\`"}
Booster Rolü ${y.BOOST != "1" ? `<@&${y.BOOST}>` : "\`Kapalı\`"}
Cezalı Rolü ${y.JAIL != "1" ? `<@&${y.JAIL}>` : "\`Kapalı\`"}
Reklamcı Rolü ${y.REKLAM != "1" ? `<@&${y.REKLAM}>` : "\`Kapalı\`"}
Şüpheli Rolü ${y.SUPHELI != "1" ? `<@&${y.SUPHELI}>` : "\`Kapalı\`"}
Ytag Rolü ${y.BANTAG != "1" ? `<@&${y.BANTAG}>` : "\`Kapalı\`"}
Muted Rolü ${y.MUTED != "1" ? `<@&${y.MUTED}>` : "\`Kapalı\`"}
Vmuted Rolü ${y.VMUTED != "1" ? `<@&${y.VMUTED}>` : "\`Kapalı\`"}
Vk Cezalı Rolü ${y.VKCEZALI ? `<@&${y.VKCEZALI}>` : "\`Kapalı\`"}
Dc Cezalı Rolü ${y.DCCEZALI ? `<@&${y.DCCEZALI}>` : "\`Kapalı\`"}
St Cezalı Rolü ${y.STCEZALI ? `<@&${y.STCEZALI}>` : "\`Kapalı\`"}
Register Hammer Rolü ${y.REGISTERAuthorized.length  > 0 ? `${y.REGISTERAuthorized.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
Bot Commands Rolü ${y.COMMANDAuthorized.length  > 0 ? `${y.COMMANDAuthorized.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
Yonetim Rolleri ${y.UstYetkiliRol.length  > 0 ? `${y.UstYetkiliRol.map(x => `<@&${x}>`).join(",")}` : "\`Kapalı\`"}
Yonetim1 ${y.Ust1YetkiliRol ? `<@&${y.Ust1YetkiliRol}>` : "\`Kapalı\`"}
Yonetim2 ${y.Ust2YetkiliRol ? `<@&${y.Ust2YetkiliRol}>` : "\`Kapalı\`"}
Yonetim3 ${y.Ust3YetkiliRol ? `<@&${y.Ust3YetkiliRol}>` : "\`Kapalı\`"}
En Alt Yetkili Rolü ${y.EnAltYetkiliRol ? `<@&${y.EnAltYetkiliRol}>` : "\`Kapalı\`"}
`)}
`);
                message.channel.send(embed);
            };

            if (["yardım", "Yardım", "help", "Help"].some(y => y === sec)) {
                return message.channel.send(embed);
            };
            if (!sec) {
                return message.channel.send(embed);
            };

        });

    } else return client.Embed(message.channel.id, `Bu komutu kullanabilmek için Sunucu Sahibi - Bot Sahibi olmalısın!`);
}
exports.conf = {aliases: ["kurulum", "kur", "Setup", "SETUP", "Setup"]}
exports.help = {name: 'setup'}
function removeItemOnce(arr, value) { var index = arr.indexOf(value); if (index > -1) { arr.splice(index, 1); } return arr; }