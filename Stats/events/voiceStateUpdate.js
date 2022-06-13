const {
  Collection
} = require("discord.js");
const Voices = global.Voices = new Collection();
const client = global.client;
const logs = require('discord-logs');
logs(client);
const Stat = require("../models/stats");
const StatCheck = require("../models/statscheck");
let StaffXP = require("../models/stafxp");
let sunucuayar = require("../models/sunucuayar");
let randMiss = require("../models/randomMission");
let vmuteInterval = require("../models/vmuteInterval");
let hanedan = require("../models/hanedanlik");

client.on("ready", async () => {
  let channels = client.guilds.cache.get(client.ayarlar.sunucuId).channels.cache.filter(channel => channel.type == "voice" && channel.members.size > 0);
  channels.forEach(channel => {
    let members = channel.members.filter(member => !member.user.bot);
    members.forEach(member => {
      global.Voices.set(member.id, {
        parent: channel.parentID,
        channel: channel.id,
        start: Date.now()
      });
    });
  });
  setInterval(async () => {
    await check();
  }, 30000);
  async function check() {
    let voicee = global.Voices
    voicee.each(async (value, key) => {
      voicee.set(key, {
        parent: value.parent,
        channel: value.channel,
        start: Date.now()
      });
      addVoiceStat(key, value.channel, (Date.now() - value.start), (Date.now() - value.start) / 1000, value.parent);

      await client.easyMission(key, "ses", Date.now() - value.start);
      let gorev = await randMiss.findOne({
        userID: key
      }) || {
        Mission: {
          MISSION: null,
          CHANNEL: null
        }
      };
      if (!gorev) return;
      if (gorev.Mission.MISSION == "ses" && gorev.Mission.CHANNEL == value.channel) {
        await client.dailyMission(key, "ses", Date.now() - value.start, 40)
      }
    });
  }
})





client.on("ready", async () => {
  let data = await sunucuayar.findOne({
    guildID: client.ayarlar.sunucuId
  })
  let sunucu = client.guilds.cache.get(data.guildID);
  let rol = data.EnAltYetkiliRol
  setInterval(() => {
    sunucu.members.cache.filter(x => !x.user.bot && x.voice.channel && x.voice.channel.id != data.SLEEP && data.PUBCategory.includes(x.voice.channel.parentID) && x.roles.cache.get(rol)).map(user => {
      let data = client.channelTime.get(user.id)
      if (!data) return;
      if (Date.now() - data.time >= 1000 * 60 * 5 && data.deaf == true) {
        if (sunucu.members.cache.get(user.id).voice.deaf == false) return;
        user.voice.setChannel(data.SLEEP)
      }
    })
  }, 10000)
});

client.on("voiceChannelDeaf", (member, deafType) => {
  let sunucu = client.guilds.cache.get(client.ayarlar.sunucuId);
  client.channelTime.set(member.id, {
    channel: member.voice.channel.id,
    time: Date.now(),
    deaf: true
  })
});
client.on("voiceChannelUndeaf", (member, deafType) => {
  let sunucu = client.guilds.cache.get(client.ayarlar.sunucuId);
  client.channelTime.set(member.id, {
    channel: member.voice.channel.id,
    time: Date.now(),
    deaf: false
  })
});

client.on("voiceChannelJoin", async (member, channel) => {
  if (member.user.bot) return;
  if (!client.channelTime.has(member.id)) {
    client.channelTime.set(member.id, {
      channel: channel.id,
      time: Date.now(),
      deaf: member.voice.deaf == true ? true : false
    })
  }
  let sunucuData = await sunucuayar.findOne({
    guildID: client.ayarlar.sunucuId
  });
  let rol = sunucuData.VMUTED;
  let vmuted = await vmuteInterval.findOne({
    userID: member.id
  });
  let user = client.guilds.cache.get(client.ayarlar.sunucuId).members.cache.get(member.id).voice.serverMute;
  if (!vmuted && user) {
    member.roles.remove(rol).catch(() => {});
    member.voice.setMute(false).catch(() => {});
  } else if (vmuted && !user) {
    member.roles.add(rol).catch(() => {});
    member.voice.setMute(true).catch(() => {});
  }

  global.Voices.set(member.id, {
    parent: channel.parentID,
    channel: channel.id,
    start: Date.now()
  });

  await client.checkLevel(member.id, client.ayarlar.sunucuId, "ses")
});

