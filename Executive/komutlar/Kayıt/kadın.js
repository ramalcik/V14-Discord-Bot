const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar
let teyit = require("../../models/teyit");
let sunucuayar = require("../../models/sunucuayar");
let otokayit = require("../../models/otokayit");
let puansystem = require("../../models/puansystem");
let limit = new Map();
let sure = new Map();
const ms = require("ms");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    let erkekRol = data.MAN;
    let kadinRol = data.WOMAN;
    let unRegisterRol = data.UNREGISTER;
    let registerChannel = data.REGISTERChannel;
    let tag = data.TAG;
    let tag2 = data.TAG2;
    let kayitSorumlusu = data.REGISTERAuthorized;
    let ekipRol = data.TEAM;
    let supheliRol = data.SUPHELI;
    let chatKANAL = data.CHAT;
    let boost = data.BOOST
    if (!message.guild.roles.cache.get(erkekRol[0]) &&
        !message.guild.roles.cache.get(kadinRol[0]) &&
        !message.guild.roles.cache.get(unRegisterRol[0]) &&
        !message.guild.roles.cache.get(kayitSorumlusu[0]) &&
        !client.channels.cache.get(registerChannel) &&
        !tag && !tag2) return message.reply(`Lütfen kurulum sistemini tamamen bitiriniz \`${conf.prefix[0]}setup help\``);
        if (message.member.permissions.has(8) || message.member.roles.cache.some(e => kayitSorumlusu.some(x => x == e)) || message.member.permissions.has(8)) {

        let kntrl = limit.get(message.author.id)
        let sre = sure.get(message.author.id)
        if (kntrl >= 5 && sre > Date.now() && !message.member.permissions.has(8) && !message.member.roles.cache.some(rol => data.MUTEAuthorized.includes(rol.id))) {
message.channel.send(`Kısa sürede 5 den fazla kayıt yaptığınız için yetkileriniz çekildi.`)
            return message.member.roles.remove(user.roles.cache.filter(rol => message.guild.roles.cache.get(data.TEAM).position <= rol.position && !rol.managed))
        }
        if (!sre) {
            sure.set(message.author.id, Date.now()+ms("30s"))
        }
        
        limit.set(message.author.id, (limit.get(message.author.id) || 0) +1)
        setTimeout(() => {
            limit.delete(message.author.id)
            sure.delete(message.author.id)
        }, ms("30s"));
    
        if (!target) return message.reply(`Lütfen geçerli bir üye etiketleyin ya da ID belirtiniz.`);
        unreg = unRegisterRol;
        if (!args[1]) return message.reply(`Lütfen geçerli bir isim belirtiniz`);
        let name = args[1][0].toUpperCase() + args[1].substring(1);
        let age = Number(args[2]);
        if (!age) return message.reply(`Lütfen bir yaş belirtiniz.`);
        if (message.member.roles.highest.position <= target.roles.highest.position) return message.reply(`Bu kullanıcı üzerinde işlem yapmak için herhangi bir yetkiye sahip değilim.`);

        if (target.roles.cache.some(rol => erkekRol.includes(rol.id))) return message.reply(`Bu üye sunucuda zaten kayıtlı bulunuyor.`)
        if (target.roles.cache.some(rol => kadinRol.includes(rol.id))) return message.reply(`Bu üye sunucuda zaten kayıtlı bulunuyor.`)

        let autoLogin = await puansystem.findOne({
            guildID: message.guild.id
        });
        target.user.username.includes(tag) ? kadinRol.push(ekipRol) : kadinRol = kadinRol;
            await target.roles.remove(unreg).then(async x => {
                await target.roles.set(target.roles.cache.has(boost) ? [boost, ...kadinRol] : [...kadinRol])
                await message.guild.member(target.id).setNickname(`${target.user.username.includes(tag) ? tag : tag2 ? tag2 : tag} ${name} | ${age}`);
				
                if (target.roles.cache.some(rol => erkekRol.some(rol2 => rol.id == rol2))) {
                    await erkekRol.forEach(async (res, i) => {
                        setTimeout(async () => {
                            await target.roles.remove(res)
                        }, i * 1000);
                    })
                };
                await teyit.updateOne({
                    userID: target.id
                }, {
                    $push: {
                        userName: `\`${target.user.username.includes(tag) ? tag : tag2 ? tag2 : tag} ${name} | ${age}\` (${kadinRol.map(x => `<@&${x}>`)})`
                    }
                }, {
                    upsert: true
                }).exec();
                let isimler = await teyit.findOne({
                    userID: target.id
                });
                let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})).setDescription(`${target} adlı üye başarılı bir şekilde **Kadın** olarak kaydedildi\n\nBu kullanıcının ${isimler.userName.length} adet isim geçmişi görüntülendi \n${isimler.userName.map(x => x).reverse().join("\n")}`);
                await message.channel.send(embed)

                if (autoLogin.AutoLogin.Type == true) {
                    await otokayit.updateOne({
                        userID: target.id
                    }, {
                        $set: {
                            userID: target.id,
                            roleID: kadinRol,
                            name: name,
                            age: age
                        }
                    }, {
                        upsert: true
                    }).exec();
                }
                client.channels.cache.get(chatKANAL).send(client.ayarlar.chatMesajı.replace("-member-", target)).then(msg => msg.delete({
                    timeout: 1000 * 15
                }))
                client.dailyMission(message.author.id, "teyit", 1,3)
                client.easyMission(message.author.id, "teyit", 1)
                return client.addAudit(message.author.id, 1, "Kadin");
            })
 
    }

        }
        exports.conf = {
            aliases: ["k", "Kadın", "KADIN", "Woman", "woman"]
        }
        exports.help = {
            name: 'kadın'
        }  