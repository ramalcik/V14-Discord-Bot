const {
    MessageEmbed
} = require("discord.js");
const Stat = require("../../models/stats");
const market = require("../../models/market");
let limit = new Map();
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
		let kanallar = ["coin-komut","coin-komut-2"]
	if (!kanallar.includes(message.channel.name)) return message.reply(`${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`).then(x => x.delete({timeout: 10000}));
	const statt = await Stat.findOne({userID: message.author.id, guildID: message.guild.id});
    const data = await market.findOne({}) || { Spotify: [], Netflix: [], Exxen: [], BluTV: []};
    let sec = args[0];
    if (!sec) {


let sayfalar = [`
Dilediğin ürüne sahip ol!
Unutma ürünleri stok durumuna göre alıyorsun stokları kontrol etmek için ürünü almayı deneyiniz.
- **\`.cm al {id}\`** yazarak ürün alabilirsinz.
════════════════════════════════
\`\`\`ID  ÜRÜN                         FİYAT\`\`\`
\`1\` ${client.emojis.cache.find(x => x.name === "spotify")} **\`Spotify Hesap\`**\`------------------ 3.000\` ${client.emojis.cache.find(x => x.name === "coin")}
\`2\` ${client.emojis.cache.find(x => x.name === "exxen")} **\`Exxen Hesap\`**\`-------------------- 3.200\` ${client.emojis.cache.find(x => x.name === "coin")}
\`3\` ${client.emojis.cache.find(x => x.name === "netflix")} **\`Netflix Hesap\`**\`------------------ 4.500\` ${client.emojis.cache.find(x => x.name === "coin")}
\`4\` ${client.emojis.cache.find(x => x.name === "blutv")} **\`BluTV Hesap\`**\`-------------------- 6.500\` ${client.emojis.cache.find(x => x.name === "coin")}
\`5\` ${client.emojis.cache.find(x => x.name === "message")} **\`1.000 Mesaj\`**\`-------------------- 7.000\` ${client.emojis.cache.find(x => x.name === "coin")}
\`6\` ${client.emojis.cache.find(x => x.name === "voice")} **\`10 saat Public Ses\`**\`------------ 20.000\` ${client.emojis.cache.find(x => x.name === "coin")}
\`7\` ${client.emojis.cache.find(x => x.name === "Nitro")} **\`Classic Nitro\`**\`----------------- 38.000\` ${client.emojis.cache.find(x => x.name === "coin")}
\`8\` ${client.emojis.cache.find(x => x.name === "boost")} **\`Boost Nitro\`**\`------------------- 66.000\` ${client.emojis.cache.find(x => x.name === "coin")}

`];
const ileriEmoji = '➡️';
const geriEmoji = '⬅️';
const silEmoji = '🗑️';
let sayfa = 1;
let embed = new MessageEmbed()
.setColor("RANDOM")
.setFooter(`Sayfa ${sayfa}/${sayfalar.length}`)
.setDescription(sayfalar[sayfa-1])

message.channel.send(embed).then(msg => {
    msg.react(geriEmoji).then( r => {
        msg.react(silEmoji).then(r => {
            msg.react(ileriEmoji)

            const geriSayfa = (reaction, user) => reaction.emoji.name === geriEmoji && user.id === message.author.id;
            const temizleSayfa = (reaction, user) => reaction.emoji.name === silEmoji && user.id === message.author.id;
            const ileriSayfa = (reaction, user) => reaction.emoji.name === ileriEmoji && user.id === message.author.id;

            const temizle = msg.createReactionCollector(temizleSayfa, { time: 60000 });
            const geri = msg.createReactionCollector(geriSayfa, { time: 60000 });
            const ileri = msg.createReactionCollector(ileriSayfa, { time: 60000 });


            geri.on("collect", r => {
                r.users.remove(message.author.id)
                if (sayfa === 1) return;
                sayfa--;
                embed.setDescription(sayfalar[sayfa-1]);
                embed.setFooter(`Sayfa ${sayfa}/${sayfalar.length}`);
                msg.edit(embed)
                
            });

            ileri.on("collect", r => {
                r.users.remove(message.author.id)
                if (sayfa === sayfalar.length) return;
                sayfa++;
                embed.setDescription(sayfalar[sayfa-1]);
                embed.setFooter(`Sayfa ${sayfa}/${sayfalar.length}`);
                msg.edit(embed)
                
            });
            temizle.on("collect", r => {
                r.users.remove(message.author.id)
                msg.delete({timeout: 10})
            });
        })
    })
})
    }

    if (["ürünekle"].includes(sec.toLowerCase())) {
		if (!message.member.permissions.has(8)) return;
        if (!args[1]) return message.channel.send("Spotify - Exxen - Netflix - BluTV");
        if (args[1].toLowerCase() == "spotify") {
            if (!args[2]) return message.reply("Lütfen bir ürün giriniz.");
			if (data.Spotify.includes(args[1])) return message.reply("Aynı Ürün Zaten Ekli");
            await market.updateOne({}, {$push: {Spotify: args.slice(2).join(" ")}}, {upsert: true});
            return message.channel.send(`Başarılı bir şekilde **Spotify** ürününü ekledim.`);
        };
        if (args[1].toLowerCase() == "exxen") {
            if (!args[2]) return message.reply("Lütfen bir ürün giriniz.");
			if (data.Exxen.includes(args[1])) return message.reply("Aynı Ürün Zaten Ekli");
            await market.updateOne({}, {$push: {Exxen: args.slice(2).join(" ")}}, {upsert: true});
            return message.channel.send("Başarılı bir şekilde **Exxen** ürününü ekledim.");
        };
        if (args[1].toLowerCase() == "netflix") {
            if (!args[2]) return message.reply("Lütfen bir ürün giriniz.");
			if (data.Netflix.includes(args[1])) return message.reply("Aynı Ürün Zaten Ekli");
            await market.updateOne({}, {$push: {Netflix: args.slice(2).join(" ")}}, {upsert: true});
            return message.channel.send("Başarılı bir şekilde **Netflix** ürününü ekledim.");
        };
        if (args[1].toLowerCase() == "blutv") {
            if (!args[2]) return message.reply("Lütfen bir ürün giriniz.");
			if (data.BluTV.includes(args[1])) return message.reply("Aynı Ürün Zaten Ekli");
            await market.updateOne({}, {$push: {BluTV: args.slice(2).join(" ")}}, {upsert: true});
            return message.channel.send("Başarılı bir şekilde **BluTV** ürününü ekledim.");
        };
    };

    if (sec == "al") {
        let ürünler = {
            "1": {
                Ürünler: data.Spotify
            },
            "2": {
                Ürünler: data.Exxen
            },
            "3": {
                Ürünler: data.Netflix
            },
            "4": {
                Ürünler: data.BluTV
            }
        };
						let sorumlular = ["852814638889828372",
				"754450537604317366",
				"140161812577386496",
				"731432916491567145"];
        if (Object.keys(ürünler).includes(args[1])) {
            if (args[1] == "1") {
				if (statt.coin < 3000) return message.reply("Paran yetersiz görünmekte.");
				if (ürünler["1"].Ürünler.length <= 0) return message.reply("Stokda ürün yoktur Lütfen yetkilerle iletişime geçiniz.");
                let random = ürünler["1"].Ürünler[Math.floor(Math.random() * ürünler["1"].Ürünler.length)];
				
				message.author.send(`Tebrikler **Coin Market** kullanarak 1 adet **Spotify** Hesabı Satın Aldın.\nHesap Bilgilerin Aşağıdaki Gibidir Lütfen Kimseye Paylaşma!\n||${random}||\n\n**Dark Paradise** Yönetim Keyifli Harcamalar Diler (:`)
				.then(async author => {
					await Stat.updateOne({userID: message.author.id, guildID: message.guild.id}, {$inc: {["coin"]: -3000}}, {upsert: true});
					await market.updateOne({}, {$pull: {Spotify: random}}, {upsert: true});
					message.reply("Başarılı bir şekilde **Spotify** adlı ürünü satın aldın.");
					client.channels.cache.get("852814638889828372").send(`${message.author}, adlı kullanıcıya **Spotify** isimli ürün otomatik bir şekilde teslim edilmiştir.`)
				})
				.catch(() => {
					sorumlular.map(id => {
						message.guild.members.cache.get(id).user.send(`${message.author.tag} (${message.member.displayName} - ${message.author.id}) adlı kullanıcı **Spotify** isimli ürünü satın almaya çalıştı.`)
					})
					message.reply("Ürün alırken bir hata meydana geldi lütfen yetkili birisiyle iletişime geçiniz! (Özelden Mesajlarınız Kapalı olabilir)")
				});
            };
            if (args[1] == "2") {
				if (statt.coin < 3200) return message.reply("Paran yetersiz görünmekte.");
				if (ürünler["2"].Ürünler.length <= 0) return message.reply("Stokda ürün yoktur Lütfen yetkilerle iletişime geçiniz.");
                let random = ürünler["2"].Ürünler[Math.floor(Math.random() * ürünler["2"].Ürünler.length)];
				
				message.author.send(`Tebrikler **Coin Market** kullanarak 1 adet **Exxen** Hesabı Satın Aldın.\nHesap Bilgilerin Aşağıdaki Gibidir Lütfen Kimseye Paylaşma!\n||${random}||\n\n**Dark Paradise** Yönetim Keyifli Harcamalar Diler (:`)
				.then(async author => {
					await Stat.updateOne({userID: message.author.id, guildID: message.guild.id}, {$inc: {["coin"]: -3200}}, {upsert: true});
					await market.updateOne({}, {$pull: {Exxen: random}}, {upsert: true});
					message.reply("Başarılı bir şekilde **Exxen** adlı ürünü satın aldın.");
					client.channels.cache.get("852814638889828372").send(`${message.author}, adlı kullanıcıya **Exxen** isimli ürün otomatik bir şekilde teslim edilmiştir.`)
				})
				.catch(() => {
					sorumlular.map(id => {
						message.guild.members.cache.get(id).user.send(`${message.author.tag} (${message.member.displayName} - ${message.author.id}) adlı kullanıcı **Exxen** isimli ürünü satın almaya çalıştı.`)
					})
					message.reply("Ürün alırken bir hata meydana geldi lütfen yetkili birisiyle iletişime geçiniz! (Özelden Mesajlarınız Kapalı olabilir)")
				});
            };
            if (args[1] == "3") {
				if (statt.coin < 4500) return message.reply("Paran yetersiz görünmekte.");
				if (ürünler["3"].Ürünler.length <= 0) return message.reply("Stokda ürün yoktur Lütfen yetkilerle iletişime geçiniz.");
                let random = ürünler["3"].Ürünler[Math.floor(Math.random() * ürünler["3"].Ürünler.length)];
				
				message.author.send(`Tebrikler **Coin Market** kullanarak 1 adet **Netflix** Hesabı Satın Aldın.\nHesap Bilgilerin Aşağıdaki Gibidir Lütfen Kimseye Paylaşma!\n||${random}||\n\n**Dark Paradise** Yönetim Keyifli Harcamalar Diler (:`)
				.then(async author => {
					await Stat.updateOne({userID: message.author.id, guildID: message.guild.id}, {$inc: {["coin"]: -4500}}, {upsert: true});
					await market.updateOne({}, {$pull: {Netflix: random}}, {upsert: true});
					message.reply("Başarılı bir şekilde **Netflix** adlı ürünü satın aldın.");
					client.channels.cache.get("852814638889828372").send(`${message.author}, adlı kullanıcıya **Netflix** isimli ürün otomatik bir şekilde teslim edilmiştir.`)
				})
				.catch(() => {
					sorumlular.map(id => {
						message.guild.members.cache.get(id).user.send(`${message.author.tag} (${message.member.displayName} - ${message.author.id}) adlı kullanıcı **Netflix** isimli ürünü satın almaya çalıştı.`)
					})
					message.reply("Ürün alırken bir hata meydana geldi lütfen yetkili birisiyle iletişime geçiniz! (Özelden Mesajlarınız Kapalı olabilir)")
				});
            };
            if (args[1] == "4") {
				if (statt.coin < 6500) return message.reply("Paran yetersiz görünmekte.");
				if (ürünler["4"].Ürünler.length <= 0) return message.reply("Stokda ürün yoktur Lütfen yetkilerle iletişime geçiniz.");
                let random = ürünler["4"].Ürünler[Math.floor(Math.random() * ürünler["4"].Ürünler.length)];
				
				message.author.send(`Tebrikler **Coin Market** kullanarak 1 adet **BluTV** Hesabı Satın Aldın.\nHesap Bilgilerin Aşağıdaki Gibidir Lütfen Kimseye Paylaşma!\n||${random}||\n\n**Dark Paradise** Yönetim Keyifli Harcamalar Diler (:`)
				.then(async author => {
					await Stat.updateOne({userID: message.author.id, guildID: message.guild.id}, {$inc: {["coin"]: -6500}}, {upsert: true});
					await market.updateOne({}, {$pull: {BluTV: random}}, {upsert: true});
					message.reply("Başarılı bir şekilde **BluTV** adlı ürünü satın aldın.");
					client.channels.cache.get("852814638889828372").send(`${message.author}, adlı kullanıcıya **BluTV** isimli ürün otomatik bir şekilde teslim edilmiştir.`)
				})
				.catch(() => {
					sorumlular.map(id => {
						message.guild.members.cache.get(id).user.send(`${message.author.tag} (${message.member.displayName} - ${message.author.id}) adlı kullanıcı **Netflix** isimli ürünü satın almaya çalıştı.`)
					})
					message.reply("Ürün alırken bir hata meydana geldi lütfen yetkili birisiyle iletişime geçiniz! (Özelden Mesajlarınız Kapalı olabilir)")
				});
            };
        }
    }

}
exports.conf = {aliases: ["cm","Coinmarket","market","Market"]}
exports.help = {name: 'coinmarket'}

