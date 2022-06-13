const {
    MessageEmbed, MessageAttachment
} = require("discord.js");
const disbut = require('discord-buttons')
let botcomamnds = "897189100241715242"
let tag = "✮" 
 ////1.North 2.Spect 3.Win 4.valve
  let ekiprol = ["897196451401179187","897196559794573312","897197115460177940","906313638489497711","","","","","","","",""]
  let ekipetikettag = ["2009","0667","0709","3003","","","","","","","",""]
  let ekipisimtag = ["spy","spêct","pearl","swan","","","","","","","",""]

  let rdagıt = new disbut.MessageButton().setStyle('blurple').setLabel(`Rol Dağıt`).setID('rdagıt')
  let sesteolmayanlar = new disbut.MessageButton().setStyle('blurple').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar')
  let ekiptekiler = new disbut.MessageButton().setStyle('blurple').setLabel(`Ekip Üyeleri`).setID('ekiptekiler')

  let rdagıt2 = new disbut.MessageButton().setStyle('blurple').setLabel(`Rol Dağıt`).setID('rdagıt2')
  let sesteolmayanlar2 = new disbut.MessageButton().setStyle('blurple').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar2')
  let ekiptekiler2 = new disbut.MessageButton().setStyle('blurple').setLabel(`Ekip Üyeleri`).setID('ekiptekiler2')

  let rdagıt3 = new disbut.MessageButton().setStyle('blurple').setLabel(`Rol Dağıt`).setID('rdagıt3')
  let sesteolmayanlar3 = new disbut.MessageButton().setStyle('blurple').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar3')
  let ekiptekiler3 = new disbut.MessageButton().setStyle('blurple').setLabel(`Ekip Üyeleri`).setID('ekiptekiler3')

  let rdagıt4 = new disbut.MessageButton().setStyle('blurple').setLabel(`Rol Dağıt`).setID('rdagıt4')
  let sesteolmayanlar4 = new disbut.MessageButton().setStyle('blurple').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar4')
  let ekiptekiler4 = new disbut.MessageButton().setStyle('blurple').setLabel(`Ekip Üyeleri`).setID('ekiptekiler4')

  let rdagıt5 = new disbut.MessageButton().setStyle('blurple').setLabel(`Rol Dağıt`).setID('rdagıt5')
  let sesteolmayanlar5 = new disbut.MessageButton().setStyle('blurple').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar5')
  let ekiptekiler5 = new disbut.MessageButton().setStyle('blurple').setLabel(`Ekip Üyeleri`).setID('ekiptekiler5')

  let rdagıt6 = new disbut.MessageButton().setStyle('blurple').setLabel(`Rol Dağıt`).setID('rdagıt6')
  let sesteolmayanlar6 = new disbut.MessageButton().setStyle('blurple').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar6')
  let ekiptekiler6 = new disbut.MessageButton().setStyle('blurple').setLabel(`Ekip Üyeleri`).setID('ekiptekiler6')

  let rdagıt7 = new disbut.MessageButton().setStyle('blurple').setLabel(`Rol Dağıt`).setID('rdagıt7')
  let sesteolmayanlar7 = new disbut.MessageButton().setStyle('blurple').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar7')
  let ekiptekiler7 = new disbut.MessageButton().setStyle('blurple').setLabel(`Ekip Üyeleri`).setID('ekiptekiler7')

  let rdagıt8 = new disbut.MessageButton().setStyle('blurple').setLabel(`Rol Dağıt`).setID('rdagıt8')
  let sesteolmayanlar8 = new disbut.MessageButton().setStyle('blurple').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar8')
  let ekiptekiler8 = new disbut.MessageButton().setStyle('blurple').setLabel(`Ekip Üyeleri`).setID('ekiptekiler8')

  let rdagıt9 = new disbut.MessageButton().setStyle('blurple').setLabel(`Rol Dağıt`).setID('rdagıt9')
  let sesteolmayanlar9 = new disbut.MessageButton().setStyle('blurple').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar9')
  let ekiptekiler9 = new disbut.MessageButton().setStyle('blurple').setLabel(`Ekip Üyeleri`).setID('ekiptekiler9')

  let rdagıt10 = new disbut.MessageButton().setStyle('blurple').setLabel(`Rol Dağıt`).setID('rdagıt10')
  let sesteolmayanlar10 = new disbut.MessageButton().setStyle('blurple').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar10')
  let ekiptekiler10 = new disbut.MessageButton().setStyle('blurple').setLabel(`Ekip Üyeleri`).setID('ekiptekiler10')

  let rdagıt11 = new disbut.MessageButton().setStyle('blurple').setLabel(`Rol Dağıt`).setID('rdagıt11')
  let sesteolmayanlar11 = new disbut.MessageButton().setStyle('blurple').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar11')
  let ekiptekiler11 = new disbut.MessageButton().setStyle('blurple').setLabel(`Ekip Üyeleri`).setID('ekiptekiler11')

  let rdagıt12 = new disbut.MessageButton().setStyle('blurple').setLabel(`Rol Dağıt`).setID('rdagıt12')
  let sesteolmayanlar12 = new disbut.MessageButton().setStyle('blurple').setLabel(`Seste olmayanlar`).setID('sesteolmayanlar12')
  let ekiptekiler12 = new disbut.MessageButton().setStyle('blurple').setLabel(`Ekip Üyeleri`).setID('ekiptekiler12')

  
  module.exports.run = async (client, message, args, durum, kanal) => {
    
    if (!message.guild) return;
    if (durum ) {

if (["bak"].includes(args[0])) {
    let ekip = new disbut.MessageMenuOption().setValue("ekip").setLabel(message.guild.roles.cache.get(ekiprol[0]).name).setEmoji("899290755703640084")
    let ekip2 = new disbut.MessageMenuOption().setValue("ekip2").setLabel(message.guild.roles.cache.get(ekiprol[1]).name).setEmoji("899290755703640084")
    let ekip3 = new disbut.MessageMenuOption().setValue("ekip3").setLabel(message.guild.roles.cache.get(ekiprol[2]).name).setEmoji("899290755703640084")
    let ekip4 = new disbut.MessageMenuOption().setValue("ekip4").setLabel(message.guild.roles.cache.get(ekiprol[3]).name).setEmoji("899290755703640084")
    /*let ekip5 = new disbut.MessageMenuOption().setValue("ekip5").setLabel(message.guild.roles.cache.get(ekiprol[4]).name).setEmoji("899290755703640084")
*/
    const menu = new disbut.MessageMenu()
.setID('menu')
.setPlaceholder('Ekipler.')
.setMaxValues(1)
.setMinValues(1)
.addOptions(ekip,ekip2,ekip3,ekip4)
    message.channel.send('Bilgisini görmek istediğiniz ekibin seçeneğine tıklayınız.',menu)
return;
}
  let embed = new MessageEmbed().setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(client.ayarlar.footer).setColor("RANDOM")
  .setDescription(`Aşağıdaki ekip üyelerini'ı daha detaylı bir şekilde görmek için aşağıdaki komutu yazınız.
\`.ekip bak\`
  `)
  
  .addField(`${message.guild.roles.cache.get(ekiprol[0]).name}`,`\n
Toplam Üye: \`${message.guild.roles.cache.get(ekiprol[0]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${message.guild.roles.cache.get(ekiprol[0]).members.filter(x => x.presence.status !== "offline").size} kişi\`
Sesteki Üye: \`${message.guild.roles.cache.get(ekiprol[0]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
──────────────`, true)
.addField(`${message.guild.roles.cache.get(ekiprol[1]).name}`,`\n
Toplam Üye: \`${message.guild.roles.cache.get(ekiprol[1]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${message.guild.roles.cache.get(ekiprol[1]).members.filter(x => x.presence.status !== "offline").size} kişi\`
Sesteki Üye: \`${message.guild.roles.cache.get(ekiprol[1]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
──────────────`,true)
.addField(`${message.guild.roles.cache.get(ekiprol[2]).name}`,`\n
Toplam Üye: \`${message.guild.roles.cache.get(ekiprol[2]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${message.guild.roles.cache.get(ekiprol[2]).members.filter(x => x.presence.status !== "offline").size} kişi\`
Sesteki Üye: \`${message.guild.roles.cache.get(ekiprol[2]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
──────────────`,true)

.addField(`${message.guild.roles.cache.get(ekiprol[3]).name}`,`\n
Toplam Üye: \`${message.guild.roles.cache.get(ekiprol[3]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${message.guild.roles.cache.get(ekiprol[3]).members.filter(x => x.presence.status !== "offline").size} kişi\`
Sesteki Üye: \`${message.guild.roles.cache.get(ekiprol[3]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
──────────────`,true)
/*
.addField(`${message.guild.roles.cache.get(ekiprol[4]).name}`,`\n
Toplam Üye: \`${message.guild.roles.cache.get(ekiprol[4]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${message.guild.roles.cache.get(ekiprol[4]).members.filter(x => x.presence.status !== "offline").size} kişi\`
Sesteki Üye: \`${message.guild.roles.cache.get(ekiprol[4]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
──────────────`,true)
*/
  message.channel.send(embed)
}
  }

  client.on("clickMenu", async menu  => {
  let führer = "897100798243274792"
    let owner = "897099843607068703"
    let soul = "897103697341972500"
    let hand = "897105304192438353"
    let çifttag = "897783158601314344"
    if (menu.clicker.member.permissions.has(8) || menu.clicker.member.roles.cache.get(führer)|| menu.clicker.member.roles.cache.get(owner)|| menu.clicker.member.roles.cache.get(soul)|| menu.clicker.member.roles.cache.get(hand)|| menu.clicker.member.roles.cache.get(çifttag)) {
        
    if (menu.values.includes("ekip")) {
        menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
        **${menu.guild.roles.cache.get(ekiprol[0]).name}** Ekip Bilgileri:
        
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[0]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[0]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[0]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[0]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
        
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[0]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[0]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
        `) , {
            buttons: [rdagıt,sesteolmayanlar,ekiptekiler]
        })
    
    }
        
        if (menu.values.includes("ekip2")) {
            menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
            **${menu.guild.roles.cache.get(ekiprol[1]).name}** Ekip Bilgileri:
            
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[1]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[1]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[1]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[1]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
            
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[1]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[1]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
            `) , {
                buttons: [rdagıt2,sesteolmayanlar2,ekiptekiler2]
            })}

            if (menu.values.includes("ekip3")) {
                menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
                **${menu.guild.roles.cache.get(ekiprol[2]).name}** Ekip Bilgileri:
                
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[2]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[2]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[2]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[2]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
                
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[2]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[2]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
                `) , {
                    buttons: [rdagıt3,sesteolmayanlar3,ekiptekiler3]
                })}

                if (menu.values.includes("ekip4")) {
                    menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
                    **${menu.guild.roles.cache.get(ekiprol[3]).name}** Ekip Bilgileri:
                    
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[3]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[3]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[3]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[3]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
                    
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[3]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[3]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
                    `) , {
                        buttons: [rdagıt4,sesteolmayanlar4,ekiptekiler4]
                    })}

                    if (menu.values.includes("ekip5")) {
                        menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
                        **${menu.guild.roles.cache.get(ekiprol[4]).name}** Ekip Bilgileri:
                        
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[4]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[4]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[4]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[4]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
                        
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[4]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[4]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
                        `) , {
                            buttons: [rdagıt5,sesteolmayanlar5,ekiptekiler5]
                        })}

                        if (menu.values.includes("ekip6")) {
                            menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
                            **${menu.guild.roles.cache.get(ekiprol[5]).name}** Ekip Bilgileri:
                            
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[5]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[5]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[5]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[5]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
                            
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[5]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[5]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
                            `) , {
                                buttons: [rdagıt6,sesteolmayanlar6,ekiptekiler6]
                            })}

                            if (menu.values.includes("ekip7")) {
                                menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
                                **${menu.guild.roles.cache.get(ekiprol[6]).name}** Ekip Bilgileri:
                                
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[6]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[6]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[6]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[6]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
                                
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[6]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[6]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
                                `) , {
                                    buttons: [rdagıt7,sesteolmayanlar7,ekiptekiler7]
                                })}
                                if (menu.values.includes("ekip8")) {
                                    menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
                                    **${menu.guild.roles.cache.get(ekiprol[7]).name}** Ekip Bilgileri:
                                    
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[7]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[7]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[7]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[7]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
                                    
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[7]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[7]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
                                    `) , {
                                        buttons: [rdagıt8,sesteolmayanlar8,ekiptekiler8]
                                    })}
                                    if (menu.values.includes("ekip9")) {
                                        menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
                                        **${menu.guild.roles.cache.get(ekiprol[8]).name}** Ekip Bilgileri:
                                        
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[8]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[8]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[8]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[8]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
                                        
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[8]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[8]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
                                        `) , {
                                            buttons: [rdagıt9,sesteolmayanlar9,ekiptekiler9]
                                        })}

                                        if (menu.values.includes("ekip10")) {
                                            menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
                                            **${menu.guild.roles.cache.get(ekiprol[9]).name}** Ekip Bilgileri:
                                            
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[9]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[9]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[9]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[9]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
                                            
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[9]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[9]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
                                            `) , {
                                                buttons: [rdagıt10,sesteolmayanlar10,ekiptekiler10]
                                            })}

                                            if (menu.values.includes("ekip11")) {
                                                menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
                                                **${menu.guild.roles.cache.get(ekiprol[10]).name}** Ekip Bilgileri:
                                                
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[10]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[10]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[10]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[10]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
                                                
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[10]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[10]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
                                                `) , {
                                                    buttons: [rdagıt11,sesteolmayanlar11,ekiptekiler11]
                                                })}

                                                if (menu.values.includes("ekip12")) {
                                                    menu.reply.send(new MessageEmbed().setColor("RANDOM").setDescription(`
                                                    **${menu.guild.roles.cache.get(ekiprol[11]).name}** Ekip Bilgileri:
                                                    
Toplam Üye: \`${menu.guild.roles.cache.get(ekiprol[11]).members.size || "0"} kişi\`
Çevrimiçi Üye: \`${menu.guild.roles.cache.get(ekiprol[11]).members.filter(x => x.presence.status !== "offline").size || "0"} kişi\`
Sesteki Üye: \`${menu.guild.roles.cache.get(ekiprol[11]).members.filter(x => x.presence.status !== "offline" && x.voice.channel).size|| "0"} kişi\`
Seste Olmayan Üye: \`${menu.guild.roles.cache.get(ekiprol[11]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).size || "0"} kişi\`
                                                    
Taglı Üye: \`${menu.guild.roles.cache.get(ekiprol[11]).members.filter(member => member.user.username.includes(tag)).size} kişi\`
Yetkili Üye: \`${menu.guild.roles.cache.get(ekiprol[11]).members.filter(member => member.roles.cache.get(botcomamnds)).size} kişi\`
                                                    `) , {
                                                        buttons: [rdagıt12,sesteolmayanlar12,ekiptekiler12]
                                                    })}

                                
                            }})

