const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');

exports.run = async (client, message, args, durum, kanal) => {
  if (!message.guild) return;
  let guild = message.guild;
  if (!client.ayarlar.sahip.some(x => x === message.author.id)) return
	if(args[0] === "kur" || args[0] === "kurulum") {
    
    let onay = "https://cdn.discordapp.com/emojis/964138909724455023.gif?size=96&quality=lossless";
    let onay2 = "https://cdn.discordapp.com/emojis/926523197527048294.gif?size=96&quality=lossless";
    let iptal = "https://cdn.discordapp.com/emojis/673576480487506011.gif?v=1"; 
    let bosta = "https://cdn.discordapp.com/emojis/673576453140512788.png?v=1";
    let rahatsizetmeyin = "https://cdn.discordapp.com/emojis/673576231433797664.png?v=1";
    let gorunmez = "https://cdn.discordapp.com/emojis/673576417224556611.png?v=1";
    let cevrimici = "https://cdn.discordapp.com/emojis/673576292205068314.png?v=1";
    let yildiz = "https://cdn.discordapp.com/emojis/954275202433417216.gif?size=44&quality=lossless";
    let ramal_vmute = "https://cdn.discordapp.com/attachments/811975658963992647/812894209706950656/sesmuteat.png";
    let ramal_mute = "https://cdn.discordapp.com/attachments/811975658963992647/812894244632788992/muteat.png";
    let ramal_vunmute = "https://cdn.discordapp.com/attachments/811975658963992647/812894192530751518/sesmuteac.png";
    let ramal_unmute = "https://cdn.discordapp.com/attachments/811975658963992647/812894234242973716/muteac.png";
    let ramal_stat = "https://cdn.discordapp.com/emojis/813380585338699806.png?v=1";
    let ramal_coin = "https://cdn.discordapp.com/emojis/951880772736938046.gif?size=44&quality=lossless";
    let ramal_bitisbar = "https://cdn.discordapp.com/emojis/812591747393650728.gif?v=1";
    let ramal_solbar =  "https://cdn.discordapp.com/emojis/812591747401646100.gif?v=1";
    let ramal_ortabar = "https://cdn.discordapp.com/emojis/813380548768563250.gif?v=1";
    let ramal_baslangicbar = "https://cdn.discordapp.com/emojis/813380552924594216.png?v=1";
    let ramal_gribitisbar = "https://cdn.discordapp.com/emojis/813825131674730528.png?v=1";
    let ramal_griortabar = "https://cdn.discordapp.com/emojis/813441171489292348.png?v=1";
    let ramal_boostsay = "https://cdn.discordapp.com/emojis/968171916575797258.webp?size=96&quality=lossless";
    let ramal_tagsay = "https://cdn.discordapp.com/emojis/968171931385888838.webp?size=96&quality=lossless";
    let ramal_usersay = "https://cdn.discordapp.com/emojis/968172002919710800.webp?size=96&quality=lossless";
    let ramal_sessay = "https://cdn.discordapp.com/emojis/968171901392396328.webp?size=96&quality=lossless";

    
    
    guild.emojis.create(ramal_vmute, "ramal_vmute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_mute, "ramal_mute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_vunmute, "ramal_vunmute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_unmute, "ramal_unmute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_stat, "ramal_stat").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_coin, "ramal_coin").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(onay, "ramal_tik").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(onay2, "ramal_tik2").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(iptal, "ramal_iptal").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(bosta, "ramal_away").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(rahatsizetmeyin, "ramal_dnd").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(gorunmez, "ramal_offline").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(cevrimici, "ramal_online").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_baslangicbar, "ramal_baslangicbar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_bitisbar, "ramal_bitisbar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_solbar, "ramal_solbar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_ortabar, "ramal_ortabar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_gribitisbar, "ramal_gribitisbar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_griortabar, "ramal_griortabar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(yildiz, "ramal_yildiz").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_boostsay, "ramal_boostsay").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_tagsay, "ramal_tagsay").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_usersay, "ramal_usersay").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ramal_sessay, "ramal_sessay").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);

    return;
  };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['emojis','ramal_emoji'],
    permLevel: 4
  };
  
  exports.help = {
    name: 'emoji',
    description: "Sunucuda komut denemeye yarar",
    usage: 'eval <kod>',
    kategori: "Bot Yapımcısı"
  };
  