client.on("voiceChannelSwitch", async (member, oldChannel, newChannel) => {
  if (member.user.bot) return;
  if (client.channelTime.has(member.id)) {
    client.channelTime.set(member.id, {
      channel: newChannel.id,
      time: Date.now(),
      deaf: member.voice.deaf == true ? true : false
    })
  }
  let sunucuData = await sunucuayar.findOne({
    guildID: client.ayarlar.sunucuId
  });
  let rol = sunucuData.VMUTED;
  let vmuted = await vmuteInterval.findOne({
    userID: member.id
  });
  let user = client.guilds.cache.get(client.ayarlar.sunucuId).members.cache.get(member.id).voice.serverMute;
  if (!vmuted && user) {
    member.roles.remove(rol).catch(() => {});
    member.voice.setMute(false).catch(() => {});
  } else if (vmuted && !user) {
    member.roles.add(rol).catch(() => {});
    member.voice.setMute(true).catch(() => {});
  }

  let data = global.Voices.get(member.id)

  global.Voices.set(member.id, {
    parent: newChannel.parentID,
    channel: newChannel.id,
    start: Date.now()
  });

  let duration = Date.now() - data.start;
  await client.checkLevel(member.id, client.ayarlar.sunucuId, "ses")
  addVoiceStat(member.id, data.channel, duration, duration / 1000, data.parent);
  await client.easyMission(member.id, "ses", duration);
  let gorev = await randMiss.findOne({
    userID: member.id
  }) || {
    Mission: {
      MISSION: null,
      CHANNEL: null
    }
  };
  if (!gorev) return;
  if (gorev.Mission.MISSION == "ses" && gorev.Mission.CHANNEL == newChannel.id) {
    await client.dailyMission(member.id, "ses", duration)
  }
});

client.on("voiceChannelLeave", async (member, channel) => {
  if (member.user.bot) return;
  let gorev = await randMiss.findOne({
    userID: member.id
  }) || {
    Mission: {
      MISSION: null,
      CHANNEL: null
    }
  };
  if (client.channelTime.has(member.id)) {
    client.channelTime.delete(member.id)
  }
  let data = global.Voices.get(member.id)
  let duration = Date.now() - data.start;
  await client.checkLevel(member.id, client.ayarlar.sunucuId, "ses")
  addVoiceStat(member.id, data.channel, duration, duration / 1000, data.parent);
  if (!gorev) return global.Voices.delete(member.id);
  if (gorev.Mission.MISSION == "ses" && gorev.Mission.CHANNEL == channel.id) {
    await client.dailyMission(member.id, "ses", duration)
  }
  global.Voices.delete(member.id);
});

module.exports = async (oldState, newState) => {

};