client.on('clickButton', async (button) => {
   

    let führer = "897100798243274792"
    let owner = "897099843607068703"
    let soul = "897103697341972500"
    let hand = "897105304192438353"
    let çifttag = "897783158601314344"
    if (button.clicker.member.permissions.has(8) ||button.clicker.member.roles.cache.get(führer)|| button.clicker.member.roles.cache.get(owner)|| button.clicker.member.roles.cache.get(soul)|| button.clicker.member.roles.cache.get(hand)|| button.clicker.member.roles.cache.get(çifttag)) {
       
 

                if (button.id === 'rdagıt') {
                    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[0])+member.user.discriminator.includes(ekipetikettag[0])&& !member.roles.cache.has(ekiprol[0]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
                    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[0])+member.user.discriminator.includes(ekipetikettag[0])&& !member.roles.cache.has(ekiprol[0])).map(x=>x.roles.add(ekiprol[0]))                
                }
 if (button.id === 'sesteolmayanlar') {
button.reply.send(`Aktif olup seste olmayan kişiler;
                    
${button.guild.roles.cache.get(ekiprol[0]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
                }
                if (button.id === 'ekiptekiler') {
                    let rol = button.guild.roles.cache.get(ekiprol[0])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
                    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
    split: true
})
}


if (button.id === 'rdagıt2') {
    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[1])+member.user.discriminator.includes(ekipetikettag[1])&& !member.roles.cache.has(ekiprol[1]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[1])+member.user.discriminator.includes(ekipetikettag[1])&& !member.roles.cache.has(ekiprol[1])).map(x=>x.roles.add(ekiprol[1]))                
}
if (button.id === 'sesteolmayanlar2') {
button.reply.send(`Aktif olup seste olmayan kişiler;
    
${button.guild.roles.cache.get(ekiprol[1]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
}
if (button.id === 'ekiptekiler2') {
    let rol = button.guild.roles.cache.get(ekiprol[1])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
split: true
})
}

if (button.id === 'rdagıt3') {
    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[2])+member.user.discriminator.includes(ekipetikettag[2])&& !member.roles.cache.has(ekiprol[2]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[2])+member.user.discriminator.includes(ekipetikettag[2])&& !member.roles.cache.has(ekiprol[2])).map(x=>x.roles.add(ekiprol[2]))                
}
if (button.id === 'sesteolmayanlar3') {
button.reply.send(`Aktif olup seste olmayan kişiler;
    
${button.guild.roles.cache.get(ekiprol[2]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
}
if (button.id === 'ekiptekiler3') {
    let rol = button.guild.roles.cache.get(ekiprol[2])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
split: true
})
}

if (button.id === 'rdagıt4') {
    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[3])+member.user.discriminator.includes(ekipetikettag[3])&& !member.roles.cache.has(ekiprol[3]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[3])+member.user.discriminator.includes(ekipetikettag[3])&& !member.roles.cache.has(ekiprol[3])).map(x=>x.roles.add(ekiprol[3]))                
}
if (button.id === 'sesteolmayanlar4') {
button.reply.send(`Aktif olup seste olmayan kişiler;
    
${button.guild.roles.cache.get(ekiprol[3]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
}
if (button.id === 'ekiptekiler4') {
    let rol = button.guild.roles.cache.get(ekiprol[3])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
split: true
})
}

if (button.id === 'rdagıt5') {
    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[4])+member.user.discriminator.includes(ekipetikettag[4])&& !member.roles.cache.has(ekiprol[4]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[4])+member.user.discriminator.includes(ekipetikettag[4])&& !member.roles.cache.has(ekiprol[4])).map(x=>x.roles.add(ekiprol[4]))                
}
if (button.id === 'sesteolmayanlar5') {
button.reply.send(`Aktif olup seste olmayan kişiler;
    
${button.guild.roles.cache.get(ekiprol[4]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
}
if (button.id === 'ekiptekiler5') {
    let rol = button.guild.roles.cache.get(ekiprol[4])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
split: true
})
}


if (button.id === 'rdagıt6') {
    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[5])+member.user.discriminator.includes(ekipetikettag[5])&& !member.roles.cache.has(ekiprol[5]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[5])+member.user.discriminator.includes(ekipetikettag[5])&& !member.roles.cache.has(ekiprol[5])).map(x=>x.roles.add(ekiprol[5]))                
}
if (button.id === 'sesteolmayanlar6') {
button.reply.send(`Aktif olup seste olmayan kişiler;
    
${button.guild.roles.cache.get(ekiprol[5]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
}
if (button.id === 'ekiptekiler5') {
    let rol = button.guild.roles.cache.get(ekiprol[5])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
split: true
})
}

if (button.id === 'rdagıt7') {
    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[6])+member.user.discriminator.includes(ekipetikettag[6])&& !member.roles.cache.has(ekiprol[6]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[6])+member.user.discriminator.includes(ekipetikettag[6])&& !member.roles.cache.has(ekiprol[6])).map(x=>x.roles.add(ekiprol[6]))                
}
if (button.id === 'sesteolmayanlar7') {
button.reply.send(`Aktif olup seste olmayan kişiler;
    
${button.guild.roles.cache.get(ekiprol[6]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
}
if (button.id === 'ekiptekiler7') {
    let rol = button.guild.roles.cache.get(ekiprol[6])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
split: true
})
}

if (button.id === 'rdagıt8') {
    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[7])+member.user.discriminator.includes(ekipetikettag[7])&& !member.roles.cache.has(ekiprol[7]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[7])+member.user.discriminator.includes(ekipetikettag[7])&& !member.roles.cache.has(ekiprol[7])).map(x=>x.roles.add(ekiprol[7]))                
}
if (button.id === 'sesteolmayanlar8') {
button.reply.send(`Aktif olup seste olmayan kişiler;
    
${button.guild.roles.cache.get(ekiprol[7]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
}
if (button.id === 'ekiptekiler8') {
    let rol = button.guild.roles.cache.get(ekiprol[7])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
split: true
})
}

if (button.id === 'rdagıt9') {
    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[8])+member.user.discriminator.includes(ekipetikettag[8])&& !member.roles.cache.has(ekiprol[8]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[8])+member.user.discriminator.includes(ekipetikettag[8])&& !member.roles.cache.has(ekiprol[8])).map(x=>x.roles.add(ekiprol[8]))                
}
if (button.id === 'sesteolmayanlar9') {
button.reply.send(`Aktif olup seste olmayan kişiler;
    
${button.guild.roles.cache.get(ekiprol[8]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
}
if (button.id === 'ekiptekiler9') {
    let rol = button.guild.roles.cache.get(ekiprol[8])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
split: true
})
}


if (button.id === 'rdagıt10') {
    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[9])+member.user.discriminator.includes(ekipetikettag[9])&& !member.roles.cache.has(ekiprol[9]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[9])+member.user.discriminator.includes(ekipetikettag[9])&& !member.roles.cache.has(ekiprol[9])).map(x=>x.roles.add(ekiprol[9]))                
}
if (button.id === 'sesteolmayanlar10') {
button.reply.send(`Aktif olup seste olmayan kişiler;
    
${button.guild.roles.cache.get(ekiprol[9]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
}
if (button.id === 'ekiptekiler10') {
    let rol = button.guild.roles.cache.get(ekiprol[9])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
split: true
})
}

if (button.id === 'rdagıt11') {
    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[10])+member.user.discriminator.includes(ekipetikettag[10])&& !member.roles.cache.has(ekiprol[10]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[10])+member.user.discriminator.includes(ekipetikettag[10])&& !member.roles.cache.has(ekiprol[10])).map(x=>x.roles.add(ekiprol[10]))                
}
if (button.id === 'sesteolmayanlar11') {
button.reply.send(`Aktif olup seste olmayan kişiler;
    
${button.guild.roles.cache.get(ekiprol[10]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
}
if (button.id === 'ekiptekiler11') {
    let rol = button.guild.roles.cache.get(ekiprol[10])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
split: true
})
}

if (button.id === 'rdagıt12') {
    let dagit = button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[11])+member.user.discriminator.includes(ekipetikettag[11])&& !member.roles.cache.has(ekiprol[11]))
button.reply.send(`Ekip tagı olup rolü olmayan ${dagit.size} kullanıcıya rol verildi.
    
Rol verilen kullanıcılar;
${dagit.map(x => x || "Rolü olmayan bulunamadı.")}`)
button.guild.members.cache.filter(member =>member.user.username.toLowerCase().includes(ekipisimtag[11])+member.user.discriminator.includes(ekipetikettag[11])&& !member.roles.cache.has(ekiprol[11])).map(x=>x.roles.add(ekiprol[11]))                
}
if (button.id === 'sesteolmayanlar12') {
button.reply.send(`Aktif olup seste olmayan kişiler;
    
${button.guild.roles.cache.get(ekiprol[11]).members.filter(x => x.presence.status !== "offline" && !x.voice.channel).map(x=> x)}`)
}
if (button.id === 'ekiptekiler12') {
    let rol = button.guild.roles.cache.get(ekiprol[11])
button.reply.send(`Ekip üyeleri ${rol.members.size} kişi;
    
${rol.members.size < 200 ? rol.members.map(x => `${x} (\`${x.id}\`)`).join("\n") : "200'den fazla kişi olduğu için listeleyemiyorum."}`,{
split: true
})
}

    }    });
exports.conf = {
    aliases: ["Ekip"]
}
exports.help = {
    name: 'ekip'
}