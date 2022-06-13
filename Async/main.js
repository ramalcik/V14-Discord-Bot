const {
    MessageEmbed
} = require("discord.js");
const Discord = require('discord.js');
const client = global.client = new Discord.Client({
    fetchAllMembers: true
});
const logs = require('discord-logs');
logs(client);
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
let mainSettings = require(__dirname + "/../settings.js");
let mongoose = require("mongoose");
let sunucuayar = require("./models/sunucuayar");
let muteInterval = require("./models/muteInterval");
let vmuteInterval = require("./models/vmuteInterval");
let jailInterval = require("./models/jailInterval");
let dcInterval = require("./models/dcInterval");
let vkInterval = require("./models/vkInterval");
let stInterval = require("./models/stInterval");
let tagInterval = require("./models/taglıUye");
let randMiss = require("./models/randomMission");
let dayMiss = require("./models/dailyMission");
let xpData = require("./models/stafxp");
let puansystem = require("./models/puansystem");

mongoose.connect(mainSettings.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

Array.prototype.shuffle = function () {
    let i = this.length;
    while (i) {
      let j = Math.floor(Math.random() * i);
      let t = this[--i];
      this[i] = this[j];
      this[j] = t;
    }
    return this;
  };

client.on("ready", async () => {

    let dailyData = await puansystem.findOne({
        guildID: mainSettings.sunucuId
    }) || {
        DailyMission: {
            Type: false
        }
    };
    

    setInterval(async () => {
        let arr2 = [];
        let kontrol = await randMiss.find({});
        kontrol.forEach(async memberData => {
            let mission = memberData.Mission;
            if (memberData.Check >= mission.AMOUNT) {
                if (mission.MISSION == "ses") {
                    arr2.push({
                        UserID: memberData.userID,
                        Görev: "Ses",
                        Puan: (mission.AMOUNT / (1000 * 60 * 60) * 40).toFixed(0)
                    })
                }
                if (mission.MISSION == "mesaj") {
                    arr2.push({
                        UserID: memberData.userID,
                        Görev: "Mesaj",
                        Puan: (mission.AMOUNT * 0.2).toFixed(0)
                    })

                }
                if (mission.MISSION == "davet") {
                    arr2.push({
                        UserID: memberData.userID,
                        Görev: "Davet",
                        Puan: (mission.AMOUNT * 14).toFixed(0)
                    })

                }
                if (mission.MISSION == "taglı") {
                    arr2.push({
                        UserID: memberData.userID,
                        Görev: "Taglı",
                        Puan: (mission.AMOUNT * 40).toFixed(0)
                    })

                }
               
                if (mission.MISSION == "teyit") {
                    arr2.push({
                        UserID: memberData.userID,
                        Görev: "Teyit",
                        Puan: (mission.AMOUNT * 3).toFixed(0)
                    })
                }
                
            }
        })

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(mainSettings.footer)
            .setTitle("Günlük Görev Tamamlayanlar")
            .setDescription(`Toplam da (**${arr2.length}/${kontrol.length}**) kişi görev yapmış bulunmakta.\n\n${arr2.length > 0 ? arr2.map(x => `<@${x.UserID}> **Görev:** \`${x.Görev}\` **Puan:** \`${x.Puan}\``).join("\n") : "Veri yoktur."}`)
        client.channels.cache.get(mainSettings.GörevSystem.KanalID).messages.fetch(mainSettings.GörevSystem.MesajID).then(m => m.edit(embed))
    }, 1000 * 60);

    setInterval(async () => {
        let arr = ["davet", "mesaj", "ses", "taglı", "teyit"];
        let dagit = []
        await dayMiss.findOne({
            guildID: mainSettings.sunucuId
        }, async (err, res) => {
            if (!res) {
                let newData = dayMiss({
                    guildID: mainSettings.sunucuId,
                    Date: Date.now()
                })
                await newData.save()
            } else {
                if (Date.now() - res.Date >= 1000 * 60 * 60 * 24 * 1) {
                    let kontrol = await randMiss.find({});
                    kontrol.forEach(async memberData => {
                        let mission = memberData.Mission;
                        if (memberData.Check >= mission.AMOUNT) {
                            randMiss.deleteOne({
                                userID: memberData.userID
                            }).exec();
                            if (mission.MISSION == "ses") {
                                xpData.updateOne({
                                    userID: memberData.userID
                                }, {
                                    $inc: {
                                        currentXP: (mission.AMOUNT / (1000 * 60 * 60) * 40)
                                    }
                                }, {
                                    upsert: true
                                }).exec()
                            }
                            if (mission.MISSION == "mesaj") {
                                xpData.updateOne({
                                    userID: memberData.userID
                                }, {
                                    $inc: {
                                        currentXP: (mission.AMOUNT * 0.2)
                                    }
                                }, {
                                    upsert: true
                                }).exec()
                            }
                            if (mission.MISSION == "davet") {
                                xpData.updateOne({
                                    userID: memberData.userID
                                }, {
                                    $inc: {
                                        currentXP: (mission.AMOUNT * 14)
                                    }
                                }, {
                                    upsert: true
                                }).exec()
                            }
                            if (mission.MISSION == "taglı") {
                                xpData.updateOne({
                                    userID: memberData.userID
                                }, {
                                    $inc: {
                                        currentXP: (mission.AMOUNT * 40)
                                    }
                                }, {
                                    upsert: true
                                }).exec()
                            }
                         
                            if (mission.MISSION == "teyit") {
                                xpData.updateOne({
                                    userID: memberData.userID
                                }, {
                                    $inc: {
                                        currentXP: (mission.AMOUNT * 3)
                                    }
                                }, {
                                    upsert: true
                                }).exec()
                            }
                        
                        }
                    })
                    setTimeout(async () => {
                        let sunucudata = await sunucuayar.findOne({});
                        client.guilds.cache.get(mainSettings.sunucuId).roles.cache.get(sunucudata.EnAltYetkiliRol).members.array().shuffle().forEach((x, index) => {
                            arr.shuffle()
                            let random = arr[Math.floor(Math.random() * arr.length)]
                            dagit.push({
                                user: x.id,
                                gorev: random
                            })
                        });
                        let veri = dagit;
                        let kategoriler = dailyData.DailyMission.category;
                        let messageKategori = dailyData.DailyMission.messageChannel;
                        let yasaklıkanal = dailyData.DailyMission.unChannel;

                        let VoiceChannel = client.guilds.cache.get(mainSettings.sunucuId).channels.cache.filter(chan => chan.type == "voice" && kategoriler.includes(chan.parentID) && !yasaklıkanal.includes(chan.id)).map(channel => channel.id)
                        let MessageChannel = client.guilds.cache.get(mainSettings.sunucuId).channels.cache.filter(chan => chan.type == "text" && messageKategori.includes(chan.id)).map(channel => channel.id)
                        client.channels.cache.get(dailyData.DailyMission.logChannel).send(`\`\`\`${client.guilds.cache.get(mainSettings.sunucuId).name} ${moment(Date.now()).locale("tr").format("LLL")} tarihinde dağıtılan günlük görevler;\`\`\``);
                        veri.forEach((user, index) => {
                            setTimeout(async () => {
                                if (index >= veri.length) return client.channels.cache.get(`${message.channel.id}`).send(`Başarılı bir şekilde tüm görevler dağıtıldı.`);
                                let mesajRandom = getRandomInt(300, 400)
                                let davetRandom = getRandomInt(5, 10)
                                let sesRandom = getRandomInt(60, 300)
                                let taglıRandom = getRandomInt(1, 3)
                                let teyitRandom = getRandomInt(5, 20)
                                let miktarlar = user.gorev == "mesaj" ? mesajRandom : user.gorev == "davet" ? davetRandom : user.gorev == "ses" ? sesRandom : user.gorev == "taglı" ? taglıRandom : user.gorev == "teyit" ? teyitRandom : 0
                                if (user.gorev == "ses") {
                                    let VoiceRandom = VoiceChannel[Math.floor(Math.random() * VoiceChannel.length)];
                                    client.channels.cache.get(dailyData.DailyMission.logChannel).send(`<@${user.user}> Bugün <#${VoiceRandom}> kanalında \`${miktarlar}\` dakika ses aktifliği yapman gerekiyor.`);
                                    randMiss.updateOne({
                                        userID: user.user
                                    }, {
                                        $set: {
                                            userID: user.user,
                                            Check: 0,
                                            Mission: {
                                                ID: user.user,
                                                MISSION: user.gorev,
                                                AMOUNT: 1000 * 60 * sesRandom,
                                                CHANNEL: VoiceRandom
                                            }
                                        }
                                    }, {
                                        upsert: true
                                    }).exec()
                                }
                                if (user.gorev == "mesaj") {
                                    let MessageRandom = MessageChannel[Math.floor(Math.random() * MessageChannel.length)];
                                    client.channels.cache.get(dailyData.DailyMission.logChannel).send(`<@${user.user}> Bugün <#${MessageRandom}> kanalında \`${miktarlar}\` adet mesaj yazman gerekiyor.`);
                                    randMiss.updateOne({
                                        userID: user.user
                                    }, {
                                        $set: {
                                            userID: user.user,
                                            Check: 0,
                                            Mission: {
                                                ID: user.user,
                                                MISSION: user.gorev,
                                                AMOUNT: mesajRandom,
                                                CHANNEL: MessageRandom
                                            }
                                        }
                                    }, {
                                        upsert: true
                                    }).exec()
                                }
                                if (user.gorev == "taglı") {
                                    client.channels.cache.get(dailyData.DailyMission.logChannel).send(`<@${user.user}> Bugün \`${miktarlar}\` adet taglı üye çekmen gerekiyor.`);
                                    randMiss.updateOne({
                                        userID: user.user
                                    }, {
                                        $set: {
                                            userID: user.user,
                                            Check: 0,
                                            Mission: {
                                                ID: user.user,
                                                MISSION: user.gorev,
                                                AMOUNT: taglıRandom
                                            }
                                        }
                                    }, {
                                        upsert: true
                                    }).exec()
                                }
                                if (user.gorev == "teyit") {
                                    client.channels.cache.get(dailyData.DailyMission.logChannel).send(`<@${user.user}> Bugün \`${miktarlar}\` adet teyit yapman gerekiyor.`);
                                    randMiss.updateOne({
                                        userID: user.user
                                    }, {
                                        $set: {
                                            userID: user.user,
                                            Check: 0,
                                            Mission: {
                                                ID: user.user,
                                                MISSION: user.gorev,
                                                AMOUNT: teyitRandom
                                            }
                                        }
                                    }, {
                                        upsert: true
                                    }).exec()
                                }
                                if (user.gorev == "davet") {
                                    client.channels.cache.get(dailyData.DailyMission.logChannel).send(`<@${user.user}> Bugün \`${miktarlar}\` adet davet yapman gerekiyor.`);
                                    randMiss.updateOne({
                                        userID: user.user
                                    }, {
                                        $set: {
                                            userID: user.user,
                                            Check: 0,
                                            Mission: {
                                                ID: user.user,
                                                MISSION: user.gorev,
                                                AMOUNT: davetRandom
                                            }
                                        }
                                    }, {
                                        upsert: true
                                    }).exec()
                                }
                            }, index * 2000)
                        })
                        randMiss.updateMany({}, {
                            $set: {
                                Check: 0
                            }
                        }, {
                            multi: true
                        }).exec()
                        res.Date = Date.now(), res.save();
                    }, 10000)
                }
            }
        })
    }, 30000)
})


