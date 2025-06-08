# 🛡️ Discord Guard & Moderasyon Botu

Güçlü bir Discord sunucu koruma ve moderasyon botu. Sunucunuzu çeşitli tehditlerden korur ve kapsamlı moderasyon özellikleri sunar.

## 🤖 Bot Özellikleri

### 🛡️ Koruma Sistemleri
- **🌐 Sunucu Koruması**: Yetkisiz sunucu değişikliklerini engeller
- **👑 Rol Koruması**: Yetkisiz rol değişikliklerini ve silmeleri engeller
- **📝 Kanal Koruması**: Kanalların yetkisiz değişikliklerini engeller
- **😀 Emoji Koruması**: Yetkisiz emoji silme ve değişikliklerini engeller
- **🤖 Bot Koruması**: Yetkisiz bot eklemelerini engeller
- **🔗 URL Koruması**: Zararlı URL'leri filtreler ve engeller
- **🎨 Sticker Koruması**: Sunucu çıkartmalarını korur
- **⚔️ Ban/Kick Koruması**: Yetkisiz ban ve kick işlemlerini engeller
- **🚫 Küfür Koruması**: Uygunsuz dil kullanımını filtreler
- **📢 Reklam Koruması**: Yetkisiz reklamları engeller
- **🔠 Capslock Koruması**: Aşırı büyük harf kullanımını kontrol eder
- **📨 Spam Koruması**: Mesaj spamını engeller
- **🌍 Web Koruması**: Web durumunu izler
- **⭕ Çevrimdışı Koruması**: Çevrimdışı durum değişikliklerini izler

### 👮 Moderasyon Özellikleri
- **📋 Kayıt Sistemi**: Erkek/Kadın kayıt sistemi
- **👤 Kayıtsız Sistemi**: Kayıtsız üye yönetimi
- **👋 Hoşgeldin Sistemi**: Özelleştirilebilir hoşgeldin mesajları
- **📨 Davet Sistemi**: Davet takip ve yönetimi
- **⚖️ Ceza Sistemi**: Ban, kick, mute, jail gibi ceza sistemleri
- **🎭 Rol Sistemi**: Otomatik rol verme ve alma
- **🏷️ Tag Sistemi**: Sunucu tagı yönetimi
- **📅 Yaş Sistemi**: Hesap yaşı kontrolü
- **⚠️ Şüpheli Hesap Sistemi**: Yeni hesapları tespit etme

### ⭐ Ek Özellikler
- **✅ Whitelist Sistemi**: Güvenilir kullanıcılar için istisna sistemi
- **⚙️ Özelleştirilebilir Limitler**: Her koruma özelliği için limit ayarları
- **📊 Denetim Kaydı İzleme**: Tüm işlemlerin kaydını tutma
- **💾 Otomatik Yedekleme**: Kanallar ve roller için otomatik yedekleme
- **🔔 Webhook Entegrasyonu**: Bildirimler için webhook desteği
- **🗄️ MongoDB Veritabanı**: Tüm verilerin güvenli saklanması
- **⚡ Özel Komut Sistemi**: Sunucuya özel komutlar oluşturma
- **🔐 Komut İzin Sistemi**: Komutları belirli rollere özel yapma
- **🎮 Vampir Köylü Oyunu**: Sunucu içi eğlence oyunu

## 📋 Gereksinimler

- Node.js v16 veya üzeri
- MongoDB veritabanı
- Discord Bot Token

## 🚀 Kurulum

1. Repoyu klonlayın
2. Gerekli paketleri yükleyin:
```bash
npm install
```
3. `Src/Settings/Settings.json` dosyasında ayarlarınızı yapılandırın
4. MongoDB bağlantınızı ayarlayın
5. Botu başlatın:
```bash
node index.js
```

## ⚙️ Yapılandırma

`Src/Settings/Settings.json` dosyasında bot ayarlarınızı yapılandırın:

```json
{
  "Moderation": {
    "mongoURL": "mongodb_bağlantı_adresiniz",
    "guildID": "sunucu_id",
    "owners": ["sahip_idleri"]
  }
}
```

## 💬 Destek

Destek için repository'de bir issue açabilirsiniz.

## 📜 Lisans

Copyright (c) 2025 Ramal

Bu yazılım ve ilgili belgeler ("Yazılım"), ISC lisansı altında lisanslanmıştır.

İzin verilen kullanım:
- Yazılımı kopyalama, değiştirme, birleştirme, yayınlama, dağıtma, alt lisanslama ve/veya satma
- Yazılımın kopyalarını kullanma
- Yazılımı ticari amaçlarla kullanma

Şartlar ve koşullar:
- Yazılımın tüm kopyalarında telif hakkı bildirimi ve bu lisans bildirimi bulunmalıdır
- Yazılım "olduğu gibi" sunulur, herhangi bir garanti olmadan
- Yazılımın kullanımından doğan herhangi bir zarardan yazılım sahibi sorumlu değildir

Bu lisans, yazılımın kullanımı, değiştirilmesi ve dağıtılması için gerekli tüm hakları size verir, ancak telif hakkı bildirimini korur ve herhangi bir sorumluluk reddeder.
