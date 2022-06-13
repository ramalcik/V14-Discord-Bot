const Discord = require("discord.js")
const sunucuayar = require("../../models/sunucuayar");
const ms = require("ms");
const moment = require("moment")
exports.run = async function (client, message, args) {
  if (!message.guild) return

  let db = await sunucuayar.findOne({guildID: message.guild.id});
  let prefix = client.ayarlar.prefix[0];
  let tag = db.TAG
  let gkv = db.GKV || []
  if (gkv.some(i => i == message.author.id) || message.author.id === message.guild.ownerID) {


    const sec = args[0]
    if (sec == "yardım") return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setAuthor(client.user.username, client.user.avatarURL({
      dynamic: true
    })).setDescription(`
─────────────────────
**Not:** \`Çekiliş sistemi şuanlık ses kanalları için geçerlidir ilerleyen zamanlarda tüm sunucu üyeleri için de bir çekiliş sistemi yapacağız!\`
─────────────────────
**Çekiliş Sistemi Nasıl Çalışıyor ?**
**1) Tüm Ses Kanallarını kapsayan çekiliş**
Bu sistem genellikle etkinliklerde ses kanallarında aktif olan rast gele bir üyeyi seçmektedir

**Bilgilendirme:** \`Yönetici\` iznine sahip kullanıcılar çekiliş sisteminden faydalanamamaktadır

**Doğru Kullanım:** \`${prefix}çekiliş hepsi\`
─────────────────────
**2) Çekiliş sorumlusunun bulunduğu kanallarını kapsayan çekiliş**
Bu sistem \`Çekiliş Sorumlusu\`'nun bulunduğu ses kanalında tüm üyeler arası çekiliş yapmaktadır

**Bilgilendirme:** \`Odadaki üyelerin isminde eğer sunucu tagı (sembol) varsa çekilişte isimleri sistem tarafından 2 defa yazılmaktadır\`

**Doğru Kullanım:** \`${prefix}çekiliş bulunduğum\`

`))




    if (sec === "hepsi" || sec === "tümkanallar") {

      let Kisukea = message.guild.members.cache.filter(member => {
        return member.voice.channel && member.presence.status !== "offline" && !member.user.bot && message.author.id && !member.permissions.has("ADMINISTRATOR")
      }).map(member => (member.user.id));
      message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`
**Çekiliş Başarılı Bir Şekilde Başladı**
─────────────────────
**Çekilişi Başlatan:** ${message.author}
**Gerçekleşecek Süre:** \`30 Saniye\`
**Katılımcı Sayısı:** \`${Kisukea.length} kişi\``)).then(async mesaj => {
  shuffle(Kisukea)
        let random = Kisukea[Math.floor(Math.random() * Kisukea.length)]
        setTimeout(async () => {
          await mesaj.edit(new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(`
**Çekiliş Başarılı Bir Şekilde Sonuçlandı**
─────────────────────
**Çekilişi Başlatan:** ${message.author}
**Gerçekleşen Süre:** \`30 Saniye\`
**Katılımcı Sayısı:** \`${Kisukea.length} kişi\`
**Kazanan Kullanıcı:** <@${random}> (\`${random}\`)`))
        }, 1000 * 30)
      })
    }

    if (sec === "bulundugum" || sec === "bulunduğum") {

      if (!message.member.voice.channel) return message.reply(`Bir ses kanalında olmalısın.`)

      let Kisukea = message.member.voice.channel.members.filter(member => {
        return member.voice.channel && member.presence.status !== "offline" && !member.user.bot && message.author.id && !member.permissions.has("ADMINISTRATOR")
      }).map(member => (member.user.id));
      message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`
**Çekiliş Başarılı Bir Şekilde Başladı**
─────────────────────
**Çekilişi Başlatan:** ${message.author}
**Gerçekleşecek Süre:** \`${args[1]||"5m".replace("s", " Saniye").replace("m", " Dakika").replace("h", " Saat").replace("d", " Gün")}\`
**Katılımcı Sayısı:** \`${Kisukea.length} kişi\``)).then(async mesaj => {

        shuffle(Kisukea)
        let random = Kisukea[Math.floor(Math.random() * Kisukea.length)]
        setTimeout(async () => {
          await mesaj.edit(new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(`
**Çekiliş Başarılı Bir Şekilde Sonuçlandı**
─────────────────────
**Çekilişi Başlatan:** ${message.author}
**Gerçekleşen Süre:** \`${args[1]||"5m".replace("s", " Saniye").replace("m", " Dakika").replace("h", " Saat").replace("d", " Gün")}\`
**Katılımcı Sayısı:** \`${Kisukea.length} kişi\`
**Kazanan Kullanıcı:** <@${random}> (\`${random}\`)`))
        }, ms(args[1] || "5m"))
      })


    }


    if (!args[0]) return message.channel.send(`Zamanını belirtmedin!`);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(
        `Zaman için doğru biçimlendirmeyi kullanmadınız! (\`m/h/d\`)`
      );
    if (isNaN(args[0][0])) return message.channel.send(`Girmiş olduğun değer bir rakam olmalı!`);
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        `Lütfen bir kanal belirtiniz!`
      );
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send(`Lütfen bir ödül adı belirtiniz!`);
    message.channel.send(`${channel} kanalında çekiliş başlatıldı lütfen kontrol ediniz!`);
    let Embed = new Discord.MessageEmbed()
      .setTitle(`Çekiliş Başladı`)
      .setDescription(`
Çekilişe katılmak için :tada: tepkisine tıklayınız
\`\`\`
Çekilişi Başlatan: ${message.author.username}
Gerçekleşecek Süre: ${args[0].replace("s", " Saniye").replace("m", " Dakika").replace("h", " Saat").replace("d", " Gün")}
Verilecek Ödül: ${prize}
\`\`\`
İsminde \`${tag}\` tagını bulunduran üyelerin isimleri 2 defa yazılmaktadır!
`)
      .setFooter(client.ayarlar.footer)
      .setTimestamp()
      .setColor(`BLUE`);
    let m = await channel.send(Embed);






	const sayı = args[0].replace("m", "").replace("h", "").replace("d", "")