let sayi = 0;
let iltifat = [
  "Yaşanılacak en güzel mevsim sensin.",
  "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
  "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
  "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
  "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
  "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
  "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
  "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
  "Bir gamzen var sanki cennette bir çukur.",
  "Gecemi aydınlatan yıldızımsın.",
  "Ponçik burnundan ısırırım seni",
  "Bu dünyanın 8. harikası olma ihtimalin?",
  "fıstık naber?",
  "Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
  "Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
  "Müsaitsen aklım bu gece sende kalacak.",
  "Gemim olsa ne yazar liman sen olmadıktan sonra...",
  "Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
  "Sabahları görmek istediğim ilk şey sensin.",
  "Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.",
  "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
  "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
  "Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
  "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
  "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
  "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
  "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
  "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
  "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
  "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
  "Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi..."
];
client.on("message", async (message) => {
let sunucuData = await sunucuayar.findOne({
guildID: mainSettings.sunucuId
})
if (!message.guild) return;
if (message.author.bot) return;
if (message.channel.id != sunucuData.CHAT) return;
sayi++
if (sayi >= 150) {
sayi = 0;
let rand = iltifat[Math.floor(Math.random() * iltifat.length)]
message.channel.send(`${message.author} ${rand}`)
}
});



client.on("ready", async () => {
    try {
        console.log(`BOT: ${client.user.username} ismi ile giriş yapıldı!`);
        
        client.user.setStatus("iddle");

        let kanal = client.channels.cache.filter(x => x.type === "voice" && x.id === mainSettings.botSesID);
        setInterval(() => {
          const oynuyor = mainSettings.readyFooter;
          const index = Math.floor(Math.random() * (oynuyor.length));
          client.user.setActivity(`${oynuyor[index]}`, {
            type: "WATCHING"
          });
          kanal.map(channel => {
            if (channel.id === mainSettings.botSesID) {
              if (channel.members.some(member => member.id === client.user.id)) return;
              if (!client.channels.cache.get(mainSettings.botSesID)) return;
              client.channels.cache.get(channel.id).join().then(x => console.log("Bot başarılı bir şekilde ses kanalına bağlandı")).catch(() => console.log("Bot ses kanalına bağlanırken bir sorun çıktı Lütfen Yetkileri kontrol ediniz!"));
            } else return;
          });
        }, 10000);
      } catch (err) {console.log(err)}
});

