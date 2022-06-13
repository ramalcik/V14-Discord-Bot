
const {
    Client,
    MessageEmbed,
    MessageAttachment
} = require('discord.js');
const slots = require('slot-machine.js');
const random = require('random-number-csprng');
const { SlotMachine, SlotSymbol } = require('slot-machine');
const stat = require("../../models/stats");
let limit = new Map();
const ms = require("parse-ms");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
	
		let kanallar = ["coin-komut","coin-komut-2"]
	if (!kanallar.includes(message.channel.name)) return message.reply(`${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`).then(x => x.delete({timeout: 10000}));
	

	    let data = limit.get(message.author.id) || {dailyCoinTime: 0};
    let timeout = 1000*8
    let gunluk = data.dailyCoinTime
    if (gunluk !== null && timeout - (Date.now() - gunluk) > 0) {
        let time = ms(timeout - (Date.now() - gunluk));
        message.channel.send(`:stopwatch: **|** Hata! **${message.author.username}** Bu komutu ${time.seconds} saniye sonra kullanabilirsin.`)
	} else {
	limit.set(message.author.id, {dailyCoinTime: Date.now()})
	setTimeout(() => {
		limit.delete(message.author.id)
	}, 1000*8)
	

const symbols = [
    new SlotSymbol('1', {
        display: "<a:jp_coin:838433118158323724>",
        points: 0.6666666666666667,
        weight: 100
    }),
    new SlotSymbol('2', {
        display: "<a:jp_bar:838433118406049902>",
        points: 0.6666666666666667,
        weight: 100
    }),
    new SlotSymbol('3', {
        display: "<a:jp_lemon:838433118327275540>",
        points: 0.6666666666666667,
        weight: 100
    }),
    new SlotSymbol('4', {
        display: "<a:jp_cherry:838433118586667008>",
        points: 1,
        weight: 100
    }),
    new SlotSymbol('5', {
        display: "<a:jp_seven:838433117656055856>",
        points: 1,
        weight: 100
    }),
    new SlotSymbol('a', {
        display: "<a:jp_grapes:838433117101752370>",
        points: 1,
        weight: 60
    }),
    new SlotSymbol('b', {
        display: "<a:jp_diamond:838433117018521600>",
        points: 1.333333333333333,
        weight: 20
    }),
    new SlotSymbol('c', {
        display: "<a:jp_bell:838433116871327854>",
        points: 1.6666666666666667,
        weight: 10,
		wildcard: true
    })
];

    const data = await stat.findOne({
        userID: message.author.id,
        guildID: message.guild.id
    });

    let sec = args[0];



    if (!sec) return message.channel.send(`:no_entry: | **${message.author.username},** Lütfen bir bahis değeri giriniz!!`)
		
	if (sec == "all" && data.para > 0) {
		        await stat.updateOne({
            userID: message.author.id,
            guildID: message.guild.id
        }, {
            $inc: {
                ["para"]: data.para <= 50000 ? -data.para : -50000
            }
        }, {
            upsert: true
        })
		const machine = new SlotMachine(3, symbols);
        const results = machine.play();
        const embed = new MessageEmbed()
		.setColor("RANDOM")
		.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
		.setFooter("Middle Earth JackPot -Owsla")
		.setTimestamp()
        const dollarSigns = '   <a:jp_slots:838433118573821952> <a:jp_slots:838433118573821952> <a:jp_slots:838433118573821952>   ';

        embed.description = (results.lines.slice(-2)[0].isWon ? '\n↘' : '\n⬛')
        + dollarSigns
        + (results.lines.slice(-1)[0].isWon ? '↙' : '⬛');

        for (let i = 0; i < results.lines.length - 2; i++) {
            embed.description += (results.lines[i].isWon ? '\n➡   ' : '\n⬛   ')
            + results.lines[i].symbols.map(s => s.display).join(' ')
            + (results.lines[i].isWon ? '   ⬅' : '   ⬛');
        }

        embed.description += (results.lines.slice(-1)[0].isWon ? '\n↗' : '\n⬛')
        + dollarSigns
        + (results.lines.slice(-2)[0].isWon ? '↖' : '⬛');

        const points = results.lines.reduce((total, line) => total + line.points, 0);
        const payout = points * data.para <= 50000 ? data.para : 50000;
		
		if (points > 0) {
		        await stat.updateOne({
            userID: message.author.id,
            guildID: message.guild.id
        }, {
            $inc: {
                ["para"]: payout
            }
        }, {
            upsert: true
        })
		}
		embed.addField(points ? 'KAZANDIN!' : 'KAYBETTİN!',  points ? `Tebrikler **${parseInt(payout)}** miktar para kazandın!` : '**TÜH!** Kaybettin bi dahaki sefer kazanman dileğiyle (:')

        return message.channel.send({ embed });
	}
	
    if (data.para > Number(args[0]) && Number(args[0]) <= 50000 && Number(args[0]) > 0) {
        await stat.updateOne({
            userID: message.author.id,
            guildID: message.guild.id
        }, {
            $inc: {
                ["para"]: -sec
            }
        }, {
            upsert: true
        })
		const machine = new SlotMachine(3, symbols);
        const results = machine.play();
        const embed = new MessageEmbed()
		.setColor("RANDOM")
		.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
		.setFooter("Middle Earth JackPot -Owsla")
		.setTimestamp()
        const dollarSigns = '   <a:jp_slots:838433118573821952> <a:jp_slots:838433118573821952> <a:jp_slots:838433118573821952>   ';

        embed.description = (results.lines.slice(-2)[0].isWon ? '\n↘' : '\n⬛')
        + dollarSigns
        + (results.lines.slice(-1)[0].isWon ? '↙' : '⬛');

        for (let i = 0; i < results.lines.length - 2; i++) {
            embed.description += (results.lines[i].isWon ? '\n➡   ' : '\n⬛   ')
            + results.lines[i].symbols.map(s => s.display).join(' ')
            + (results.lines[i].isWon ? '   ⬅' : '   ⬛');
        }

        embed.description += (results.lines.slice(-1)[0].isWon ? '\n↗' : '\n⬛')
        + dollarSigns
        + (results.lines.slice(-2)[0].isWon ? '↖' : '⬛');

        const points = results.lines.reduce((total, line) => total + line.points, 0);
        const payout = points * Number(sec);
		
		if (points > 0) {
		        await stat.updateOne({
            userID: message.author.id,
            guildID: message.guild.id
        }, {
            $inc: {
                ["para"]: payout
            }
        }, {
            upsert: true
        })
		}
		embed.addField(points ? 'KAZANDIN!' : 'KAYBETTİN!',  points ? `Tebrikler **${parseInt(payout)}** miktar para kazandın!` : '**TÜH!** Kaybettin bi dahaki sefer kazanman dileğiyle (:')

        return message.channel.send({ embed });
    } else {
        message.channel.send(`:no_entry: | **${message.author.username}**, Yeterli miktar da paran yoktur! (Max: 50.000 Tutarında Oynayabilirsin)`)
    }
	
	}

}
exports.conf = {
    aliases: ["s", "jackpot", "slot", "JackPot", "JP", "Slot"]
}
exports.help = {
    name: 'jp'
}