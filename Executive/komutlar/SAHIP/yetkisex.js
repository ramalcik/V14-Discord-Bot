const {
    MessageEmbed,
    Message,
    Client
} = require("discord.js");

let sunucuayar = require("../../models/sunucuayar");
const disbut = require("discord-buttons");

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 * @param {Boolean} durum 
 * @param {Boolean} kanal 
 * @returns 
 */


module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;

    let data = await sunucuayar.findOne({
        guildID: message.guild.id
    });

    let EnAltYetkiliRol = data.EnAltYetkiliRol;
    const roller = [
      "Beginner",   
      "Soli", 
      "Esai",
      "Hearse",
      "Ventus"
    ];


    let sahip = ["852814638889828372"]
    if (!sahip.some(x => x == message.author.id)) return;
    
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!target) return message.reply("Lütfen bir kullanıcı etiketleyiniz.");
       
        const button_1 = new disbut.MessageButton().setID("yükselt").setLabel("Yükselt").setStyle("green");
        const button_2 = new disbut.MessageButton().setID("düşür").setLabel("Düşür").setStyle("red");
        const button_3 = new disbut.MessageButton().setID("yetkiAl").setLabel("Al").setStyle("red");
        const button_4 = new disbut.MessageButton().setID("yetkiVer").setLabel("Ver").setStyle("green");
     

        const yetki1 =  new disbut.MessageButton().setID("yetki1").setLabel("Beginner").setStyle("red");
        const yetki2 =  new disbut.MessageButton().setID("yetki2").setLabel("Soli").setStyle("red");

                let msj = await message.channel.send(`${target} kullanıcısı için uygulanacak işlemi seçiniz.`, {buttons: [button_1, button_2,button_3,button_4]});
                let filter = (btn) => btn.clicker.id === message.author.id;
                let collector = msj.createButtonCollector(filter, {time: 1000*60*60*24});

                collector.on("collect", async (button) => {
                    if (button.id === "yükselt") {
                           
                        const manRol = target.roles.cache.find(rol => roller.some(rol2 => rol.name == rol2 || rol.id == rol2));
                        if (manRol) {
                            const rol = message.guild.roles.cache.find(rol => rol.name == roller[roller.indexOf(manRol.name) +1]);
                            if (rol) {
                                await target.roles.remove(manRol).then(async () => {
                                    await target.roles.add(rol).then(async () => {
                                        await button.reply.send(`${target} adlı kişinin yetkisi yükseldi!`);
                                    });
                                });
                            };
                        };
                    };
                    if (button.id === "düşür") {            
                        const manRol = target.roles.cache.find(rol => roller.some(rol2 => rol.name == rol2 || rol.id == rol2));
                        if (manRol) {
                            const rol = message.guild.roles.cache.find(rol => rol.name == roller[roller.indexOf(manRol.name) -1]);
                            if (rol) {
                                await target.roles.remove(manRol).then(async () => {
                                    await target.roles.add(rol).then(async () => {
                                        await button.reply.send(`${target} adlı kişinin yetkisi düşürüldü!`);
                                    });
                                });
                            };
                        };
                    };
                    if (button.id === "yetkiAl") {
                       if(!target.roles.cache.find(rol => roller.some(rol2 => rol.name == rol2 || rol.id == rol2))) return;

                        const enAltYtRol = message.guild.roles.cache.get(EnAltYetkiliRol);
                        await target.roles.remove(target.roles.cache.filter(role => role.position >= enAltYtRol.position && !role.managed).map(x => x.id));
                        await button.reply.send(`${target} adlı kişinin yetkileri alındı!`);
                    };

                    if (button.id === "yetki1") {   
                        await button.reply.send(`${target} adlı kişinin yetkileri alındı!`);
                    }
                    
                    if (button.id === "yetki2") {
                        
                        await button.reply.send(`${target} adlı kişinin yetkileri alındı!`);
                    }


                    if (button.id === "yetkiVer") {
                        
                        
                        if(target.roles.cache.find(rol => roller.some(rol2 => rol.name == rol2 || rol.id == rol2))) return await button.reply.send(`${target} Kullanıcısının yetkisi bulunmaktadır!
                        
                        Yükseltmek için yükselt butonuna tıklayınız!`);

                       await button.reply.send(`${target} kullanıcısına verilecek yetkiyi seçiniz!`, {
                        buttons: [yetki1,yetki2]
                    }); 
                    }
                  
                            
                });
            
        
        

                    collector.on("end", () => msj.delete().catch(() => {}));





}
exports.conf = {
    aliases: []
}
exports.help = {
    name: 'ramal_sex'
}