function addVoiceStat(id, channel, value, xp, category) {
  let randomVoiceXP = ((Math.random() * 0.008) + 0.001).toFixed(3);
  sunucuayar.findOne({
    guildID: client.ayarlar.sunucuId
  }, (err, ress) => {
    if (!ress) return
    Stat.findOne({
      userID: id,
      guildID: client.ayarlar.sunucuId
    }, (err, res) => {
      if (!res) {
        let newData = new Stat({
          userID: id,
          guildID: client.ayarlar.sunucuId,
          yedi: {
            Id: id,
            Invite: 0,
            Chat: {},
            Voice: {},
            TagMember: 0,
            Register: 0,
            Yetkili: 0
          }
        });
        newData.save();
      } else {

        /*

        	"CHAT_KANAL": mainSettings.CHAT_KANAL,
        	"PUBLIC_KATEGORI": mainSettings.PUBLIC_KATEGORI,
        	"STREAMER_KATEGORI":mainSettings.STREAMER_KATEGORI,
        	"REGISTER_KATEGORI": mainSettings.REGISTER_KATEGORI,
        	"SLEEP_ROOM": mainSettings.SLEEP_ROOM,
        */

        let streamer = client.channels.cache.filter(x => x.parentID === client.ayarlar.STREAMER_KATEGORI && x.type == "voice").map(x => x.id);
        let pub = client.channels.cache.filter(x => x.parentID === client.ayarlar.PUBLIC_KATEGORI && x.type == "voice" && x.id !== client.ayarlar.SLEEP_ROOM).map(x => x.id);
        let kayit = client.channels.cache.filter(x => x.parentID === client.ayarlar.REGISTER_KATEGORI && x.type == "voice").map(x => x.id);
        let sleep = client.ayarlar.SLEEP_ROOM;



        if (pub.includes(channel) || streamer.includes(channel)) {
          Stat.updateOne({
            userID: id,
            guildID: client.ayarlar.sunucuId
          }, {
            $inc: {
              coin: 0.000005555555555555556
            }
          }, {
            upsert: true
          }).exec();
        }

        if (ress.Etkinlik && ress.Etkinlik == true) {


          /*
          Public Kanallar (saat) = 35 Puan
          Stream Kanallar (saat) = 30 Puan
          AFK Kanallar (saat) = 15 Puan
          Kayıt Kanalları (saat) = 25 Puan
          */
          if (pub.includes(channel)) {
            Stat.updateOne({
              userID: id,
              guildID: client.ayarlar.sunucuId
            }, {
              $inc: {
                EtkinlikPuan: Math.abs(value / (1000 * 60 * 60) * 5)
              }
            }, {
              upsert: true
            }).exec();
          }
          if (streamer.includes(channel)) {
            Stat.updateOne({
              userID: id,
              guildID: client.ayarlar.sunucuId
            }, {
              $inc: {
                EtkinlikPuan: Math.abs(value / (1000 * 60 * 60) * 5)
              }
            }, {
              upsert: true
            }).exec();
          }
          if (kayit.includes(channel)) {
            Stat.updateOne({
              userID: id,
              guildID: client.ayarlar.sunucuId
            }, {
              $inc: {
                EtkinlikPuan: Math.abs(value / (1000 * 60 * 60) * 5)
              }
            }, {
              upsert: true
            }).exec();
          }
          if (channel == sleep) {
            Stat.updateOne({
              userID: id,
              guildID: client.ayarlar.sunucuId
            }, {
              $inc: {
                EtkinlikPuan: Math.abs(value / (1000 * 60 * 60) * 5)
              }
            }, {
              upsert: true
            }).exec();
          }
        }
        Stat.updateOne({
          userID: id,
          guildID: client.ayarlar.sunucuId
        }, {
          $inc: {
            VipActivites: Math.abs(value / (1000 * 60 * 60)),
            voiceXP: xp * randomVoiceXP,
            totalVoice: Math.abs(value),
            [`yedi.Voice.${channel}`]: Math.abs(value),
            [`voiceChannel.${channel}`]: Math.abs(value),
            [`voiceCategory.${category}`]: Math.abs(value)
          }
        }, {
          upsert: true
        }).exec();

        hanedan.findOne({userID: id, guildID:client.ayarlar.sunucuId}, (err, data) => {
          if (!data) return;
          hanedan.updateOne({userID: id, guildID: client.ayarlar.sunucuId}, {
            $inc: {
              [`channel.${channel}`]: value,
            }
          }, {upsert: true}).exec()
      })

        let siradakilevel = res.voiceLevel * 643;
        if (siradakilevel <= res.voiceXP) {
          res.voiceLevel++
        }
        res.save();
      };
    });
  });

};