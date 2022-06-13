let Stat = require("../models/stats");
let StaffXP = require("../models/stafxp");
let randMiss = require("../models/randomMission");
let sunucuayar = require("../models/sunucuayar");
let muteInterval = require("../models/muteInterval");
const {MessageEmbed, Collection,MessageAttachment} = require("discord.js");
const hanedan = require("../models/hanedanlik");
const {
    Canvas
} = require('canvas-constructor');
const {
    loadImage
} = require('canvas');
const {
    join
} = require("path");
module.exports = async message => {
  if (!message.guild) return
  if (message.author.bot) return;

  let sunucuData = await sunucuayar.findOne({guildID: message.guild.id});
  let muteRol = sunucuData.MUTED;
  let check = await muteInterval.findOne({userID: message.author.id});
  if (check && !message.member.roles.cache.get(muteRol)) {
    message.member.roles.add(muteRol)
  }
    await client.checkLevel(message.author.id, client.ayarlar.sunucuId, "mesaj")
    let data2 = await randMiss.findOne({userID: message.author.id}) || {Mission: {MISSION: null, CHANNEL: null}};
    if (data2.Mission.MISSION == "mesaj" && data2.Mission.CHANNEL == message.channel.id) {
      await client.dailyMission(message.author.id, "mesaj", 1)
    }
	  
	  
	  
	let data = await Stat.findOne({userID: message.author.id, guildID: message.guild.id}) || {messageLevel: 0};
			let siradakilevel = data.messageLevel * 643;

	// if (siradakilevel <= data.messageXP) {

	// 	const avatar = await loadImage(message.author.avatarURL({format: "jpg"}));
	// 	const background = await loadImage("https://cdn.discordapp.com/attachments/830754930604245042/836240361327558706/level.png");            
	// 	const image = new Canvas(740, 128)
	// 	.printImage(background, 0, 0, 740, 128)
	// 	.printRoundedImage(avatar, 621, 12, 105.5, 105.5, 10)
	// 	.setTextFont('14px Arial Black')
	// 	.setColor("#fff")
	// 	.printText(`+${10000*(data.messageLevel+1)} Bonus Para KAZANDIN! `, 340, 70,350)
	// 	.setTextFont('9px Arial Black')
	// 	.setColor("#fff")
	// 	.printText(`Bir Sonraki Level İçin ${(data.messageLevel+1) * 643}XP Kazanmalısın `, 318, 115,350)
	// 	if ((data.messageLevel).toString().length == 1) {
	// 	image.setTextFont('38px Arial Black')
	// 	image.setColor("#fff")
	// 	image.printText(`${data.messageLevel}`, 53,77,350)
	// 	} else {
	// 	image.setTextFont('38px Arial Black')
	// 	image.setColor("#fff")
	// 	image.printText(`${data.messageLevel}`, 40,77,350)
	// 	}
	// 	if ((data.messageLevel+1).toString().length == 1) {
	// 	image.setTextFont('38px Arial Black')
	// 	image.setColor("#fff")
	// 	image.printText(`${data.messageLevel+1}`, 233 , 77 ,350)
	// 	} else {
	// 	image.setTextFont('38px Arial Black')
	// 	image.setColor("#fff")
	// 	image.printText(`${data.messageLevel+1}`, 220, 77,350)
	// 	}

	// 	image.save()
	// 	const attachment = new MessageAttachment(image.toBuffer(), 'owsla-level.png');
	// 	message.channel.send(`[ **${message.author.username}** ] adlı kullanıcı level atladı TEBRİKLER!`, {files: [attachment]});
	// 	await Stat.updateOne({userID: message.author.id, guildID: message.guild.id}, {$set: {["messageXP"]: 0},$inc: {["messageLevel"]: 1, ["para"]: 10000*(data.messageLevel+1)}}, {upsert: true}).exec();
	// }
	
    await client.easyMission(message.author.id, "mesaj", 1);
    await addMessageStat(message.author.id, message.channel.id, 1, message.channel.parentID || "nocategory");
};
async function addMessageStat(id, channel, value, category) {
	  let veris = await Stat.findOne({userID: id, guildID: client.ayarlar.sunucuId});
  if (!veris) {
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
		  let randomMessageXP = [2, 4, 6, 8, 10, 12, 14, 16, 18].random();
	if ([client.ayarlar.CHAT_KANAL].includes(channel)) {
		hanedan.findOne({userID: id, guildID:client.ayarlar.sunucuId}, (err, data) => {
			if (!data) return;
			hanedan.updateOne({userID: id, guildID: client.ayarlar.sunucuId}, {
			  $inc: {
				[`Mesaj`]: value,
			  }
			}, {upsert: true}).exec()
		})
      Stat.updateOne({ userID: id, guildID: client.ayarlar.sunucuId}, { $inc: {coin: 0.2} }, { upsert: true }).exec();
	}
		Stat.updateOne({ userID: id, guildID: client.ayarlar.sunucuId}, { $inc: { messageXP: randomMessageXP, totalMessage: value, [`messageChannel.${channel}`]: value, [`messageCategory.${category}`]: value, [`yedi.Chat.${channel}`]: value} }, { upsert: true }).exec();
	}


  return;
};