client.on("ready", async () => {
    let sunucu = client.guilds.cache.get(mainSettings.sunucuId)
    let sunucuData = await sunucuayar.findOne({
        guildID: mainSettings.sunucuId
    })
    let muteRol = sunucuData.MUTED;
    setInterval(async () => {
        let muted = await muteInterval.find({
            "muted": true,
            "endDate": {
                $lte: Date.now()
            }
        });
        muted.forEach(async memberdata => {
            if (!sunucu) return;
            if (!sunucu.members.cache.has(memberdata.userID)) {
                await muteInterval.deleteOne({
                    userID: memberdata.userID
                }).exec()
            } else {
                let member = sunucu.members.cache.get(memberdata.userID)
                if (!member) return;
                await member.roles.remove(muteRol)
                await muteInterval.deleteOne({
                    userID: memberdata.userID
                }).exec()
            }
        });
    }, 5000)
});

client.on("ready", async () => {
    let sunucuData = await sunucuayar.findOne({
        guildID: mainSettings.sunucuId
    })
    let sunucu = client.guilds.cache.get(mainSettings.sunucuId);
    setInterval(async () => {
        let jail = await jailInterval.find({
            jailed: true,
            endDate: {
                $lte: Date.now()
            }
        });
        jail.forEach(async memberdata => {

            if (!sunucu) return;
            if (!sunucu.members.cache.has(memberdata.userID)) {
                await jailInterval.deleteOne({
                    userID: memberdata.userID
                }).exec();
            } else {
                let member = sunucu.members.cache.get(memberdata.userID)
                if (!member) return;
                let unregister = sunucuData.UNREGISTER;
                let booster = sunucuData.BOOST;
                member.roles.cache.has(sunucuData.BOOST) ? unregister.push(booster) : unregister;
                await member.roles.set(unregister)
                await jailInterval.deleteOne({
                    userID: member.id
                }).exec();
            }
        });
    }, 5000);
});

