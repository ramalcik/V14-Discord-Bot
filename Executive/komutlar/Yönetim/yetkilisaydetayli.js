module.exports.run = async (client, message, args, durum, kanal) => {
  if (!message.guild) return;
  if (message.member.permissions.has(8) && durum) {

    let alt_yönetim = [];
    let orta_yönetim = [];
    let üst_yönetim = [];

    let alt_yönetim_ses = message.guild.members.cache.filter(member => member.roles.cache.some(rol => alt_yönetim.includes(rol.id))).size
    let orta_yönetim_ses = message.guild.members.cache.filter(member => member.roles.cache.some(rol => orta_yönetim.includes(rol.id))).size
    let üst_yönetim_ses = message.guild.members.cache.filter(member => member.roles.cache.some(rol => üst_yönetim.includes(rol.id))).size

    let alt_yönetim_ses_olmayan = message.guild.members.cache.filter(member => member.roles.cache.some(rol => alt_yönetim.includes(rol.id)) && !member.voice.channel && member.presence.status !== "offline" && !member.user.bot).map(x => `<@${x.id}>`)
    let orta_yönetim_ses_olmayan = message.guild.members.cache.filter(member => member.roles.cache.some(rol => orta_yönetim.includes(rol.id)) && !member.voice.channel && member.presence.status !== "offline" && !member.user.bot).map(x => `<@${x.id}>`)
    let üst_yönetim_ses_olmayan = message.guild.members.cache.filter(member => member.roles.cache.some(rol => üst_yönetim.includes(rol.id)) && !member.voice.channel && member.presence.status !== "offline" && !member.user.bot).map(x => `<@${x.id}>`)
    message.channel.send(`Toplam: ${alt_yönetim_ses+orta_yönetim_ses+üst_yönetim_ses} kişi | Seste Olmayan: ${alt_yönetim_ses_olmayan.length+orta_yönetim_ses_olmayan.length+üst_yönetim_ses_olmayan.length} kişi`, {code: "md"}).then(x => {
      message.channel.send(`Alt yönetim: (${alt_yönetim_ses}) kişi | Alt yönetimde toplamda (${alt_yönetim_ses_olmayan.length}) kişi seste değil.`, {
        code: "md",
        split: true
      }).then(x => {
        message.channel.send(`${alt_yönetim_ses_olmayan.length > 0 ? alt_yönetim_ses_olmayan : "Tüm aktif yetkililer ses kanallarında görünüyor."}`, {
          code: "md",
          split: true
        }).then(x => {
          message.channel.send(`Orta yönetim: (${orta_yönetim_ses}) kişi | Orta yönetimde toplamda (${orta_yönetim_ses_olmayan.length}) kişi seste değil.`, {
            code: "md",
            split: true
          }).then(x => {
            message.channel.send(`${orta_yönetim_ses_olmayan.length > 0 ? orta_yönetim_ses_olmayan : "Tüm aktif yetkililer ses kanallarında görünüyor."}`, {
              code: "md",
              split: true
            }).then(x => {
              message.channel.send(`Üst yönetim: (${üst_yönetim_ses}) kişi | Üst yönetimde toplamda (${üst_yönetim_ses_olmayan.length}) kişi seste değil.`, {
                code: "md",
                split: true
              }).then(x => {
                message.channel.send(`${üst_yönetim_ses_olmayan.length > 0 ? üst_yönetim_ses_olmayan : "Tüm aktif yetkililer ses kanallarında görünüyor."}`, {
                  code: "md",
                  split: true
                });
              });
            });
          });
        });
      });
    })

  } else return;
}
exports.conf = {
  aliases: []
}
exports.help = {
  name: 'dyetkilisay'
}