const süre = args[0].replace(sayı, "")

const zaman = moment(new Date()).add(sayı, süre).valueOf()
m.react("🎉");
let arr = []
let interval = setInterval(async function () {

const date = zaman - new Date().getTime()
const dakika = Math.floor(date / 60000);
const saniye = Math.floor(date / 1000);
const saat = Math.floor(date / 3600000);
 if (saniye === 0 || saniye < 0) {
   




  setTimeout(() => {
    if (m.reactions.cache.get("🎉").count <= 2) {
      message.channel.send(`Katılımcı Sayısı: \`${m.reactions.cache.get("🎉").count} kişi\``);
      return message.channel.send(
        `Çekilişin sonuçlanabilmesi için yeterli sayıda katılımcı olmadı`
      );
    }

    m.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot && message.author.id !== u.id).map(x => {
      if (x.username.includes(tag)) {
        arr.push(x.id)
      }
      arr.push(x.id)
    })
    shuffle(arr)
    shuffle(arr)
    let random = arr[Math.floor(Math.random() * arr.length)]
    
    let Embed = new Discord.MessageEmbed()
    .setTitle(`Çekiliş Sonuçlandı`)
    .setDescription(`
Çekilişi Başlatan: \`${message.author.username}\`
Gerçekleşen Süre: \`${args[0].replace("s", " Saniye").replace("m", " Dakika").replace("h", " Saat").replace("d", " Gün")}\`
Verilecek Ödül: \`${prize}\`
Kazanan Kullanıcı: <@${random}> (\`${random}\`)
`)
    .setFooter(client.ayarlar.footer)
    .setTimestamp()
    .setColor(`BLUE`);

    m.edit(Embed)
    channel.send(`**${prize}** için verilen hediyenin galibi. <@${random}>`);
  }, 1000);

  return clearInterval(interval)}

m.edit(new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle("Çekiliş ")
.setDescription(
`
Çekilişe katılmak için :tada: tepkisine tıklayınız
\`\`\`
Çekilişi Başlatan: ${message.author.username}
Gerçekleşecek Süre: ${saat == 0 ? `${dakika+1} dakika kaldı` : `${saat} saat ${dakika+1} dakika kaldı`}
Verilecek Ödül: ${prize}
\`\`\`
İsminde \`${tag}\` tagını bulunduran üyelerin isimleri 2 defa yazılmaktadır!
      `)
      .setFooter(client.ayarlar.footer)
      .setTimestamp()
      .setColor(`BLUE`));
}, 5000)
  } else {
    return message.reply("Bu komut sadece TAÇ sahibi tarafından kullanılabilir")
  }



}





exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ses-kanal-çekiliş", "ses-çekiliş", "çekiliş"],
  permLevel: 0
};

exports.help = {
  name: 'cekilis',
  description: "Ses kanallarında bulunan üyeler arasında çekiliş gerçekleşir",
  usage: 'çekiliş hepsi/bulunduğum',
  kategori: 'Sahip'
};

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}