client.on("ready", async () => {
    let sunucuData = await sunucuayar.findOne({
        guildID: mainSettings.sunucuId
    })
let sunucu = client.guilds.cache.get(mainSettings.sunucuId);
let vmuteRol = sunucuData.VMUTED;
    setInterval(async () => {
        let vmuted = await vmuteInterval.find({
            muted: true,
            endDate: {
                $lte: Date.now()
            }
        })
        vmuted.forEach(async memberdata => {
            if (!sunucu) return;
            if (!sunucu.members.cache.has(memberdata.userID)) {
                vmuteInterval.deleteOne({
                    userID: memberdata.userID
                }).exec();
            } else {
                let member = sunucu.members.cache.get(memberdata.userID)
                if (!member) return;
 
                    await member.roles.remove(vmuteRol)
                    await member.voice.setMute(false).catch(() => {});
                    vmuteInterval.deleteOne({
                        userID: memberdata.userID
                    }).exec()
            }
        })
    }, 5000);
})

client.on("ready", async () => {

    let sunucuData = await sunucuayar.findOne({
        guildID: mainSettings.sunucuId
    })
    let VKCEZALI = sunucuData.VKCEZALI;
    let DCCEZALI = sunucuData.DCCEZALI;
    let STCEZALI = sunucuData.STCEZALI;
    let sunucu = client.guilds.cache.get(mainSettings.sunucuId);
    setInterval(async () => {
        let vkcezalı = await vkInterval.find({
            vktype: true,
            endDate: {
                $lte: Date.now()
            }
        });
        if (vkcezalı.length == 0) return;
        vkcezalı.forEach(async memberdata => {
            if (!sunucu) return;
            if (!sunucu.members.cache.has(memberdata.userID)) {
                await vkInterval.deleteOne({
                    userID: memberdata.userID
                }).exec()
            } else {
                let member = sunucu.members.cache.get(memberdata.userID)
                if (!member) return;
                await member.roles.remove(VKCEZALI)
                await vkInterval.deleteOne({
                    userID: member.id
                }).exec()
            }
        });
    }, 5000);
    setInterval(async () => {

        let dccezalı = await dcInterval.find({
            dctype: true,
            endDate: {
                $lte: Date.now()
            }
        });
        if (dccezalı.length == 0) return;
        dccezalı.forEach(async memberdata => {
            if (!sunucu) return;
            if (!sunucu.members.cache.has(memberdata.userID)) {
                dcInterval.deleteOne({
                    userID: memberdata.userID
                }).exec()
            } else {
                let member = sunucu.members.cache.get(memberdata.userID)
                if (!member) return;
                member.roles.remove(DCCEZALI)
                await dcInterval.deleteOne({
                    userID: member.id
                }).exec()
            }
        });
    }, 5000);
    setInterval(async () => {
        let stcezalı = await stInterval.find({
            sttype: true,
            endDate: {
                $lte: Date.now()
            }
        });
        if (stcezalı.length == 0) return;
        stcezalı.forEach(async memberdata => {
            if (!sunucu) return;
            if (!sunucu.members.cache.has(memberdata.userID)) {
                await stInterval.deleteOne({
                    userID: memberdata.userID
                }).exec()
            } else {
                let member = sunucu.members.cache.get(memberdata.userID)
                if (!member) return;
                member.roles.remove(STCEZALI)
                await stInterval.deleteOne({
                    userID: member.id
                }).exec()
            }
        });
    }, 5000);
    setInterval(async () => {
        let tagveri = await tagInterval.find({
            authorID: "x"
        });
        if (tagveri.length == 0) return;
        tagveri.forEach(async user => {
            if (Date.now() - user.Tarih >= 1000 * 60 * 3) {
                await tagInterval.deleteOne({
                    authorID: "x"
                }).exec();
            }
        })
    }, 5000)
});

client.login(mainSettings.ASYNC).catch(err => console.log("Token bozulmuş lütfen yeni bir token girmeyi dene"));

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}